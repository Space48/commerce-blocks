import { h } from 'preact';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Product } from '../types';
import { Image, LinkButton, Name, Prices, Sku, PlaceholderImage } from './Product';
import 'slick-carousel/slick/slick.css';
import { devices } from '../helpers/responsive';
import { CloseIcon } from './Icons';
import useConfig from '../hooks/useConfig';

/** @jsx h */

interface Props {
  product?: Product;
  onClose: () => void;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  
  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 40px;
    padding: ${props => props.hasImage ? '40px 40px 60px 40px' : '20px'} ;
  }
}`;

const StyledCloseAnchor = styled.a`
  position: absolute;
  padding: 5px 10px;
  top: 10px;
  right: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${props => props.iconColor};
}`;

const StyledSlider = styled.div`
  min-width: 300px;
  margin-bottom: 40px;
  
  @media ${devices.tablet} {
    min-width: 350px;
    margin-bottom: 0;
  }
  
  @media ${devices.desktop} {
    min-width: 400px;
  }
`;

const StyledProductDiv = styled.div`
  @media ${devices.tablet} {
    min-width: 200px;
    margin-left: ${props => props.hasImage ? '20px' : '0'};
  }
  
   @media ${devices.desktop} {
    margin-left: ${props => props.hasImage ? '60px' : '0'};
  }
`;

const QuickView = ({ product, onClose }: Props) => {
  const [config] = useConfig();

  if (!product) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const hasImage = product?.images.edges.length > 0;

  return (
    <StyledDiv hasImage={hasImage}>
      <StyledCloseAnchor onClick={onClose} href="#" iconColor={config.iconColor}>
        <CloseIcon />
      </StyledCloseAnchor>
      {hasImage ? (
        <StyledSlider>
          <Slider {...settings}>
            {product?.images.edges.map(image => (
              <Image key={image.node.url} src={image.node.url} altText={image.node.altText} />
            ))}
          </Slider>
        </StyledSlider>
      ) : (
        <PlaceholderImage />
      )}

      <StyledProductDiv hasImage={hasImage}>
        <Sku sku={product.sku} />
        <Name name={product.name} />
        {product.prices && (
          <Prices
            msrp={product.prices.retailPrice?.value}
            sale={product.prices.price?.value}
            price={product.prices.basePrice?.value}
          />
        )}
        <LinkButton label="Add to Cart" url={product.addToCartUrl} />
      </StyledProductDiv>
    </StyledDiv>
  );
};

export default QuickView;