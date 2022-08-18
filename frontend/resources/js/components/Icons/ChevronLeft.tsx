import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */

const ChevronLeft = () => {

  const Icon = styled.div`
    width: 14px;
    height: 22px;
    & > svg {
      fill: currentColor
    }
  }
  `;

  return (
    <Icon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
      </svg>
    </Icon>
  );
};

export default ChevronLeft;