import { ComponentChildren, h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../../helpers';

/** @jsx h */

interface Props {
  href?: string | null;
  children?: ComponentChildren;
}

const StyledName = styled.a`
  display: block;
  margin: 0 0 10px 0;
  text-decoration: none;
`;

const NameLink = ({ href, children }: Props) => {
  const linkAttributes = href ? { href } : {};

  return (
    <StyledName className={getClassName('product__name')} {...linkAttributes}>
      {children}
    </StyledName>
  );
}

export default NameLink;
