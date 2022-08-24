import { h } from 'preact';
import styled from 'styled-components';
import { PreactElement } from 'preact/src/internal';
import { useContext } from 'preact/compat';
import ConfigContext from '../context/ConfigContext';
import { getClassName } from '../helpers';

/** @jsx h */

interface Props {
  isLoading: boolean;
  children: PreactElement[];
}

const StyledContainer = styled.div`
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  font-weight: ${props => props.fontWeight ?? 'inherit'};
  color: ${props => props.textColor ?? 'inherit'};
  opacity: ${props => props.isLoading ? '0.2' : '1'};
  height: 100%;
  transition: opacity 0.25s ease-in-out;
  max-width: 1024px;
  margin: 40px auto;
  text-align: left;
`;

const Container = ({ isLoading, children }: Props) => {
  const config = useContext(ConfigContext);
  return (
    <StyledContainer
      className={getClassName('container')}
      fontFamily={config?.design?.text_font_family}
      fontSize={config?.design?.text_font_size}
      fontWeight={config?.design?.text_font_weight}
      textColor={config?.design?.text_colour}
      isLoading={isLoading}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;