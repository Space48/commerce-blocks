import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../hooks/useConfig';
import { ChevronLeft } from './Icons';

/** @jsx h */

const StyledAnchorButton = styled.a`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
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
    <StyledAnchorButton
      onClick={onClick}
      href="#"
    >
      Show Filters
      <StyledChevron isOpen={isOpen} iconColor={config.iconColor}>
        <ChevronLeft />
      </StyledChevron>
    </StyledAnchorButton>
  );
};

export default FilterButton;