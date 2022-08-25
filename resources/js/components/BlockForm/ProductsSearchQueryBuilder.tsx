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
  productsSearchSelectionTypeOptions,
} from './config';
import {Block} from '../../types';
import {CategorySelector} from './CategorySelector';
import {ProductSelector} from './ProductSelector';
import {useCategories, useProducts} from '../../hooks';
import ContentLoading from '../ContentLoading';
import {theme} from '@bigcommerce/big-design-theme';
import {uniq} from 'lodash'
import {CategoriesSelector} from './CategoriesSelector';
import {Fragment} from 'preact';
import {SortOrderSelector} from './SortOrderSelector';
import {CategoryBadgesList} from './CategoryBadgesList';
import {RemoveSelectionButton} from './styled';
import {ProductBadgesList} from './ProductBadgesList';
import {SearchFilters} from './SearchFilters';

interface Props {
  storeHash: string;
  block: Block | null;
  onChange: (key: string, value: any) => void;
}

const ProductsSearchQueryBuilder = ({storeHash, block, onChange}: Props) => {

  const selectedProducts = block?.product_selection_product_ids || [];
  const selectedCategories = block?.product_selection_category_ids || [];

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

  const onDeselectProduct = (id) => {
    if (!selectedProducts.includes(id)) return;
    onChange('product_selection_product_ids', selectedProducts.filter((prevId) => prevId !== id))
  }

  const onNewlySelectedCategory = (id?: number) => {
    if (!id) return
    onChange('product_selection_category_ids', [id]);
  }

  const onDeselectCategory = (id) => {
    if (!selectedCategories.includes(id)) return;
    onChange('product_selection_category_ids', selectedCategories.filter((prevId) => prevId !== id))
  }

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
                <ProductBadgesList products={products} onDeselect={onDeselectProduct}/>
                : null
              }
            </ContentLoading>
          </Box>
          : null
      }
      {
        block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY && selectedCategories.length > 0 ?
          <ContentLoading loading={false} error={categoriesError ?? null}>
            <Box marginLeft="xxLarge">
              {selectedCategories.length > 0 && categories ?
                <CategoryBadgesList categories={categories} onDeselect={onDeselectCategory}/>
                : null
              }
            </Box>
            <Box marginLeft="xSmall">
              <SortOrderSelector block={block} onChange={onChange}/>
            </Box>
          </ContentLoading>
          : null
      }
      {
        block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_SEARCH ?
          <Box marginLeft="xxLarge">
            <ContentLoading loading={false} error={categoriesError ?? null}>
              <SearchFilters
                storeHash={storeHash}
                block={block}
                onChange={onChange}
                categories={categories}
                onDeselectCategory={onDeselectCategory}
              />
            </ContentLoading>
          </Box>
          : null
      }
    </>
  )
}

export {ProductsSearchQueryBuilder};
