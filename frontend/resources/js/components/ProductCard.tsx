import { h } from 'preact';
import { useMemo } from 'preact/compat';
import styled from 'styled-components';
import { Name, Button, Image, Sku, Prices, PlaceholderImage } from './Product/';
import { Product } from '../types';

/** @jsx h */

interface Props {
  product: Product;
}

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductCard = ({ product }: Props) => {
  const getImage = () => product.images.edges.find(product => product.node.isDefault);

  const image = useMemo(() => {
    const foundImage = getImage();
    return foundImage ? foundImage.node : null;
  }, [product]);

  return (
    <StyledProductCard>
      {image ? (
        <Image src={image.url} altText={image.altText} />
      ) : (
        <PlaceholderImage />
      )}
      <div>
        <Sku sku={product.sku} />
        <Name name={product.name} />
        {product.prices && (
          <Prices
            msrp={product.prices.retailPrice?.value}
            sale={product.prices.price?.value}
            price={product.prices.basePrice?.value}
          />
        )}
      </div>
      <Button label="Add to Cart" url={product.addToCartUrl} />
    </StyledProductCard>
  );
};

export default ProductCard;