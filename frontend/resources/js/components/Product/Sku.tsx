import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  sku: string;
}

const StyledSku = styled.p`
  font-family: ${props => props.fontFamily};
  color: ${props => props.textColor}
  font-size: 14px;
  opacity: 0.6;
  margin: 0 0 10px 0;
`;

const Sku = ({ sku }: Props) => {
  const [config] = useConfig();

  return (
    <StyledSku fontFamily={config.fontFamily} textColor={config.textColor}>
      {sku}
    </StyledSku>
  );
};

export default Sku;