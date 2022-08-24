import React from 'react';
import {Box, Flex, FlexItem, Select} from '@bigcommerce/big-design';
import {DeleteIcon} from '@bigcommerce/big-design-icons';
import {FeatureBadge} from '../FeatureBadge';
import {Bullet} from '../Bullet';
import {PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS, productsSearchSelectionTypeOptions} from './config';
import {Block} from '../../types';
import {ProductSelector} from './ProductSelector';

interface Props {
  storeHash: string;
  block: Block | null;
  onChange: (key: string, value: any) => void;
}

const ProductsSearchQueryBuilder = ({storeHash, block, onChange}: Props) => {
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
        <FlexItem>
          {
            block?.product_selection_type === PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS ?
              <ProductSelector storeHash={storeHash}/> : null
          }
        </FlexItem>
      </Flex>
    </>
  )
}

export {ProductsSearchQueryBuilder};
