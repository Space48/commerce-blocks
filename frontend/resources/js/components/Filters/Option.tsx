import { Fragment, h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  label: string;
  value: string | number;
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

const Option = ({ label, value }: Props) => {
  const [config] = useConfig();
  // todo: add filter options
  // todo: onclick
  return (
    <StyledDiv>
      <StyledOption>
        <label htmlFor={value.toString()}>{label}</label>
        <StyledInput id={value} type="checkbox" value={value} />
      </StyledOption>
    </StyledDiv>
  );
};

export default Option;