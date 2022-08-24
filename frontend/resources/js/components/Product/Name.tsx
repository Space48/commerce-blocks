import { h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../../helpers';

/** @jsx h */

interface Props {
  name: string;
}

const StyledName = styled.p`
  margin: 0 0 10px 0;
`;

const Name = ({ name }: Props) => (
  <StyledName className={getClassName('product__name')}>
    {name}
  </StyledName>
);

export default Name;