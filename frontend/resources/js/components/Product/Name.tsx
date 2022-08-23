import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

interface Props {
  name: string;
}

const StyledName = styled.p`
  margin: 0 0 10px 0;
`;

const Name = ({ name }: Props) => (
  <StyledName>
    {name}
  </StyledName>
);

export default Name;