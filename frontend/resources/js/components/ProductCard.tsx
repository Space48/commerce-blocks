import { h } from 'preact';
import { useCallback, useMemo } from 'preact/compat';
import styled from 'styled-components';
import { Name, LinkButton, Image, Sku, Prices, PlaceholderImage, Button } from './Product/';
import { Product } from '../types';
import { getClassName } from '../helpers';

/** @jsx h */

interface Props {
  product: Product;
  onQuickView: (product: Product) => void;
}

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover .s48-cb-product__overlay {
    display: flex;
  }
`;

const StyledOverlayButtons = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  top: 0;
`;

const StyledImagePlaceholder = styled.div`
  position: relative;
`;

const ProductCard = ({ product, onQuickView }: Props) => {
  const getImage = () => product.images.edges.find(product => product.node.isDefault);

  const image = useMemo(() => {
    const foundImage = getImage();
    return foundImage ? foundImage.node : null;
  }, [product]);

  const onClick = useCallback(() => {
    onQuickView(product);
  }, [product]);

  return (
    <StyledProductCard className={getClassName('product__card')}>
      <StyledImagePlaceholder>
        {image ? (
          <Image src={image.url} altText={image.altText} />
        ) : (
          <PlaceholderImage />
        )}
        <StyledOverlayButtons className={getClassName('product__overlay')}>
          <LinkButton label="Add to Cart" url={product.addToCartUrl} />
          <Button label="Quick view" onClick={onClick} />
        </StyledOverlayButtons>
      </StyledImagePlaceholder>
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
    </StyledProductCard>
  );
};

export default ProductCard;
