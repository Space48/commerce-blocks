import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

const StyledContainer = styled.div`
  max-width: 1024px;
  margin: 0px auto;
`;

const Container = ({ children }) => (
  <StyledContainer>
    {children}
  </StyledContainer>
);

export default Container;