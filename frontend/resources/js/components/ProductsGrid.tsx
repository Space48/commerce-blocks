import { h } from 'preact';
import { ProductNode } from '../types';
import ProductCard from './ProductCard';

/** @jsx h */

interface Props {
  products: ProductNode[];
}

const ProductsGrid = ({ products }: Props) => {
  console.log('PRODUCTS', products);
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.node.name} product={product.node} />
      ))}
    </div>
  )
};

export default ProductsGrid;