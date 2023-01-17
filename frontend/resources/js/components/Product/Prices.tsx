import { Fragment, h } from 'preact';
import styled from 'styled-components';
import { getPriceText } from '../../helpers/price';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';
import { getClassName } from '../../helpers';
import { CurrencyInfo } from '../../types';

/** @jsx h */

interface Props {
  msrp: number | null;
  price: number;
  sale: number | null;
  currencyInfo: CurrencyInfo;
}

const StyledDiv = styled.p`
  margin: 0 0 20px 0;
`;

const StyledPrice = styled.p`
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  color: ${props => props.textColor ?? 'inherit'};
  margin-bottom: 0px;
`;

const Price = ({ msrp, price, sale, currencyInfo }: Props) => {
  const config = useContext(ConfigContext);

  return (
    <StyledDiv>
      {sale && (price > sale) ? (
        <Fragment>
          {msrp && (
            <StyledPrice
              className={getClassName('product__price--msrp')}
              fontFamily={config?.design.price_font_family}
              fontSize={config?.design.price_font_size}
              fontWeight={config?.design.price_font_weight}
              textColor={config?.design?.price_colour}
            >
              MSRP: {getPriceText(msrp, currencyInfo)}
            </StyledPrice>
          )}
          <StyledPrice
            className={getClassName('product__price')}
            fontFamily={config?.design.price_font_family}
            fontSize={config?.design.price_font_size}
            fontWeight={config?.design.price_font_weight}
            textColor={config?.design?.price_colour}
          >
            Was: {getPriceText(price, currencyInfo)}
          </StyledPrice>
          <StyledPrice
            className={getClassName('product__price--sale')}
            fontFamily={config?.design.sale_price_font_family}
            fontSize={config?.design.sale_price_font_size}
            fontWeight={config?.design.sale_price_font_weight}
            textColor={config?.design?.sale_price_colour}
          >
            Now: {getPriceText(sale, currencyInfo)}
          </StyledPrice>
        </Fragment>
      ) : (
        <StyledPrice
          className={getClassName('product__price')}
          fontFamily={config?.design.price_font_family}
          fontSize={config?.design.price_font_size}
          fontWeight={config?.design.price_font_weight}
          textColor={config?.design?.price_colour}
        >
          {getPriceText(price, currencyInfo)}
        </StyledPrice>
      )}
    </StyledDiv>
  );
};

export default Price;
