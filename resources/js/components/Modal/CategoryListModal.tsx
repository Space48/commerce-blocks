import React, {useCallback, useMemo, useState} from 'react';
import {ListModal} from './ListModal';
import {cloneDeep} from 'lodash';
import {useCategories, useCategoryTrees, useSWRFetch, useTrees} from '../../hooks';
import {TreeSelectableType} from '@bigcommerce/big-design/dist/components/Tree/types';

interface Props {
  visible: boolean,
  setVisible: (boolean) => void;
  storeHash: string,
  onSelectionChange: (selectedItems: number[]) => void;
  selectable?: TreeSelectableType;
  channelFilter?: number
}

const CategoryListModal = (
  {
    visible,
    setVisible,
    storeHash,
    onSelectionChange,
    selectable = 'radio',
    channelFilter
  }: Props
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const onSearchTermChange = useCallback(value => setSearchTerm(value), []);

  const [channelsResponse, channelsError, channelsLoading] = useSWRFetch(
    `/bc-api/stores/${storeHash}/v3/channels`,
    {available: true},
    storeHash,
    {revalidateOnFocus: false}
  );

  const channels = channelsResponse?.data ?? [];
  const channelIds = channels.map(({id}) => id)

  const [allCategoriesResponse, allCategoriesMeta, allCategoriesError, allCategoriesLoading] = useCategories(storeHash);
  const allCategories = allCategoriesResponse?.length > 0 ?
    allCategoriesResponse.reduce((map, obj) => (map[obj.id] = obj, map), {}) : {};

  const [treesResponse, treesError, treesLoading] = useTrees(storeHash, {}, {revalidateOnFocus: false});
  const applicableTrees = treesResponse?.data.filter(tree => tree.channels.some(channelId => channelIds.includes(channelId) && (!channelFilter || channelFilter === channelId))) || [];

  const treeIds = applicableTrees.map(({id}) => id) ?? [];

  const [categoryTreesResponse, categoryTreesError, categoryTreesLoading] = useCategoryTrees(storeHash, treeIds);

  const isLoading = channelsLoading || treesLoading || categoryTreesLoading || allCategoriesLoading;
  const error = channelsError || treesError || categoryTreesError || allCategoriesError;

  const addSearchMatchAnnotations = useCallback((categoryTree, searchTerm) => {
    if (!searchTerm) return categoryTree;

    return categoryTree !== undefined && categoryTree.reduce((tree, category) => {

      const has_children = category.children && category.children.length > 0;
      category.children = has_children ? addSearchMatchAnnotations(category.children, searchTerm) : [];

      const nodeMatchesSearchTerm = category.name.toLowerCase().includes(searchTerm.toLowerCase());
      const childMatchesSearchTerm = has_children &&
        category.children.some(child => child.nodeMatchesSearchTerm || child.hasChildThatMatchesSearchTerm);

      tree.push({
        ...category,
        nodeMatchesSearchTerm: nodeMatchesSearchTerm,
        hasChildThatMatchesSearchTerm: childMatchesSearchTerm,
      })

      return tree;

    }, [])
  }, []);

  /**
   * Filter category tree to only those categories that match or have a child that matches the search term
   */
  const filterCategoriesBySearchTerm = useCallback((categories, searchTerm) => {
    if (!searchTerm) return categories;
    if (!categories) return [];

    const filteredCategories = cloneDeep(categories);
    filteredCategories.forEach(category => {
      if (category.children && category.children.length > 0) {
        category.children = category.nodeMatchesSearchTerm ? category.children : filterCategoriesBySearchTerm(category.children, searchTerm);
      }
    });

    return filteredCategories.filter(category => {
      return category.nodeMatchesSearchTerm || category.hasChildThatMatchesSearchTerm
    });
  }, [cloneDeep]);

  const findNodesWithChildrenThatMatchSearchTerm = useCallback(nodes => {
    return nodes !== undefined && nodes.reduce((nodesWithMatches, node) => {
      if (node.hasChildThatMatchesSearchTerm) nodesWithMatches.push(node.id);

      if (node.children) {
        nodesWithMatches = [...nodesWithMatches, ...findNodesWithChildrenThatMatchSearchTerm(node.children)];
      }

      return nodesWithMatches;
    }, []);
  }, []);


  const transformCategoriesToTreeNodes = useCallback((categories, allCategories) => {

    return categories !== undefined && categories.reduce((tree, category) => {
      const image = Object.hasOwn(allCategories, category.id) ? allCategories[category.id]?.image_url : null;

      tree.push({
        id: category.id,
        name: category.name,
        images: image ? [{url_thumbnail: image}] : [],
        custom_url: {url: category?.url ?? ''},
        children: category.children ? transformCategoriesToTreeNodes(category.children, allCategories) : [],
        nodeMatchesSearchTerm: category.nodeMatchesSearchTerm,
        hasChildThatMatchesSearchTerm: category.hasChildThatMatchesSearchTerm,
        value: category.id
      });
      return tree;
    }, []);
  }, [storeHash]);

  const treeNodes = useMemo(() => {
    return (!isLoading && !error) ?
      channels.map(channel => {
        const treeIndex = treesResponse?.data.findIndex(tree => tree.channels.includes(channel.id));

        const categories = treeIndex >= 0 && Object.hasOwn(categoryTreesResponse, treeIndex) ? categoryTreesResponse[treeIndex]?.data : [];
        const categoriesWithSearchAnnotations = addSearchMatchAnnotations(categories, searchTerm);

        const filteredCategories = filterCategoriesBySearchTerm(categoriesWithSearchAnnotations, searchTerm);
        const categoryTreeNodes = transformCategoriesToTreeNodes(filteredCategories, allCategories);

        return {
          id: 'channel_' + channel.id,
          name: channel.name,
          images: channel.icon_url ? [{url_thumbnail: channel.icon_url}] : [],
          children: categoryTreeNodes,
          hasChildThatMatchesSearchTerm: categoryTreeNodes.some(node => node.hasChildThatMatchesSearchTerm || node.nodeMatchesSearchTerm),
        }
      }).filter(channel => channel.children.length > 0)
      :
      [];
  }, [
    treesResponse,
    categoryTreesResponse,
    channels,
    searchTerm,
    isLoading,
    error,
    allCategories,
    addSearchMatchAnnotations,
    filterCategoriesBySearchTerm,
    transformCategoriesToTreeNodes
  ]);

  const nodesWithChildrenThatMatchSearchTerm = useMemo(() => {
    return findNodesWithChildrenThatMatchSearchTerm(treeNodes);
  }, [treeNodes, findNodesWithChildrenThatMatchSearchTerm]);

  const firstChannel = channelIds.length > 0 ? ['channel_' + channelIds[0]] : [];
  const defaultExpanded = nodesWithChildrenThatMatchSearchTerm.length ? nodesWithChildrenThatMatchSearchTerm : firstChannel;

  return (
    <ListModal
      label='Category'
      plural='Categories'
      keyId='id'
      isLoading={isLoading}
      visible={visible}
      treeNodes={treeNodes ?? []}
      defaultExpanded={defaultExpanded}
      onSelectionChange={onSelectionChange}
      setVisible={setVisible}
      onSearch={onSearchTermChange}
      error={error}
      selectable={selectable}
      searchTerm={searchTerm}
    />
  );
}


export {CategoryListModal};
