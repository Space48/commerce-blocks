import { h } from 'preact';
import styled from 'styled-components';
import Spinner from './Icons/Spinner';
import useConfig from '../hooks/useConfig';

/** @jsx h */

const Loading = () => {
  const [config] = useConfig();

  const StyledDiv = styled.div`
    color: ${config.iconColor};
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

  return (
    <StyledDiv>
      <Spinner />
    </StyledDiv>
  );
};

export default Loading;