import { h } from 'preact';
import styled from 'styled-components';
import { Filter as FilterProp } from '../../types';
import Option from './Option';

/** @jsx h */

interface Props {
  filter: FilterProp;
}

const StyledDiv = styled.div`
  margin-right: 20px;
}`;

const StyledHeading = styled.h4`
  margin-top: 0px;
`;

const Filter = ({ filter }: Props) => {
  const hasOptions = filter.categories ?? filter.attributes;

  return hasOptions !== undefined ? (
    <StyledDiv>
      <StyledHeading>{filter.name}</StyledHeading>
      {filter.categories !== undefined && (
        filter.categories.edges.map((category) => (
          <Option key={category.node.entityId} label={category.node.name} value={category.node.entityId} />
        ))
      )}
      {filter.attributes !== undefined && (
        filter.attributes.edges.map((attribute) => (
          <Option key={attribute.node.value} label={attribute.node.value} value={attribute.node.value} />
        ))
      )}
    </StyledDiv>
  ) : null;
};

export default Filter;