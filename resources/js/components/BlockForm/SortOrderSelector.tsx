import {Flex, FlexItem, Select} from '@bigcommerce/big-design';
import {Bullet} from '../Bullet';
import {FeatureBadge} from '../FeatureBadge';
import {theme} from '@bigcommerce/big-design-theme';
import {productsSearchSortOrderOptions} from './config';
import React from 'react';
import {Block} from '../../types';

interface Props {
  block: Block | null;
  onChange: (key: string, value: any) => void;
}

const SortOrderSelector = ({block, onChange}: Props) => {
  return (
    <Flex alignItems="center" marginLeft="small" marginVertical="large">
      <FlexItem marginTop="small">
        <Bullet/>
      </FlexItem>
      <FlexItem>
        <FeatureBadge color={theme.colors.secondary20} bold={false}>sorted by</FeatureBadge>
      </FlexItem>
      <FlexItem marginRight="medium">
        <Select
          options={productsSearchSortOrderOptions}
          onOptionChange={(value) => onChange('product_selection_sort_order', value)}
          placeholder="Choose sort order"
          value={block?.product_selection_sort_order}
        />
      </FlexItem>
    </Flex>
  );
}

export {SortOrderSelector}
