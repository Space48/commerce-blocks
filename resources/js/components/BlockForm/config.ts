import {SelectOption, SelectOptionGroup} from '@bigcommerce/big-design/dist/components/Select/types';

export const PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS = 'specific_products';
export const PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY = 'category';
export const PRODUCTS_SEARCH_SELECTION_TYPE_SEARCH = 'search';


export const productsSearchSelectionTypeOptions: SelectOption<any>[] | SelectOptionGroup<any>[] = [
  {value: PRODUCTS_SEARCH_SELECTION_TYPE_SPECIFIC_PRODUCTS, content: 'Specific products'},
  {value: PRODUCTS_SEARCH_SELECTION_TYPE_CATEGORY, content: 'Category products'},
  {value: PRODUCTS_SEARCH_SELECTION_TYPE_SEARCH, content: 'Search results'}
];


export const PRODUCTS_SEARCH_FILTER_SEARCH_TERM = 'search_term';
export const PRODUCTS_SEARCH_FILTER_CATEGORIES = 'categories';

export const productsSearchFilterOptions: SelectOption<any>[] | SelectOptionGroup<any>[] = [
  {value: PRODUCTS_SEARCH_FILTER_SEARCH_TERM, content: 'Search term'},
  {value: PRODUCTS_SEARCH_FILTER_CATEGORIES, content: 'Categories'}
]
