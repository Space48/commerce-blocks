import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

interface Props {
  label: string;
  url: string;
}

const StyledButton = styled.a`
  padding: 20px;
`;

const Button = ({ label, url }: Props) => (
  <div>
    <StyledButton href={url} target="_blank" rel="noreferrer">
      {label}
    </StyledButton>
  </div>

);

export default Button;