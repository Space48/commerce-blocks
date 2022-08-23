import { h } from 'preact';
import styled from 'styled-components';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';

/** @jsx h */

interface Props {
  label: string;
  url: string;
}

const StyledButton = styled.a`
  background-color: ${props => props.btnColor ?? '#CCC'};
  color: ${props => props.btnTextColor ?? 'inherit'};
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  padding: 10px 20px;
  margin-bottom: 10px;
  display: block;
  text-decoration: none;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  &:hover {
    background-color: ${props => props.btnHoverColor ?? '#EEE'};
    color: ${props => props.btnTextHoverColor ?? 'inherit'};
  }
`;

const LinkButton = ({ label, url }: Props) => {
  const config = useContext(ConfigContext);

  return (
    <StyledButton
      href={url}
      target="_blank"
      rel="noreferrer"
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