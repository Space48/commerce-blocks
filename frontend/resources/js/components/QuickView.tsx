import { h } from 'preact';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Product } from '../types';
import { Image, LinkButton, NameLink, Prices, Sku, PlaceholderImage } from './Product';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick-reset.scss';
import './slick-custom.scss';
import { Devices, getClassName } from '../helpers';
import { CloseIcon } from './Icons';
import ConfigContext from '../context/ConfigContext';
import { useContext } from 'preact/compat';

/** @jsx h */

interface Props {
  product?: Product;
  onClose: (event: any) => void;
  siteUrl: string | null;
}

const StyledDiv = styled.div`
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  color: ${props => props.textColor ?? 'inherit'};
  display: flex;
  flex-direction: column;

  @media ${Devices.tablet} {
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
  color: ${props => props.iconColor ?? '#000'};

  svg {
    display: grid;
  }
`;

const StyledSlider = styled.div`
  min-width: 300px;
  margin-bottom: 40px;

  @media ${Devices.tablet} {
    min-width: 350px;
    margin-bottom: 0;
  }

  @media ${Devices.desktop} {
    min-width: 400px;
  }
`;

const StyledProductDiv = styled.div`
  @media ${Devices.tablet} {
    min-width: 200px;
    margin-left: ${props => props.hasImage ? '20px' : '0'};
  }

   @media ${Devices.desktop} {
    margin-left: ${props => props.hasImage ? '60px' : '0'};
  }
`;

const QuickView = ({ product, onClose, siteUrl }: Props) => {
  const config = useContext(ConfigContext);

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

  const productUrl = siteUrl ? `${siteUrl}${product.path}` : null;
  const linkAttributes = productUrl ? { href: productUrl } : {};

  return (
    <StyledDiv
      className={getClassName('modal__container')}
      fontFamily={config?.design?.text_font_family}
      fontSize={config?.design?.text_font_size}
      fontWeight={config?.design?.text_font_weight}
      textColor={config?.design?.text_colour}
      hasImage={hasImage}
    >
      <StyledCloseAnchor
        className={getClassName('modal__close-btn')}
        onClick={onClose}
        href="#"
        iconColor={config?.design?.button_colour}
      >
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

      <StyledProductDiv
        className={getClassName('modal__product')}
        hasImage={hasImage}
      >
        <Sku sku={product.sku} />
        <NameLink {...linkAttributes}>{product.name}</NameLink>
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
