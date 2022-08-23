import React from 'react';
import {Box, Button, Flex, FlexItem} from '@bigcommerce/big-design';
import styled from 'styled-components';
import {theme} from '@bigcommerce/big-design-theme';
import PropTypes from 'prop-types';

const BottomBarPlaceholder = styled.div`
  min-height: 3em;
`;

const BottomBar = styled(Box)`
  background: ${({theme}) => theme.colors.white};
  border-top: 1px solid ${({theme}) => theme.colors.secondary30};
  bottom: 0;
  left: 0;
  position: fixed;
  padding: 0.75rem 0;
  right: 0;
`;
BottomBar.defaultProps = {theme};

const Container = styled(Box)`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  isLoading: boolean;
  label?: string,
  children?: JSX.Element;
}

const SaveBar = ({isLoading, label = 'Save', children}: Props) => {
  return (
    <BottomBarPlaceholder>
      <BottomBar zIndex="fixed">
        <Container>
          <Flex alignItems="center" justifyContent='flex-start' flexDirection="row-reverse" marginHorizontal="xxxLarge">
            <FlexItem flexBasis="auto">
              <Button type='submit' isLoading={isLoading}>{label}</Button>
            </FlexItem>
            {children}
          </Flex>
        </Container>
      </BottomBar>
    </BottomBarPlaceholder>
  );
}

export default SaveBar;
