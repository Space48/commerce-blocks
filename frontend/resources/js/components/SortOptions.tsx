import { h } from 'preact';
import styled from 'styled-components';
import { SortOption } from '../types';

/** @jsx h */

interface Props {
  selected: string;
  options: SortOption[];
  onChange: (event: HTMLSelectElement) => void;
}

const StyledSelect = styled.select`
  padding: 10px;
  width: 100%;
  border: 1px solid #CCC;
  border-radius: 5px;
}`;

const SortOptions = ({ selected, options, onChange }: Props) => {

  return (
    <div>
      <StyledSelect onChange={onChange}>
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === selected}
          >{option.label}</option>
        ))}
      </StyledSelect>
    </div>
  );
};

export default SortOptions;