import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

const StyledButton = styled.button`
  padding: 5px;
  &:disabled {
    opacity: 0.1;
  }
`;

const Button = (props) => (
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
);

export default Button;