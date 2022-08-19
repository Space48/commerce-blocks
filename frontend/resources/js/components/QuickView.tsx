import { h } from 'preact';
import styled from 'styled-components';
import Slider from 'react-slick';
import useConfig from '../hooks/useConfig';
import { Product } from '../types';
import {Image, LinkButton, Name, Prices, Sku} from './Product';
import 'slick-carousel/slick/slick.css';

/** @jsx h */

interface Props {
  product?: Product
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  padding: 20px 40px 40px 40px;
}`;

const StyledSlider = styled.div`
  min-width: 400px;
`;

const StyledProductDiv = styled.div`
  max-width: 200px;
  margin-left: 60px;
`;

const QuickView = ({ product }: Props) => {
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

  return (
    <StyledDiv>
      <StyledSlider>
        <Slider {...settings}>
          {product?.images.edges.map(image => (
            <Image key={image.node.url} src={image.node.url} altText={image.node.altText} />
          ))}
        </Slider>
      </StyledSlider>

      <StyledProductDiv>
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