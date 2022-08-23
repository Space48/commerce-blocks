import { h } from 'preact';
import styled from 'styled-components';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';

/** @jsx h */

const StyledButton = styled.button`
  color: ${props => props.iconColor ?? '#000'};
  padding: 5px;
  &:disabled {
    opacity: 0.1;
  }
`;

const PaginateButton = (props) => {
  const config = useContext(ConfigContext);

  return (
    <StyledButton {...props} iconColor={config?.design?.button_colour}>
      {props.children}
    </StyledButton>
  );
};

export default PaginateButton;