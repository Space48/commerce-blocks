import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../hooks/useConfig';
import Option from './Filters/Option';

/** @jsx h */

const StyledDiv = styled.div`
  display: flex;
  padding: 10px;
}`;

const FiltersList = ({ filters }) => {
  const [config] = useConfig();
  // disable for now
  return null;
  // eslint-disable-next-line no-unreachable
  return (
    <StyledDiv color={config.iconColor}>
      {filters.map(filter => <Option key={filter.node.name} filter={filter.node.name} />)}
    </StyledDiv>
  );
};

export default FiltersList;