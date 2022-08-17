import { h } from 'preact';
import styled from 'styled-components';
import Spinner from './Icons/Spinner';

/** @jsx h */

const StyledDiv = styled.div`
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
}
`;

const Loading = () => (
  <StyledDiv>
    <Spinner />
  </StyledDiv>
);

export default Loading;