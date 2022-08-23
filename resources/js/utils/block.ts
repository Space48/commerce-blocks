import {Block, LAYOUT_TYPE} from '../types';
import {SelectOption, SelectOptionGroup} from '@bigcommerce/big-design/dist/components/Select/types';

export const blankBlock: Block = {
  bigcommerce_store_id: null,
  name: '',
  channel_id: null,
  design_id: null,
  block_type: null,
  valid_domain: '',
  graphql_access_token: '',
  graphql_access_token_expires_at: null,
  graphql_filters: []
};

export const blockTypeOptions: SelectOptionGroup<any>[] | SelectOption<any>[] = [
  {content: 'Carousel', value: LAYOUT_TYPE.Carousel},
  {content: 'Grid', value: LAYOUT_TYPE.Grid}
]

export const CREATE = 'created';
export const UPDATE = 'updated';
