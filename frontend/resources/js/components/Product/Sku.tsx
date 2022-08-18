import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  sku: string;
}

const Sku = ({ sku }: Props) => {
  const [config] = useConfig();

  const StyledSku = styled.p`
    font-family: ${config.fontFamily};
    color: ${config.textColor}
    font-size: 14px;
    opacity: 0.6;
    margin: 0 0 10px 0;
  `;


  return (
    <StyledSku>
      {sku}
    </StyledSku>
  );
};

export default Sku;