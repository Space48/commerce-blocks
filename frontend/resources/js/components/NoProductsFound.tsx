import { h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../helpers';

/** @jsx h */

const StyledDiv = styled.div`
  margin-top: 40px;
}`;

const NoProductsFound = () => {

  return (
    <StyledDiv className={getClassName('products__empty')}>
      <p>No products found. Try a different search term.</p>
    </StyledDiv>
  );
};

export default NoProductsFound;