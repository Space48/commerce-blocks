import { h } from 'preact';
import styled from 'styled-components';
import Spinner from './Icons/Spinner';
import useConfig from '../hooks/useConfig';

/** @jsx h */

const StyledDiv = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
}`;

const FiltersContainer = ({ children }) => {
  const [config] = useConfig();

  return (
    <StyledDiv color={config.iconColor}>
      {children}
    </StyledDiv>
  );
};

export default FiltersContainer;