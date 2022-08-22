import { h } from 'preact';
import styled from 'styled-components';
import { Filter as FilterProp } from '../../types';
import Option from './Option';

/** @jsx h */

interface Props {
  filter: FilterProp;
  onCategoryChange?: (entityId: number) => void;
  onAttributeChange?: (attribute: string, value: string) => void;
}

const StyledDiv = styled.div`
  margin-right: 20px;
}`;

const StyledHeading = styled.h4`
  margin-top: 0px;
`;

const Filter = ({ filter, onCategoryChange, onAttributeChange }: Props) => {
  const hasOptions = filter.categories ?? filter.attributes;

  return hasOptions !== undefined ? (
    <StyledDiv>
      <StyledHeading>{filter.name}</StyledHeading>
      {filter.categories !== undefined && (
        filter.categories.edges.map((category) => (
          <Option
            key={category.node.entityId}
            label={category.node.name}
            value={category.node.entityId}
            onCategoryChange={onCategoryChange}
          />
        ))
      )}
      {filter.attributes !== undefined && (
        filter.attributes.edges.map((attribute) => (
          <Option
            key={attribute.node.value}
            label={attribute.node.value}
            value={attribute.node.value}
            identifier={filter.name}
            onAttributeChange={onAttributeChange}
          />
        ))
      )}
    </StyledDiv>
  ) : null;
};

export default Filter;