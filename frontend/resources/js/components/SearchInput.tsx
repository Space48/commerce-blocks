import { h } from 'preact';
import styled from 'styled-components';
import { SearchIcon } from './Icons';
import ConfigContext from '../context/ConfigContext';
import { useContext } from 'preact/compat';
import { getClassName } from '../helpers';

/** @jsx h */

interface Props {
  searchTerm: string;
  onChange: (event: HTMLInputElement) => void;
}

const StyledDiv = styled.div`
  position: relative;
  margin-bottom: 20px;
}`;

const StyledInput = styled.input`
  padding: 10px 10px 10px 40px;
  width: 100%;
  border: 1px solid #CCC;
  border-radius: 5px;
  min-height: 39px;
}`;

const StyledIconContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.25;
  color: ${props => props.iconColor ?? '#000'}
`;

const SearchInput = ({ searchTerm, onChange }: Props) => {
  const config = useContext(ConfigContext);

  return  (
    <StyledDiv className={getClassName('search__container')}>
      <StyledIconContainer iconColor={config?.design?.button_colour} className={getClassName('search__icon')}>
        <SearchIcon />
      </StyledIconContainer>
      <StyledInput
        className={getClassName('search__input')}
        type="text"
        id="search"
        placeholder="Search"
        onChange={onChange}
        value={searchTerm}
      />
    </StyledDiv>
  );
};

export default SearchInput;