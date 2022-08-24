import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ListModal} from './ListModal';
import {useDebounce, useProducts} from '../../hooks';

const ProductListModal = ({visible, setVisible, storeHash, onSelect}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageOptions] = useState<number[]>([25, 50, 100, 200]);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [products, meta, error, isLoading] = useProducts(storeHash, {
    limit: itemsPerPage,
    page: currentPage,
    keyword: debouncedSearchTerm,
    include_fields: ['id', 'sku', 'name', 'custom_url', 'image_url'],
    include: 'images',
  });

  return (
    <ListModal
      label='Product'
      plural='Products'
      keyId='sku'
      isLoading={isLoading}
      visible={visible}
      treeNodes={products}
      count={meta ? meta.pagination.total : 0}
      onSelect={onSelect}
      setVisible={setVisible}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      itemsPerPage={itemsPerPage}
      setItemsPerPage={setItemsPerPage}
      itemsPerPageOptions={itemsPerPageOptions}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
      error={error}
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
