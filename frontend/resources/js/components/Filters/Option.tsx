import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

interface Props {
  label: string;
  value: string | number;
  identifier?: string;
  onCategoryChange?: (value: number) => void;
  onAttributeChange?: (attribute: string, value: string) => void;
  enabled?: boolean;
}

const StyledDiv = styled.div`
  margin-right: 20px;
}`;

const StyledOption = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}`;

const StyledInput = styled.input`
  margin-right: 10px;
  padding: 5px;
`;

const Option = ({ label, value, identifier, enabled, onCategoryChange, onAttributeChange }: Props) => {
  const handleClick = (value: string | number) => {
    if (onCategoryChange !== undefined && typeof value === 'number') {
      onCategoryChange(value);
    }
    if (onAttributeChange !== undefined && typeof value === 'string' && identifier !== undefined) {
      onAttributeChange(identifier, value);
    }
  };
  const inputId = identifier ? `${identifier.toLowerCase()}-` + value.toString() : 'category-' + value.toString();
  
  if (label === '') {
    return null;
  }
  
  return (
    <StyledDiv>
      <StyledOption>
        <label htmlFor={inputId}>{label}</label>
        <StyledInput disabled={!enabled} id={inputId} type="checkbox" value={value} onChange={() => handleClick(value)} />
      </StyledOption>
    </StyledDiv>
  );
};

export default Option;