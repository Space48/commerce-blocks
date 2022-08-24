import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ListModal} from './ListModal';
import {useDebounce, useProducts} from '../../hooks';
import {TreeSelectableType} from '@bigcommerce/big-design/dist/components/Tree/types';

interface Props {
  visible: boolean,
  setVisible: (boolean) => void;
  storeHash: string;
  onSelectionChange: (selectedItems: number[]) => void;
  selectable?: TreeSelectableType;
}

const ProductListModal = (
  {
    visible,
    setVisible,
    storeHash,
    onSelectionChange,
    selectable = 'radio'
  }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPageOptions] = useState<number[]>([25, 50, 100, 200]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [products, meta, error, isLoading] = useProducts(
    storeHash,
    {
      limit: itemsPerPage.toString(),
      page: currentPage.toString(),
      keyword: debouncedSearchTerm,
      include_fields: ['id', 'sku', 'name', 'custom_url', 'image_url'].join(','),
      include: 'images',
    });

  const productsAsTreeNodes = products ?
    products.map(product => {
      return {...product, value: product.id};
    }) : [];

  return (
    <ListModal
      label='Product'
      plural='Products'
      keyId='sku'
      isLoading={isLoading}
      visible={visible}
      treeNodes={productsAsTreeNodes}
      count={meta ? meta.pagination.total : 0}
      onSelectionChange={onSelectionChange}
      setVisible={setVisible}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      itemsPerPageOptions={itemsPerPageOptions}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
      error={error}
      selectable={selectable}
    />
  );
}

ProductListModal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  storeHash: PropTypes.string,
  onSelect: PropTypes.func,
}

export {ProductListModal};
