import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  label: string;
  url: string;
}

const StyledButton = styled.a`
  background-color: ${props => props.btnColor};
  color: ${props => props.btnTextColor};
  font-family: ${props => props.fontFamily};
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
    background-color: ${props => props.btnHoverColor};
    color: ${props => props.btnTextHoverColor};
  }
`;

const LinkButton = ({ label, url }: Props) => {
  const [config] = useConfig();
  
  return (
    <StyledButton
      href={url}
      target="_blank"
      rel="noreferrer"
      btnColor={config.btnColor}
      btnHoverColor={config.btnHoverColor}
      btnTextColor={config.btnTextColor}
      btnTextHoverColor={config.btnTextHoverColor}
      fontFamily={config.fontFamily}
    >
      {label}
    </StyledButton>
  );
};

export default LinkButton;