import { h } from 'preact';
import styled from 'styled-components';
import useConfig from '../../hooks/useConfig';

/** @jsx h */

interface Props {
  name: string;
}

const Name = ({ name }: Props) => {
  const [config] = useConfig();

  const StyledName = styled.p`
    font-family: ${config.fontFamily};
    color: ${config.textColor}
    margin: 0 0 10px 0;
  `;

  return (
    <StyledName>
      {name}
    </StyledName>
  );
};

export default Name;