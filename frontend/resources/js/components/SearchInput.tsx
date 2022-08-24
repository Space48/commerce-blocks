import { h } from 'preact';
import styled from 'styled-components';
import { SearchIcon } from './Icons';
import ConfigContext from '../context/ConfigContext';
import { useContext } from 'preact/compat';

/** @jsx h */

interface Props {
  searchTerm: string;
  onChange: (event: HTMLInputElement) => void;
}

const StyledDiv = styled.div`
  position: relative;
}`;

const StyledInput = styled.input`
  padding: 10px 10px 10px 40px;
  width: 100%;
  border: 1px solid #CCC;
  border-radius: 5px;
  margin-bottom: 20px;
}`;

const StyledIconContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  opacity: 0.25;
  color: ${props => props.iconColor ?? '#000'}
`;

const SearchInput = ({ searchTerm, onChange }: Props) => {
  const config = useContext(ConfigContext);

  return  (
    <StyledDiv>
      <StyledIconContainer iconColor={config?.design?.button_colour}>
        <SearchIcon />
      </StyledIconContainer>
      <StyledInput
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