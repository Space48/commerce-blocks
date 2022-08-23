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

// todo: enabled should disable on-click of the nav.
const StyledDiv = styled.div`
  margin-right: 20px;
  width: 100%;
  // opacity: ${props => props.enabled ? '0.5' : '1'};
}`;

const StyledHeading = styled.h4`
  margin-top: 0px;
`;

const Filter = ({ filter, onCategoryChange, onAttributeChange }: Props) => {
  const hasOptions = filter.categories ?? filter.attributes;

  return hasOptions !== undefined ? (
    <StyledDiv enabled={filter.enabled}>
      <StyledHeading>{filter.name}</StyledHeading>
      {filter.categories !== undefined && (
        filter.categories.edges.map((category) => (
          <Option
            key={category.node.entityId}
            label={category.node.name}
            value={category.node.entityId}
            onCategoryChange={onCategoryChange}
            enabled={category.node.enabled}
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
            enabled={attribute.node.enabled}
          />
        ))
      )}
    </StyledDiv>
  ) : null;
};

export default Filter;