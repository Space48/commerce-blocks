import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

const StyledDiv = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
}`;

const FiltersContainer = ({ children }) => {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  );
};

export default FiltersContainer;