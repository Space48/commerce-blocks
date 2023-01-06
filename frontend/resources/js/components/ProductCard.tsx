import { h } from 'preact';
import { useCallback, useMemo } from 'preact/compat';
import styled from 'styled-components';
import { NameLink, LinkButton, Image, Sku, Prices, PlaceholderImage, Button } from './Product';
import { Product } from '../types';
import { getClassName } from '../helpers';

/** @jsx h */

interface Props {
  product: Product;
  onQuickView: (product: Product) => void;
  siteUrl: string | null;
}

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .s48-cb-product__image-container:hover .s48-cb-product__overlay {
    display: flex;
  }

  .s48-cb-product__overlay {
    pointer-events: none;

    a, button {
      pointer-events: all;
    }
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

const ImageContainer = styled.div`
  position: relative;
`;

const ProductCard = ({ product, onQuickView, siteUrl }: Props) => {
  const getImage = () => product.images.edges.find(product => product.node.isDefault);

  const image = useMemo(() => {
    const foundImage = getImage();
    return foundImage ? foundImage.node : null;
  }, [product]);

  const onClick = useCallback(() => {
    onQuickView(product);
  }, [product]);

  const productUrl = siteUrl ? `${siteUrl}${product.path}` : null;
  const linkAttributes = productUrl ? { href: productUrl } : {};

  return (
    <StyledProductCard className={getClassName('product__card')}>
      <ImageContainer className={getClassName('product__image-container')}>
        <a {...linkAttributes} className={getClassName('product__image-link')}>
          {image ? (
            <Image src={image.url} altText={image.altText} />
          ) : (
            <PlaceholderImage />
          )}
        </a>
        <StyledOverlayButtons className={getClassName('product__overlay')}>
          <LinkButton label="Add to Cart" url={product.addToCartUrl} />
          <Button label="Quick view" onClick={onClick} />
        </StyledOverlayButtons>
      </ImageContainer>
      <div>
        <Sku sku={product.sku} />
        <NameLink {...linkAttributes}>{product.name}</NameLink>
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
