import { Fragment, h } from 'preact';
import styled from 'styled-components';
import { getPriceText } from '../../helpers/price';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  msrp: number | null;
  price: number;
  sale: number | null;
}

const StyledPrice = styled.p`
  font-family: ${props => props.fontFamily};
  color: ${props => props.textColor}
  margin: 0 0 20px 0;
  opacity: 0.6;
`;

const Price = ({ msrp, price, sale }: Props) => {
  const [config] = useConfig();

  return (
    <StyledPrice fontFamily={config.fontFamily} textColor={config.textColor}>
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