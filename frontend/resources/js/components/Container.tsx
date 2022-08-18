import { h } from 'preact';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'preact/compat';
import { PreactElement } from 'preact/src/internal';

/** @jsx h */

interface Props {
  isLoading: boolean;
  children: PreactElement[];
}

const StyledContainer = styled.div`
  height: ${props => props.height};
  opacity: ${props => props.isLoading ? '0.2' : '1'};
  transition: opacity 0.25s ease-in-out;
  max-width: 1024px;
  margin: 0px auto;
`;

const Container = ({ isLoading, children }: Props) => {
  const [height, setHeight] = useState('100%');
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      const containerHeight = containerRef?.current.clientHeight;
      setHeight( containerHeight ? `${containerHeight}px` : '100%');
    }, 1000);
  }, [containerRef.current]);
  
  return (
    <StyledContainer ref={containerRef} height={height} isLoading={isLoading}>
      {children}
    </StyledContainer>
  );
};

export default Container;