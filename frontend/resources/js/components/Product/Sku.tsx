import { h } from 'preact';
import styled from 'styled-components';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';

/** @jsx h */

interface Props {
  sku: string;
}

const StyledSku = styled.p`
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  color: ${props => props.textColor ?? 'inherit'};
  opacity: 0.6;
  margin: 0 0 10px 0;
`;

const Sku = ({ sku }: Props) => {
  const config = useContext(ConfigContext);

  return (
    <StyledSku
      fontFamily={config?.design?.text_font_family}
      fontSize={config?.design?.text_font_size}
      textColor={config?.design?.text_colour}
    >
      {sku}
    </StyledSku>
  );
};

export default Sku;