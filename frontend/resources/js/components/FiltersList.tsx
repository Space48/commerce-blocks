import { h } from 'preact';
import { useState } from 'preact/compat';
import styled from 'styled-components';
import useConfig from '../hooks/useConfig';
import Option from './Filters/Option';
import { ChevronLeft } from './Icons';
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
        {filters.slice(0, 4).map(filter => <Option key={filter.node.name} filter={filter.node.name} />)}
      </StyledOptionsWrapper>
    </StyledFilterWrapper>
  );
};

export default FiltersList;