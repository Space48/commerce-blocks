import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Flex,
  FlexItem,
  Input,
  Select,
  SelectOption,
  SelectOptionGroup,
  Small
} from '@bigcommerce/big-design';
import {CloseIcon, DeleteIcon, FilterListIcon} from '@bigcommerce/big-design-icons';
import {FeatureBadge} from '../FeatureBadge';
import {Bullet} from '../Bullet';
import {
  PRODUCTS_SEARCH_FILTER_CATEGORIES,
  PRODUCTS_SEARCH_FILTER_SEARCH_TERM,
  PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY, PRODUCTS_SEARCH_SELECTION_TYPE_SEARCH,
  PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS, productsSearchFilterOptions,
  productsSearchSelectionTypeOptions
} from './config';
import {Block} from '../../types';
import {CategorySelector} from './CategorySelector';
import {ProductSelector} from './ProductSelector';
import {StyleableButton} from '../StyleableButton';
import {useCategories, useProducts} from '../../hooks';
import ContentLoading from '../ContentLoading';
import {theme} from '@bigcommerce/big-design-theme';
import styled from 'styled-components';
import {uniq} from 'lodash'
import {CategoriesSelector} from './CategoriesSelector';

const RemoveSelectionButton = styled(StyleableButton)`
  height: 2.15rem;
  vertical-align: bottom;
`;

interface Props {
  storeHash: string;
  block: Block | null;
  onChange: (key: string, value: any) => void;
}

interface SearchFilter {
  type?: string
}

