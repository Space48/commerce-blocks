import React, {useState} from 'react';
import {Box, Flex, FlexItem, Select, Small} from '@bigcommerce/big-design';
import {CloseIcon, DeleteIcon} from '@bigcommerce/big-design-icons';
import {FeatureBadge} from '../FeatureBadge';
import {Bullet} from '../Bullet';
import {PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS, productsSearchSelectionTypeOptions} from './config';
import {Block} from '../../types';
import {ProductSelector} from './ProductSelector';
import {StyleableButton} from '../StyleableButton';
import {useProducts} from '../../hooks';
import ContentLoading from '../ContentLoading';
import {theme} from '@bigcommerce/big-design-theme';
import styled from 'styled-components';
import {uniq} from 'lodash'

const RemoveProductSelectionButton = styled(StyleableButton)`
  height: 2.15rem;
  vertical-align: bottom;
`;

interface Props {
  storeHash: string;
  block: Block | null;
  onChange: (key: string, value: any) => void;
}

const ProductsSearchQueryBuilder = ({storeHash, block, onChange}: Props) => {

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [products, , productsError] = useProducts(
    storeHash,
    {['id:in']: selectedProducts.join(',') || '9999999999999'}, // easiest way to make sure we don't get any products on requests with selectedproducts
    true
  );

  const onNewlySelectedProducts = (ids: number[]) => {
    if (ids.length === 0) return;

    setSelectedProducts(prev => {
      return uniq([...prev, ...ids]);
    });

  }

  const unselectProduct = (id) => {
    if (!selectedProducts.includes(id)) return;
    setSelectedProducts(prev => prev.filter((prevId) => prevId !== id));
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
        </FlexItem>
      </Flex>
      {
        block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS && selectedProducts.length > 0 ?
          <Box marginLeft="xxLarge">
            <ContentLoading loading={false} error={productsError ?? null}>
              {selectedProducts.length > 0 && products ?
                <Flex flexDirection="column">
                  {products.map(({id, name}) => (
                    <FlexItem key={id} marginLeft="xSmall" marginVertical="xxSmall">
                      <FeatureBadge bold={false} color={theme.colors.secondary20}>
                        <Small color="secondary70" bold={true}>{name}</Small>
                      </FeatureBadge>
                      <RemoveProductSelectionButton
                        variant="subtle"
                        iconOnly={<CloseIcon/>}
                        type="button"
                        onClick={() => unselectProduct(id)}
                      >
                        Remove
                      </RemoveProductSelectionButton>
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
