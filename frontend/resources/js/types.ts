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
  btnTextColor: string;
  fontFamily: string;
  textColor: string;
  enableSearch: boolean;
  enableFilters: boolean;
}

export interface SortOption {
  label: string;
  value: string;
}