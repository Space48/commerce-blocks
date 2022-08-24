import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

interface Props {
  sku: string;
}

const StyledSku = styled.p`
  opacity: 0.6;
  margin: 0 0 10px 0;
`;

const Sku = ({ sku }: Props) => (
  <StyledSku>
    {sku}
  </StyledSku>
);

export default Sku;