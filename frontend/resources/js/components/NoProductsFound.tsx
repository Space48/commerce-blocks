import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../hooks/useConfig';

/** @jsx h */

const StyledDiv = styled.div`
  color: ${props => props.iconColor};
}`;

const NoProductsFound = () => {
  const [config] = useConfig();

  return (
    <StyledDiv color={config.iconColor}>
      <p>No products found. Try a different search term.</p>
    </StyledDiv>
  );
};

export default NoProductsFound;