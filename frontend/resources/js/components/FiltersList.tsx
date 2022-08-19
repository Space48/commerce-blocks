import { h } from 'preact';
import { useState } from 'preact/compat';
import styled from 'styled-components';
import useConfig from '../hooks/useConfig';
import Option from './Filters/Option';
import { ChevronLeft } from './Icons';

/** @jsx h */

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

const StyledButton = styled.button`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const StyledChevron = styled.div`
  display: inline-block;
  transform: rotate(${props => props.isOpen ? '90deg' : '270deg'});
  margin-left: 20px;
  color: ${props => props.iconColor};
`;

const FiltersList = ({ filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config] = useConfig();

  return (
    <div>
      <StyledButton
        onClick={() => setIsOpen(prev => !prev)}
      >
        Show Filters
        <StyledChevron isOpen={isOpen} iconColor={config.iconColor}>
          <ChevronLeft />
        </StyledChevron>
      </StyledButton>
      <StyledFilterWrapper color={config.iconColor} className={isOpen ? 'active' : ''}>
        <StyledOptionsWrapper>
          {filters.slice(0, 4).map(filter => <Option key={filter.node.name} filter={filter.node.name} />)}
        </StyledOptionsWrapper>
      </StyledFilterWrapper>
    </div>
  );
};

export default FiltersList;