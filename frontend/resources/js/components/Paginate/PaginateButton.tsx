import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

const StyledButton = styled.button`
  color: ${props => props.iconColor};
  padding: 5px;
  &:disabled {
    opacity: 0.1;
  }
`;

const PaginateButton = (props) => {
  const [config] = useConfig();

  return (
    <StyledButton {...props} iconColor={config.iconColor}>
      {props.children}
    </StyledButton>
  );
};

export default PaginateButton;