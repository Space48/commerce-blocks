import { h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../../helpers';

/** @jsx h */

const StyledDiv = styled.div`
  width: 90%;
  height: 150px;
  background-color: #EBEBEB;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
`;

const PlaceholderImage = () => (
  <StyledDiv className={getClassName('product__image--placeholder')}>
    No Image
  </StyledDiv>
);

export default PlaceholderImage;