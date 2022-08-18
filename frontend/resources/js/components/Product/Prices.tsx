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

const Price = ({ msrp, price, sale }: Props) => {
  const [config] = useConfig();

  const StyledPrice = styled.p`
    font-family: ${config.fontFamily};
    color: ${config.textColor}
    margin: 0 0 20px 0;
    opacity: 0.6;
  `;

  return (
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
};

export default Price;