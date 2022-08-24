import React from 'react';
import {Box, H3, Input, Modal, Small} from '@bigcommerce/big-design';
import {ContentLoading, StatefulTree} from '../index';
import {SearchIcon} from '@bigcommerce/big-design-icons';
import {TreeSelectableType} from '@bigcommerce/big-design/dist/components/Tree/types';

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
  onSelectionChange: (selectedItems: number[]) => void;
  currentPage?: number;
  setCurrentPage?: (number) => void;
  itemsPerPageOptions?: number[];
  itemsPerPage?: number,
  setItemsPerPage?: (number) => void;
  searchTerm: string;
  onSearch: (string) => void;
  error: object;
  selectable?: TreeSelectableType;
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
    onSelectionChange,
    currentPage = 1,
    setCurrentPage = () => {
    },
    itemsPerPageOptions = [],
    itemsPerPage = 1,
    setItemsPerPage = () => {
    },
    searchTerm,
    onSearch,
    error,
    selectable
  }: Props) => {

  const onItemsPerPageChange = (newRange) => {
    setCurrentPage(1);
    setItemsPerPage(newRange);
  };

  const defaultModalActions = [
    {
      text: 'Cancel',
      variant: 'subtle',
      onClick: () => setVisible(false),
    }
  ];

  const selectModalAction = {text: 'Choose', variant: 'primary', onClick: () => setVisible(false)}
  const modalActions = [
    ...defaultModalActions,
    ...selectable === 'multi' ? [selectModalAction] : []
  ]

  return (
    <Modal
      isOpen={visible}
      closeOnClickOutside={true}
      closeOnEscKey={true}
      onClose={() => setVisible(false)}
      actions={modalActions}
    >
      <h2>Select {selectable === 'multi' ? plural.toLowerCase() : label.toLowerCase()}</h2>
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
            treeNodes={treeNodes}
            keyField={keyId}
            onSelectionChange={onSelectionChange}
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
            selectable={selectable}
          />
        </ContentLoading>
      </Box>
    </Modal>
  );
}

export {ListModal};
