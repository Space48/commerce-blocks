export interface Product {
  name: string;
  sku: string;
  path: string;
  addToCartUrl: string;
  images: ImageEdge;
  prices: {
    price: Price,
    salePrice: Price,
    basePrice: Price,
    retailPrice: Price,
  }
}

export interface CategoryNode {
  node: {
    entityId: number;
    isSelected: boolean;
    name: string;
    productCount: number;
    enabled: boolean;
  }
}

export interface Categories {
  edges: CategoryNode[]
}

export interface AttributesNode {
  node: {
    isSelected: boolean;
    value: string;
    productCount: number;
    enabled: boolean;
  }
}

export interface Attributes {
  edges: AttributesNode[]
}

export interface SelectedAttributes {
  [key: string] : string[];
}

export interface Filter {
  name: string;
  enabled: boolean;
  categories?: Categories;
  attributes?: Attributes;
}

export enum LAYOUT_TYPE {
  Grid = 'GRID',
  Carousel = 'CAROUSEL'
}

export interface Price {
  value: number;
}

export interface Image {
  url: string;
  altText: string;
  isDefault: boolean;
}

export interface ImageNode {
  node: Image;
}

export interface ImageEdge {
  edges: ImageNode[]
}

export interface ProductNode {
  node: Product
}

export interface FiltersNode {
  node: Filter
}

export interface Config {
  type: string;
  columns: number;
  perPage: number;
  btnColor: string;
  btnHoverColor: string;
  btnTextColor: string;
  btnTextHoverColor: string;
  fontFamily: string;
  textColor: string;
  iconColor: string;
  enableSearch: boolean;
  enableFilters: boolean;
  source: string;
  gaId: string;
}

export interface SortOption {
  label: string;
  value: string;
}