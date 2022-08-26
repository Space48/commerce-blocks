import {Fragment} from 'preact';
import {Box, Button, Flex, FlexItem, Input, Select, SelectOption, SelectOptionGroup} from '@bigcommerce/big-design';
import {Bullet} from '../Bullet';
import {FeatureBadge} from '../FeatureBadge';
import {theme} from '@bigcommerce/big-design-theme';
import {uniq} from 'lodash'
import {
  PRODUCTS_SEARCH_FILTER_CATEGORIES,
  PRODUCTS_SEARCH_FILTER_SEARCH_TERM, PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY, PRODUCTS_SEARCH_SELECTION_TYPE_SEARCH,
  productsSearchFilterOptions
} from './config';
import {CategoriesSelector} from './CategoriesSelector';
import {RemoveSelectionButton} from './styled';
import {CloseIcon, FilterListIcon} from '@bigcommerce/big-design-icons';
import {CategoryBadgesList} from './CategoryBadgesList';
import React, {useEffect, useState} from 'react';
import {SortOrderSelector} from './SortOrderSelector';
import {Block} from '../../types';

interface SearchFilter {
  type: string
}

interface Category {
  id: number,
  name: string
}

interface Props {
  storeHash: string;
  block: Block | null;
  onChange: (key: string, value: any) => void;
  categories: Category[] | undefined;
  onDeselectCategory: (number) => void

}

const SearchFilters = ({storeHash, block, onChange, categories, onDeselectCategory}: Props) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>([]);

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

  const onInputChange = (event) => onChange(event.target.name, event.target.value);

  const onNewlySelectedCategories = (ids: number[]) => {
    onChange('product_selection_category_ids', uniq([...block?.product_selection_category_ids ?? [], ...ids]))
  }

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

  return (
    <>
      {
        searchFilters.map((searchFilter, index) => (
          <Fragment key={index}>
            <Flex alignItems="center" marginLeft="small" marginVertical="large">
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
            {searchFilter?.type == PRODUCTS_SEARCH_FILTER_CATEGORIES && categories && categories.length > 0 ?
              <Box marginLeft="xxLarge" marginBottom="large">
                {categories.length > 0 && categories ?
                  <CategoryBadgesList categories={categories} onDeselect={onDeselectCategory}/>
                  : null
                }
              </Box>
              : null
            }
          </Fragment>
        ))
      }
      <Box>
        <SortOrderSelector block={block} onChange={onChange}/>
      </Box>
      {availableSearchFilterOptions.length > 0 ?
        <Button
          variant="subtle"
          marginLeft="small"
          onClick={() => addSearchFilter()}
          type="button"
          iconLeft={<FilterListIcon/>}>
          Add search filter
        </Button>
        : null
      }
    </>
  )
}

export {SearchFilters}
