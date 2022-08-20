import React, {useMemo} from 'react';
import {Box, H3, Small} from '@bigcommerce/big-design';
import {StoreIcon, WarningIcon} from '@bigcommerce/big-design-icons';

interface Props {
  itemName: string;
  itemNamePlural: string;
  searchTerm?: string;
  error?: string;
}

const TableEmptyComponent = ({error, itemName, itemNamePlural, searchTerm}: Props) => {

  return useMemo(
    () => {
      return (
        <Box style={{textAlign: 'center'}} paddingVertical="xxxLarge">
          {
            (!error && searchTerm === '') ?
              <>
                <StoreIcon color="secondary50" size="xxxLarge"/>
                <H3>Add a {itemName.toLowerCase()} to get started</H3>
              </>
              : (!error && searchTerm !== '') ?
                <>
                  <StoreIcon color="secondary50" size="xxxLarge"/>
                  <H3>No {itemNamePlural.toLowerCase()} found</H3>
                  <Small>Add {itemNamePlural.toLowerCase()} or adjust search term</Small>
                </>
                :
                <>
                  <WarningIcon color="warning" size="xxxLarge"/>
                  <H3>Unable to load {itemNamePlural.toLowerCase()}</H3>
                  <Small>Please try again later</Small>
                </>

          }
        </Box>
      )
    },
    [error, itemName, itemNamePlural]
  );
};

export default TableEmptyComponent;
