import { h } from 'preact';
import { Product } from '../types';
import Name from './Product/Name';
import Button from './Product/Button';

/** @jsx h */

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => (
  <div>
    <Name name={product.name} />
    <Button label="Add to Cart" url={product.addToCartUrl} />
  </div>
);

export default ProductCard;