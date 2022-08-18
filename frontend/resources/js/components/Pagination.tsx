import { h } from 'preact';
import styled from 'styled-components';
import { Button, CurrentPage }  from './Paginate/';
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
      <Button
        onClick={onPaginatePrevious}
        disabled={!showPreviousPageBtn}
      >
        <ChevronLeft />
      </Button>
    )}
    <CurrentPage page={pages.length + 1} />
    {showNextPageBtn && (
      <Button
        onClick={onPaginateNext}
        disabled={!showNextPageBtn}
      >
        <ChevronRight />
      </Button>
    )}
  </StyledPagination>
)
;

export default Pagination;