import { h } from 'preact';
import styled from 'styled-components';
import { useContext } from 'preact/compat';
import ConfigContext from '../../context/ConfigContext';

/** @jsx h */

interface Props {
  name: string;
}

const StyledName = styled.p`
  font-family: ${props => props.fontFamily ?? 'inherit'};
  font-size: ${props => props.fontSize ?? 'inherit'};
  color: ${props => props.textColor ?? 'inherit'};
  margin: 0 0 10px 0;
`;

const Name = ({ name }: Props) => {
  const config = useContext(ConfigContext);
  return (
    <StyledName
      fontFamily={config?.design?.text_font_family}
      fontSize={config?.design?.text_font_size}
      textColor={config?.design?.text_colour}
    >
      {name}
    </StyledName>
  );
};

export default Name;