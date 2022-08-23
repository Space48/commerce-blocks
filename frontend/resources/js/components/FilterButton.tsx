import { h } from 'preact';
import styled from 'styled-components';
import { ChevronLeft } from './Icons';
import ConfigContext from '../context/ConfigContext';
import { useContext } from 'preact/compat';


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
  color: ${props => props.iconColor ?? '#000'};
`;

const FilterButton = ({ isOpen, onClick }) => {
  const config = useContext(ConfigContext);

  return (
    <StyledAnchorButton
      onClick={onClick}
      href="#"
    >
      Show Filters
      <StyledChevron isOpen={isOpen} iconColor={config?.design?.button_colour}>
        <ChevronLeft />
      </StyledChevron>
    </StyledAnchorButton>
  );
};

export default FilterButton;