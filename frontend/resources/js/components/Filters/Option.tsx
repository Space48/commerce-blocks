import { Fragment, h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  filter: string;
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

const StyledHeading = styled.h4`
`;

const Option = ({ filter }: Props) => {
  const [config] = useConfig();
  // todo: add filter options
  // todo: onclick
  return (
    <StyledDiv>
      <StyledHeading>{filter}</StyledHeading>
      {[...Array(5)].map((value, index) => (
        <StyledOption key={index}>
          <label htmlFor={index.toString()}>{index}</label>
          <StyledInput id={index} type="checkbox" value={index} />
        </StyledOption>
      ))}
    </StyledDiv>
  );
};

export default Option;