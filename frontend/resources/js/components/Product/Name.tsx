import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  name: string;
}

const StyledName = styled.p`
  font-family: ${props => props.fontFamily};
  color: ${props => props.textColor}
  margin: 0 0 10px 0;
`;

const Name = ({ name }: Props) => {
  const [config] = useConfig();
  return (
    <StyledName fontFamily={config.fontFamily} textColor={config.textColor}>
      {name}
    </StyledName>
  );
};

export default Name;