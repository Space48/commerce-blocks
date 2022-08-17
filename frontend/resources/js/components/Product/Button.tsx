import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

interface Props {
  label: string;
  url: string;
}

const StyledButton = styled.a`
  padding: 10px 20px;
  display: block;
  background-color: cornflowerblue;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
`;

const Button = ({ label, url }: Props) => (
  <StyledButton href={url} target="_blank" rel="noreferrer">
    {label}
  </StyledButton>
);

export default Button;