import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../hooks/useConfig';
import { Filter } from './Filters';
import { FiltersNode } from '../types';

/** @jsx h */

interface Props {
  filters: FiltersNode[];
  isOpen: boolean;
}

const StyledFilterWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.25s linear;
  max-height: 0;
  &.active {
     max-height: 500px;
  }
}`;

const StyledOptionsWrapper = styled.div`
  padding: 20px;
  background-color: #EBEBEB;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
}`;

const FiltersList = ({ filters, isOpen }: Props) => {
  const [config] = useConfig();

  return (
    <StyledFilterWrapper color={config.iconColor} className={isOpen ? 'active' : ''}>
      <StyledOptionsWrapper>
        {filters.map(filter => <Filter key={filter.node.name} filter={filter.node} />)}
      </StyledOptionsWrapper>
    </StyledFilterWrapper>
  );
};

export default FiltersList;