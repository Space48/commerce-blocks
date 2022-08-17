import { Fragment, h } from 'preact';
import styled from 'styled-components';
import { getPriceText } from '../../helpers/price';

/** @jsx h */

interface Props {
  msrp: number | null;
  price: number;
  sale: number | null;
}

const StyledPrice = styled.p`
  margin: 0 0 20px 0;
  opacity: 0.6;
`;

const Price = ({ msrp, price, sale }: Props) => (
  <StyledPrice>
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

export default Price;