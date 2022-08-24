import { h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../../helpers';

/** @jsx h */

interface Props {
  sku: string;
}

const StyledSku = styled.p`
  opacity: 0.6;
  margin: 0 0 10px 0;
`;

const Sku = ({ sku }: Props) => (
  <StyledSku className={getClassName('product__sku')}>
    {sku}
  </StyledSku>
);

export default Sku;