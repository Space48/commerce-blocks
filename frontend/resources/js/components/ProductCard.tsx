import { h } from 'preact';
import { useCallback, useMemo } from 'preact/compat';
import styled from 'styled-components';
import { Name, LinkButton, Image, Sku, Prices, PlaceholderImage, Button } from './Product/';
import { Product } from '../types';

/** @jsx h */

interface Props {
  product: Product;
  onQuickView: (product: Product) => void;
}

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  &:hover .sp48-overlay-btns {
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
      <StyledOverlayButtons className="sp48-overlay-btns">
        <LinkButton label="Add to Cart" url={product.addToCartUrl} />
        <Button label="Quick view" onClick={onClick} />
      </StyledOverlayButtons>
    </StyledProductCard>
  );
};

export default ProductCard;