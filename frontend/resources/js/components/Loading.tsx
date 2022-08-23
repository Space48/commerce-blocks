import { h } from 'preact';
import styled from 'styled-components';
import Spinner from './Icons/Spinner';
import { useContext } from 'preact/compat';
import ConfigContext from '../context/ConfigContext';

/** @jsx h */

const StyledDiv = styled.div`
  color: ${props => props.iconColor ?? '#000'};
  width: 32px;
  height: 32px;
  margin: 0px auto;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  animation: rotation 2s infinite linear; 
}`;

const Loading = () => {
  const config = useContext(ConfigContext);

  return (
    <StyledDiv color={config?.design?.button_colour}>
      <Spinner />
    </StyledDiv>
  );
};

export default Loading;