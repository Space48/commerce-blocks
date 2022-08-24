import { h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../helpers';

/** @jsx h */

const StyledDiv = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
}`;

const FiltersContainer = ({ children }) => (
  <StyledDiv className={getClassName('filters__container')}>
    {children}
  </StyledDiv>
);

export default FiltersContainer;