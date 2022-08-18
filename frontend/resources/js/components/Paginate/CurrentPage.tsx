import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

const StyledSpan = styled.span`
  display: block;
  font-size: 14px;
  background-color: #EBEBEB;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0px 20px;
`;

interface Props {
  page: number;
}

const CurrentPage = ({ page }: Props) => (
  <StyledSpan>{page}</StyledSpan>
);

export default CurrentPage;