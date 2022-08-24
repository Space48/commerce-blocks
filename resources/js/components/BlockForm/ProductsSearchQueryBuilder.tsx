import React, {useState} from 'react';
import {Box, Flex, FlexItem, Select, Small} from '@bigcommerce/big-design';
import {CloseIcon, DeleteIcon} from '@bigcommerce/big-design-icons';
import {FeatureBadge} from '../FeatureBadge';
import {Bullet} from '../Bullet';
import {
  PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY,
  PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS,
  productsSearchSelectionTypeOptions
} from './config';
import {Block} from '../../types';
import {ProductSelector} from './ProductSelector';
import {StyleableButton} from '../StyleableButton';
import {useCategories, useProducts} from '../../hooks';
import ContentLoading from '../ContentLoading';
import {theme} from '@bigcommerce/big-design-theme';
import styled from 'styled-components';
import {uniq} from 'lodash'
import {CategorySelector} from './CategorySelector';

const RemoveSelectionButton = styled(StyleableButton)`
  height: 2.15rem;
  vertical-align: bottom;
`;

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

  const unselectProduct = (id) => {
    if (!selectedProducts.includes(id)) return;
    onChange('product_selection_product_ids', selectedProducts.filter((prevId) => prevId !== id))
  }

  const onNewlySelectedCategory = (id?: number) => {
    if (!id) return
    onChange('product_selection_category_ids', [id]);
  }

  const unselectCategory = (id) => {
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
        <FlexItem marginRight="large">
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
        <FlexItem marginRight="large">
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
        block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY && selectedProducts.length > 0 ?
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
    </>
  )
}

export {ProductsSearchQueryBuilder};
