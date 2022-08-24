import React from 'react';
import styled from 'styled-components';
import {theme} from '@bigcommerce/big-design-theme';

const Badge = styled.div`
  background-color: ${({color, theme}) => color ? color : theme.colors.warning30};
  border-radius: ${({theme}) => theme.borderRadius.normal};
  display: inline-block;
  color: #000;
  font-weight: ${({bold}) => bold ? 'bold' : 'normal'};
  padding: ${({theme}) => theme.spacing.xSmall};
  margin-right: ${({theme}) => theme.spacing.xSmall};
`;
Badge.defaultProps = {theme};

interface Props {
  color?: string | null;
  bold?: boolean;
  children: JSX.Element | string
}

const FeatureBadge = ({children, color = null, bold = true}: Props) => {
  return (
    <Badge color={color} bold={bold}>
      {children}
    </Badge>
  )
}

export {FeatureBadge};
