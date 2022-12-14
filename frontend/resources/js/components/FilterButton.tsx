import { h } from 'preact';
import styled from 'styled-components';
import { ChevronLeft } from './Icons';
import ConfigContext from '../context/ConfigContext';
import { useContext } from 'preact/compat';
import { getClassName } from '../helpers';

/** @jsx h */

const StyledAnchorButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: ${props => props.textColor ?? '#000'};
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
      className={getClassName('filter__btn')}
      onClick={onClick}
      href="#"
      textColor={config?.design?.text_colour}
    >
      Show Filters
      <StyledChevron isOpen={isOpen} iconColor={config?.design?.button_colour}>
        <ChevronLeft />
      </StyledChevron>
    </StyledAnchorButton>
  );
};

export default FilterButton;