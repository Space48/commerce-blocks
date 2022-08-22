import { h } from 'preact';
import styled from 'styled-components';
import { PreactElement } from 'preact/src/internal';

/** @jsx h */

interface Props {
  isLoading: boolean;
  children: PreactElement[];
}

const StyledContainer = styled.div`
  height: 100%;
  opacity: ${props => props.isLoading ? '0.2' : '1'};
  transition: opacity 0.25s ease-in-out;
  max-width: 1024px;
  margin: 0px auto;
`;

const Container = ({ isLoading, children }: Props) => (
  <StyledContainer isLoading={isLoading}>
    {children}
  </StyledContainer>
);

export default Container;