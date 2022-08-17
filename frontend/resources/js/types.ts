
export interface Product {
  name: string;
  sku: string;
  path: string;
  addToCartUrl: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
        isDefault: boolean;
      }
    }[];
  }[];
  prices: {
    salePrice: {
      value: string;
    },
    basePrice: {
      value: string;
    }
  }
}

export interface ProductNode {
  node: Product
}