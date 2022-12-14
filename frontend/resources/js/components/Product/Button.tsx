import { h } from 'preact';
import styled from 'styled-components';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';
import { Product } from '../../types';
import { getClassName } from '../../helpers';

/** @jsx h */

interface Props {
  label: string;
  onClick: (product: Product) => void;
}

const StyledButton = styled.button`
  background-color: ${props => props.btnColor ?? '#CCC'};
  border: 0;
  color: ${props => props.btnTextColor ?? 'inherit'};
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  padding: 10px 20px;
  display: block;
  text-decoration: none;
  border-radius: 5px;
  width: auto;
  box-sizing: border-box;
  text-align: center;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  &:hover {
    background-color: ${props => props.btnHoverColor ?? '#EEE'};
    color: ${props => props.btnTextHoverColor ?? 'inherit'};
  }
`;

const LinkButton = ({ label, onClick }: Props) => {
  const config = useContext(ConfigContext);

  return (
    <StyledButton
      className={getClassName('product__btn')}
      onClick={onClick}
      btnColor={config?.design?.button_colour}
      btnHoverColor={config?.design?.button_hover_colour}
      btnTextColor={config?.design?.button_text_colour}
      btnTextHoverColor={config?.design?.button_hover_text_colour}
      fontFamily={config?.design?.button_font_family}
      fontSize={config?.design?.button_font_size}
      fontWeight={config?.design?.button_font_weight}
    >
      {label}
    </StyledButton>
  );
};

export default LinkButton;
