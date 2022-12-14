import { h } from 'preact';
import styled from 'styled-components';
import { Filter } from './Filters';
import { FiltersNode } from '../types';
import { getClassName } from '../helpers';

/** @jsx h */

interface Props {
  filters: FiltersNode[];
  isOpen: boolean;
  onCategoryChange: (value: number) => void;
  onAttributeChange: (attribute: string, value: string) => void;
}

const StyledFilterWrapper = styled.div`
  overflow: hidden;
  transition: max-height 0.25s linear;
  max-height: 0;
  &.active {
     max-height: 500px;
     margin-bottom: 20px;
  }
}`;

const StyledOptionsWrapper = styled.div`
  padding: 20px;
  background-color: #EBEBEB;
  display: flex;
  justify-content: flex-start;
  border-radius: 5px;
}`;

const FiltersList = ({ filters, isOpen, onCategoryChange, onAttributeChange }: Props) => {

  const filterWrapperClass = getClassName('filters__list');

  return (
    <StyledFilterWrapper className={isOpen ? `${filterWrapperClass} active` : filterWrapperClass}>
      <StyledOptionsWrapper className={getClassName('filters__options')}>
        {filters.map(filter => (
          <Filter
            key={filter.node.name}
            filter={filter.node}
            onCategoryChange={onCategoryChange}
            onAttributeChange={onAttributeChange}
          />
        ))}
      </StyledOptionsWrapper>
    </StyledFilterWrapper>
  );
};

export default FiltersList;