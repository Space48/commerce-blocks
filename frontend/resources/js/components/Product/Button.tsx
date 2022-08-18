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
  display: block;
  text-decoration: none;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const Button = ({ label, url }: Props) => {
  const [config] = useConfig();
  
  return (
    <StyledButton
      href={url}
      target="_blank"
      rel="noreferrer"
      btnColor={config.btnColor}
      btnTextColor={config.btnTextColor}
      fontFamily={config.fontFamily}
    >
      {label}
    </StyledButton>
  );
};

export default Button;