const ProductsSearchQueryBuilder = ({storeHash, block, onChange}: Props) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>([]);

  const selectedProducts = block?.product_selection_product_ids || [];
  const selectedCategories = block?.product_selection_category_ids || [];

  useEffect(() => {
    if (block?.product_selection_type !== PRODUCTS_SEARCH_SELECTION_TYPE_SEARCH) {
      if (block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY
        && block?.product_selection_category_ids && block.product_selection_category_ids?.length > 0) {
        onChange('product_selection_category_ids', [block.product_selection_category_ids[0]])
      }

      setSearchFilters([]);
      return;
    }

    if (block?.product_selection_search_term && block.product_selection_search_term?.length > 0) {
      addSearchFilter({type: PRODUCTS_SEARCH_FILTER_SEARCH_TERM});
    }

    if (block?.product_selection_category_ids && block.product_selection_category_ids?.length > 0) {
      addSearchFilter({type: PRODUCTS_SEARCH_FILTER_CATEGORIES});
    }
  }, [block?.product_selection_type]);

  const availableSearchFilterOptions = (productsSearchFilterOptions as any[]).filter(option => {
    return searchFilters.findIndex(searchFilter => searchFilter.type === option.value) === -1;
  })

  const getAvailableSearchFilters = (filterType?: string): SelectOption<any>[] | SelectOptionGroup<any>[] => {
    if (!filterType || filterType === '') return availableSearchFilterOptions;

    return (productsSearchFilterOptions as any[]).filter(option => option.value === filterType);
  };

  const addSearchFilter = (filter = {type: ''}) => {
    const filterExists = searchFilters.find(prevFilter => prevFilter.type === filter.type);
    if (filterExists) return;

    setSearchFilters(prev => [...prev, filter]);
  }

  const updateSearchFilterType = (index, type) => {
    setSearchFilters(prev => {
      prev[index].type = type;
      return [...prev];
    })
  }

  const removeSearchFilter = (index) => {
    const filterToRemove = searchFilters[index];
    if (filterToRemove.type === PRODUCTS_SEARCH_FILTER_SEARCH_TERM) {
      onChange('product_selection_search_term', null);
    }

    if (filterToRemove.type === PRODUCTS_SEARCH_FILTER_CATEGORIES) {
      onChange('product_selection_category_ids', null);
    }

    setSearchFilters(prev => {
      prev.splice(index, 1)
      return [...prev];
    })
  }

  const [products, , productsError] = useProducts(
    storeHash,
    {['id:in']: selectedProducts.join(',') || '9999999999999'}, // easiest way to make sure we don't get any products on requests with selectedproducts
    true
  );

  const [categories, , categoriesError] = useCategories(
    storeHash,
    {['id:in']: selectedCategories.join(',') || '9999999999999'}, // easiest way to make sure we don't get any products on requests with selectedproducts
    true
  )

  const onNewlySelectedProducts = (ids: number[]) => {
    if (ids.length === 0) return;
    onChange('product_selection_product_ids', uniq([...selectedProducts, ...ids]))
  }

  const unselectProduct = (id) => {
    if (!selectedProducts.includes(id)) return;
    onChange('product_selection_product_ids', selectedProducts.filter((prevId) => prevId !== id))
  }

  const onNewlySelectedCategory = (id?: number) => {
    if (!id) return
    onChange('product_selection_category_ids', [id]);
  }

  const onNewlySelectedCategories = (ids: number[]) => {
    onChange('product_selection_category_ids', ids);
  }

  const unselectCategory = (id) => {
    if (!selectedCategories.includes(id)) return;
    onChange('product_selection_category_ids', selectedCategories.filter((prevId) => prevId !== id))
  }

  const onInputChange = (event) => onChange(event.target.name, event.target.value);

  console.log("Block: ", block);

  return (
    <>
      <Box marginBottom="large">
        <FeatureBadge>Show...</FeatureBadge>
      </Box>
      <Flex marginVertical="large" flexDirection="row" marginLeft="large" alignItems="center">
        <FlexItem marginTop="small">
          <Bullet/>
        </FlexItem>
        <FlexItem marginRight="medium">
          <Select
            options={productsSearchSelectionTypeOptions}
            value={block?.product_selection_type ?? ''}
            onOptionChange={(val) => onChange('product_selection_type', val)}
            action={block?.product_selection_type ? {
              content: 'Remove',
              icon: <DeleteIcon/>,
              onActionClick: () => onChange('product_selection_type', undefined)
            } : undefined}
            placeholder="Choose product selection type"
          />
        </FlexItem>
        <FlexItem marginRight="medium">
          {
            block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS ?
              <ProductSelector storeHash={storeHash} onSelectionChange={onNewlySelectedProducts}/>
              : null
          }
          {
            block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY ?
              <CategorySelector
                storeHash={storeHash}
                onSelectionChange={onNewlySelectedCategory}
                channel={block?.channel_id ?? undefined}/>
              : null
          }
        </FlexItem>
      </Flex>
      {
        block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS
        && selectedProducts.length > 0 ?
          <Box marginLeft="xxLarge">
            <ContentLoading loading={false} error={productsError ?? null}>
              {selectedProducts.length > 0 && products ?
                <Flex flexDirection="column">
                  {products.map(({id, name}) => (
                    <FlexItem key={id} marginLeft="xSmall" marginVertical="xxSmall">
                      <FeatureBadge bold={false} color={theme.colors.secondary20}>
                        <Small color="secondary70" bold={true}>{name}</Small>
                      </FeatureBadge>
                      <RemoveSelectionButton
                        variant="subtle"
                        iconOnly={<CloseIcon/>}
                        type="button"
                        onClick={() => unselectProduct(id)}
                      >
                        Remove
                      </RemoveSelectionButton>
                    </FlexItem>

                  ))}
                </Flex>
                : null
              }
            </ContentLoading>
          </Box>
          : null
      }
      {
        block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY && selectedCategories.length > 0 ?
          <Box marginLeft="xxLarge">
            <ContentLoading loading={false} error={categoriesError ?? null}>
              {selectedCategories.length > 0 && categories ?
                <Flex flexDirection="column">
                  {categories.map(({id, name}) => (
                    <FlexItem key={id} marginLeft="xSmall" marginVertical="xxSmall">
                      <FeatureBadge bold={false} color={theme.colors.secondary20}>
                        <Small color="secondary70" bold={true}>{name}</Small>
                      </FeatureBadge>
                      <RemoveSelectionButton
                        variant="subtle"
                        iconOnly={<CloseIcon/>}
                        type="button"
                        onClick={() => unselectCategory(id)}
                      >
                        Remove
                      </RemoveSelectionButton>
                    </FlexItem>

                  ))}
                </Flex>
                : null
              }
            </ContentLoading>
          </Box>
          : null
      }
      {
        block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_SEARCH ?
          <Box marginLeft="xxLarge">
            {
              searchFilters.map((searchFilter, index) => (
                <>
                  <Flex key={index} alignItems="center" marginLeft="small" marginVertical="large">
                    <FlexItem marginTop="small">
                      <Bullet/>
                    </FlexItem>
                    <FlexItem>
                      <FeatureBadge color={theme.colors.secondary20}
                                    bold={false}>{index === 0 ? 'for' : 'and'}</FeatureBadge>
                    </FlexItem>
                    <FlexItem marginRight="medium">
                      <Select
                        options={getAvailableSearchFilters(searchFilter?.type)}
                        onOptionChange={(value) => updateSearchFilterType(index, value)}
                        placeholder="Choose search filter"
                        value={searchFilter?.type}
                      />
                    </FlexItem>
                    {
                      searchFilter?.type == PRODUCTS_SEARCH_FILTER_SEARCH_TERM ?
                        <FlexItem marginRight="small">
                          <Input
                            type="text"
                            value={block?.product_selection_search_term ?? ''}
                            onChange={onInputChange}
                            name="product_selection_search_term"
                          />
                        </FlexItem>
                        : null
                    }
                    {
                      searchFilter?.type == PRODUCTS_SEARCH_FILTER_CATEGORIES ?
                        <FlexItem marginRight="medium">
                          <CategoriesSelector
                            storeHash={storeHash}
                            onSelectionChange={onNewlySelectedCategories}
                            channel={block?.channel_id ?? undefined}/>
                        </FlexItem>
                        : null
                    }
                    <FlexItem>
                      <RemoveSelectionButton
                        variant="subtle"
                        iconOnly={<CloseIcon/>}
                        type="button"
                        onClick={() => removeSearchFilter(index)}
                      >
                        Remove
                      </RemoveSelectionButton>
                    </FlexItem>
                  </Flex>
                  {searchFilter?.type == PRODUCTS_SEARCH_FILTER_CATEGORIES && selectedCategories.length > 0 ?
                    <Box marginLeft="xxLarge" marginBottom="large">
                      <ContentLoading loading={false} error={categoriesError ?? null}>
                        {selectedCategories.length > 0 && categories ?
                          <Flex flexDirection="column">
                            {categories.map(({id, name}) => (
                              <FlexItem key={id} marginLeft="xSmall" marginVertical="xxSmall">
                                <FeatureBadge bold={false} color={theme.colors.secondary20}>
                                  <Small color="secondary70" bold={true}>{name}</Small>
                                </FeatureBadge>
                                <RemoveSelectionButton
                                  variant="subtle"
                                  iconOnly={<CloseIcon/>}
                                  type="button"
                                  onClick={() => unselectCategory(id)}
                                >
                                  Remove
                                </RemoveSelectionButton>
                              </FlexItem>

                            ))}
                          </Flex>
                          : null
                        }
                      </ContentLoading>
                    </Box>
                    : null
                  }
                </>
              ))
            }
            {availableSearchFilterOptions.length > 0 ?
              <Button variant="subtle" marginLeft="small" onClick={() => addSearchFilter()} type="button" iconLeft={<FilterListIcon/>}>
                Add search filter
              </Button>
              : null
            }
          </Box>
          : null
      }
    </>
  )
}

export {ProductsSearchQueryBuilder};
