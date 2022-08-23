import { h } from 'preact';
import styled from 'styled-components';
import { PreactElement } from 'preact/src/internal';
import { useContext } from 'preact/compat';
import ConfigContext from '../context/ConfigContext';

/** @jsx h */

interface Props {
  isLoading: boolean;
  children: PreactElement[];
}

const StyledContainer = styled.div`
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  color: ${props => props.textColor ?? 'inherit'}
  height: 100%;
  opacity: ${props => props.isLoading ? '0.2' : '1'};
  transition: opacity 0.25s ease-in-out;
  max-width: 1024px;
  margin: 0px auto;
`;

const Container = ({ isLoading, children }: Props) => {
  const config = useContext(ConfigContext);
  return (
    <StyledContainer
      fontFamily={config?.design?.text_font_family}
      fontSize={config?.design?.text_font_size}
      textColor={config?.design?.text_colour}
      isLoading={isLoading}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;