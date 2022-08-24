import { h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../../helpers';

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
  <StyledSpan className={getClassName('page__current')}>{page}</StyledSpan>
);

export default CurrentPage;