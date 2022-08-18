import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */


const Button = (props) => {
  const [config] = useConfig();
  const StyledButton = styled.button`
    color: ${config.iconColor};
    padding: 5px;
    &:disabled {
      opacity: 0.1;
    }
  `;
  
  
  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  );
};

export default Button;