import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../hooks/useConfig';
import { ChevronLeft } from './Icons';

/** @jsx h */

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
`;

const StyledChevron = styled.div`
  display: inline-block;
  transform: rotate(${props => props.isOpen ? '90deg' : '270deg'});
  margin-left: 20px;
  color: ${props => props.iconColor};
`;

const FilterButton = ({ isOpen, onClick }) => {
  const [config] = useConfig();

  return (
    <StyledButton
      onClick={onClick}
    >
      Show Filters
      <StyledChevron isOpen={isOpen} iconColor={config.iconColor}>
        <ChevronLeft />
      </StyledChevron>
    </StyledButton>
  );
};

export default FilterButton;