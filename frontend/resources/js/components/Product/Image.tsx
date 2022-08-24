import { h } from 'preact';
import styled from 'styled-components';
import { getClassName } from '../../helpers';

/** @jsx h */

interface Props {
  src: string;
  altText: string;
}

const StyledImage = styled.img`
  max-width: 100%;
`;

const Image = ({ src, altText }: Props) => (
  <StyledImage className={getClassName('product__image')} src={src} alt={altText} />
);

export default Image;