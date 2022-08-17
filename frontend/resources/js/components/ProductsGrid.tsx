import { h } from 'preact';
import { ProductNode } from '../types';
import ProductCard from './ProductCard';
import styled from 'styled-components';

/** @jsx h */

interface Props {
  products: ProductNode[];
}

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`;

const ProductsGrid = ({ products }: Props) => {
  console.log('PRODUCTS', products);
  return (
    <StyledProductsGrid>
      {products.map(product => (
        <ProductCard key={product.node.name} product={product.node} />
      ))}
    </StyledProductsGrid>
  );
};

export default ProductsGrid;