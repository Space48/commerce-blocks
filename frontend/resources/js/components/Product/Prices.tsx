import { Fragment, h } from 'preact';
import styled from 'styled-components';
import { getPriceText } from '../../helpers/price';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';

/** @jsx h */

interface Props {
  msrp: number | null;
  price: number;
  sale: number | null;
}

const StyledPrice = styled.p`
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  color: ${props => props.textColor ?? 'inherit'}
  margin: 0 0 20px 0;
`;

const Price = ({ msrp, price, sale }: Props) => {
  const config = useContext(ConfigContext);

  return (
    <StyledPrice
      fontFamily={config?.design.price_font_family}
      fontSize={config?.design.price_font_size}
      fontWeight={config?.design.price_font_weight}
      textColor={config?.design?.price_colour}
    >
      {sale && (price > sale) ? (
        <Fragment>
          {msrp && <div>MSRP: {getPriceText(msrp)}</div>}
          <div>Was: {getPriceText(price)}</div>
          <div>Now: {getPriceText(sale)}</div>
        </Fragment>
      ) : (
        <div>{getPriceText(price)}</div>
      )}
    </StyledPrice>
  );
};

export default Price;