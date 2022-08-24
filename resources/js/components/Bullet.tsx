import React from 'react';
import styled from 'styled-components';
import {theme} from '@bigcommerce/big-design-theme';

const StyledSvg = styled.svg`
    vertical-align: middle;
    height: ${({theme}) => theme.spacing.large};
    width: ${({theme}) => theme.spacing.large};
`
StyledSvg.defaultProps = {theme};

interface Props {
  color?: string
}

const Bullet = ({color = '#FFE180'}: Props) => {
  return (
    <StyledSvg fill="currentColor" height="18" stroke="currentColor" strokeWidth="0" viewBox="0 0 18 18" width="18"
               className="sc-bwzfXH gxVJAp">
      <rect fill={color} height="8" rx="4" transform="matrix(-1.45705e-08 1 1 1.31134e-07 0 0)" width="8"></rect>
    </StyledSvg>
  )
}

export {Bullet};
