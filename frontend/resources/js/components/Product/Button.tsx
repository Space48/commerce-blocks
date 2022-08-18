import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  label: string;
  url: string;
}

const Button = ({ label, url }: Props) => {
  const [config] = useConfig();

  const StyledButton = styled.a`
    background-color: ${config.btnColor};
    color: ${config.btnTextColor};
    font-family: ${config.fontFamily};
    padding: 10px 20px;
    display: block;
    text-decoration: none;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  `;
  
  return (
    <StyledButton href={url} target="_blank" rel="noreferrer">
      {label}
    </StyledButton>
  );
};

export default Button;