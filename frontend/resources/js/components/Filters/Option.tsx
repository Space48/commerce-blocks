import { h } from 'preact';
import styled from 'styled-components';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';
import { getClassName } from '../../helpers';

/** @jsx h */

interface Props {
  label: string;
  value: string | number;
  count: number;
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

const Option = ({ label, value, count, identifier, enabled, onCategoryChange, onAttributeChange }: Props) => {
  const config = useContext(ConfigContext);
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

  const labelWithCount = count > 0 ? `${label} (${count})` :  label;

  const getUniqueId = (inputId) => {
    const name = config?.block_name ?? '';
    return `${name}_${inputId}`;
  };
  
  return (
    <StyledDiv className={getClassName('option__container')}>
      <StyledOption className={getClassName('option')}>
        <label className={getClassName('option__label')} htmlFor={getUniqueId(inputId)}>{labelWithCount}</label>
        <StyledInput
          id={getUniqueId(inputId)}
          className={getClassName('option__input')}
          disabled={!enabled}
          type="checkbox"
          value={value}
          onChange={() => handleClick(value)}
        />
      </StyledOption>
    </StyledDiv>
  );
};

export default Option;