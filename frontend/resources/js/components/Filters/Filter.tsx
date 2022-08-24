import { h } from 'preact';
import styled from 'styled-components';
import { Filter as FilterProp } from '../../types';
import Option from './Option';
import ConfigContext from '../../context/ConfigContext';
import { useContext } from 'preact/compat';

/** @jsx h */

interface Props {
  filter: FilterProp;
  onCategoryChange?: (entityId: number) => void;
  onAttributeChange?: (attribute: string, value: string) => void;
}

const StyledDiv = styled.div`
  margin-right: 20px;
  width: 100%;
}`;

const StyledHeading = styled.h4`
  margin-top: 0px;
  color: ${props => props.textColor ?? 'inherit'};
`;

const Filter = ({ filter, onCategoryChange, onAttributeChange }: Props) => {
  const config = useContext(ConfigContext);
  const hasOptions = filter.categories ?? filter.attributes;

  return hasOptions !== undefined ? (
    <StyledDiv>
      <StyledHeading textColor={config?.design?.text_colour}>{filter.name}</StyledHeading>
      {filter.categories !== undefined && (
        filter.categories.edges.map((category) => (
          <Option
            key={category.node.entityId}
            label={category.node.name}
            value={category.node.entityId}
            onCategoryChange={onCategoryChange}
            enabled={category.node.enabled}
            count={category.node.productCount}
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
            count={attribute.node.productCount}
          />
        ))
      )}
    </StyledDiv>
  ) : null;
};

export default Filter;