import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

const StyledDiv = styled.div`
  font-size: 24px;
  padding: 20px;
  text-align: center;
`;

interface Props {
  blockName?: string;
}

const PageBuilder = ({ blockName }: Props) => (
  <StyledDiv>
    {blockName !== undefined ? `Block: ${blockName.split('-').join(' ').toUpperCase()}` : 'Please select a block'}
  </StyledDiv>
);

export default PageBuilder;