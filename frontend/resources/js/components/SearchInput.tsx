import { h } from 'preact';
import styled from 'styled-components';
import { SearchIcon } from './Icons';
import useConfig from '../hooks/useConfig';

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
  margin-bottom: 40px;
}`;

const StyledIconContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  opacity: 0.25;
  color: ${props => props.iconColor}
`;

const SearchInput = ({ searchTerm, onChange }: Props) => {
  const [config] = useConfig();

  return  (
    <StyledDiv>
      <StyledIconContainer iconColor={config.iconColor}>
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