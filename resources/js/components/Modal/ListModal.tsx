import React from 'react';
import {Box, H3, Input, Modal, Small} from '@bigcommerce/big-design';
import {ContentLoading, StatefulTree} from '../index';
import {SearchIcon} from '@bigcommerce/big-design-icons';

interface Props {
  label: string;
  plural: string;
  keyId: string;
  visible: boolean;
  setVisible: (boolean) => void;
  isLoading: boolean;
  treeNodes: [];
  defaultExpanded?: string[];
  count?: number;
  onSelect: () => void;
  currentPage?: number;
  setCurrentPage: (number) => void;
  itemsPerPageOptions: number[];
  itemsPerPage?: number,
  setItemsPerPage: (number) => void;
  searchTerm: string;
  onSearch: (string) => void;
  error: object;
}


const ListModal = (
  {
    label,
    plural,
    keyId,
    visible,
    setVisible,
    isLoading,
    treeNodes,
    defaultExpanded = [],
    count = 1,
    onSelect,
    currentPage = 1,
    setCurrentPage,
    itemsPerPageOptions = [],
    itemsPerPage = 1,
    setItemsPerPage,
    searchTerm,
    onSearch,
    error,
  }: Props) => {

  const onItemsPerPageChange = (newRange) => {
    setCurrentPage(1);
    setItemsPerPage(newRange);
  };

  return (
    <Modal
      isOpen={visible}
      closeOnClickOutside={true}
      closeOnEscKey={true}
      onClose={() => setVisible(false)}
      actions={[{
        text: 'Cancel',
        variant: 'subtle',
        onClick: () => setVisible(false),
      }]}
    >
      <h2>Select a {label.toLowerCase()}</h2>
      <Input
        value={searchTerm}
        placeholder='Search'
        iconLeft={<SearchIcon size='large'/>}
        onChange={(event) => onSearch(event.target.value)}
      />
      <Box style={{minHeight: '60vh', marginTop: '0.25rem'}}>
        <ContentLoading loading={isLoading} error={error && error.toString()}>
          <StatefulTree
            headerless={true}
            itemName={`${label}s`}
            treeNodes={treeNodes}
            keyField={keyId}
            onSelect={onSelect}
            defaultExpanded={defaultExpanded}
            pagination={{
              currentPage,
              totalItems: count,
              onPageChange: setCurrentPage,
              itemsPerPageOptions,
              onItemsPerPageChange,
              itemsPerPage,
            }}
            emptyComponent={
              <Box style={{textAlign: 'center'}} paddingVertical="xxxLarge">
                <H3>No {plural.toLowerCase()} found</H3>
                <Small>Add {label}s or adjust your search term</Small>
              </Box>
            }
          />
        </ContentLoading>
      </Box>
    </Modal>
  );
}

export {ListModal};
