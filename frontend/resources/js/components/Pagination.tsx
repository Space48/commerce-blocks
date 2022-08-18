import { h } from 'preact';
import styled from 'styled-components';
import { PaginateButton, CurrentPage }  from './Paginate/';
import { ChevronLeft, ChevronRight }  from './Icons/';

/** @jsx h */

interface Props {
  pages: string[];
  showPreviousPageBtn: boolean;
  showNextPageBtn: boolean;
  onPaginatePrevious: () => void;
  onPaginateNext: () => void;
}

const StyledPagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 20px 0px;
`;

const Pagination = ({ pages, showPreviousPageBtn, showNextPageBtn, onPaginatePrevious, onPaginateNext }: Props) => (
  <StyledPagination>
    {(showNextPageBtn || pages.length > 0) && (
      <PaginateButton
        onClick={onPaginatePrevious}
        disabled={!showPreviousPageBtn}
      >
        <ChevronLeft />
      </PaginateButton>
    )}
    <CurrentPage page={pages.length + 1} />
    {showNextPageBtn && (
      <PaginateButton
        onClick={onPaginateNext}
        disabled={!showNextPageBtn}
      >
        <ChevronRight />
      </PaginateButton>
    )}
  </StyledPagination>
)
;

export default Pagination;