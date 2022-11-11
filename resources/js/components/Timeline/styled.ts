import styled from "styled-components";
import {Box, Grid, GridItem} from "@bigcommerce/big-design";
import {theme} from "@bigcommerce/big-design-theme";

export const StyledBox = styled(Box)`
  margin: ${({theme}) => theme.spacing.xxxLarge} auto 0;

  ${({theme}) => theme.breakpoints.tablet} {
    max-width: 60em;
  }
`
StyledBox.defaultProps = {theme};

export const StyledGrid = styled(Grid)`
  cursor: pointer;
  grid-template-columns: 25% 2px 50%;
  grid-gap: ${({theme}) => theme.spacing.xxLarge};
  margin: 0;
`
StyledGrid.defaultProps = {theme};

export const GridItemDate = styled(GridItem)`
  margin-top: 0.2em;
  padding: ${({theme}) => theme.spacing.large} 0;
  text-align: right;
`;
GridItemDate.defaultProps = {theme};

export const GridItemLine = styled(GridItem)`
  background-color: ${({theme}) => theme.colors.secondary30};
  position: relative;
`;

GridItemLine.defaultProps = {theme};

export const Circle = styled.span`
  position: absolute;
  top: 1.6em;
  left: -0.55em;
  width: 1em;
  height: 1em;
  border-radius: 1em;
  background: white;
  border: 2px solid ${({theme}) => theme.colors.secondary70};
`;
Circle.defaultProps = {theme};

export const GridItemDescription = styled(GridItem)`
  padding: ${({theme}) => theme.spacing.large} 0;
`;
GridItemDescription.defaultProps = {theme};
