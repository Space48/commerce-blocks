import { h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/compat';
import { useQuery } from '@urql/preact';
import {
  Loading,
  Error,
  ProductsCarousel,
  ProductsGrid,
  Container,
  SearchInput,
  QuickView,
  NoProductsFound,
  FiltersList,
  SortOptions
} from './components';
import { LAYOUT_TYPE, Product } from './types';
import useConfig from './hooks/useConfig';
import { ProductsQuery, SearchQuery } from './helpers/queries';
import Modal from 'react-modal';
import { sortOptions } from './helpers/sort';

/** @jsx h */

Modal.setAppElement('body');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '1024px',
    borderRadius: '5px'
  },
  overlay: {
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const App = () => {
  const [config] = useConfig();
  const [pagination, setPagination] = useState<string[]>([]);
  const [currentPageCursor, setCurrentPageCursor] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('RELEVANCE');

  const [result] = useQuery({
    query: SearchQuery(config.perPage, currentPageCursor, sortOrder, searchTerm)
  });
  const { data, fetching, error } = result;

  const pageInfo = useMemo(() => {
    if (data?.site?.products?.pageInfo) {
      return data?.site?.products?.pageInfo;
    }
    if (data?.site?.search?.searchProducts?.products?.pageInfo) {
      return data?.site?.search?.searchProducts?.products?.pageInfo;
    }
  }, [data]);

  const products = useMemo(() => {
    if (data?.site?.products?.edges) {
      return data?.site?.products?.edges;
    }
    if (data?.site?.search?.searchProducts?.products?.edges) {
      return data?.site?.search?.searchProducts?.products?.edges;
    }
  }, [data]);

  const filters = useMemo(() => {
    if (data?.site?.search?.searchProducts?.filters?.edges) {
      return data?.site?.search?.searchProducts?.filters?.edges;
    }
  }, [data]);

  const handlePaginateBack = useCallback(() => {
    setPagination(prev => {
      prev.pop();
      return [...prev];
    });

  }, [pagination]);

  const handlePaginateForward = useCallback(() => {
    if (pageInfo?.hasNextPage) {
      setPagination(prev => {
        prev.push(pageInfo?.endCursor);
        return [...prev];
      });
    }
  }, [pagination, pageInfo?.hasNextPage, pageInfo?.endCursor]);
  
  const handleSearchChange = useCallback((event) => {
    // @ts-ignore
    setSearchTerm(event.target.value);
    setPagination([]);
    setCurrentPageCursor('');
  }, [searchTerm]);

  const handleOnQuickView = useCallback((product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  }, [selectedProduct]);

  const handleOnQuickViewClose = useCallback(() => {
    setIsQuickViewOpen(false);
    setSelectedProduct(undefined);
  }, [selectedProduct]);

  const handleSortOrderChange = useCallback((event) => {
    console.log('SORT ORDER CHANGE', event.target.value);
    setSortOrder(event.target.value);
  }, [sortOrder]);

  useEffect(() => {
    setCurrentPageCursor(pagination.length > 0 ? pagination[pagination.length - 1] : '');
  }, [pagination]);

  console.log('DATA', data);

  // first load
  if (!data && fetching) {
    return <Loading />;
  }

  return (
    <Container isLoading={fetching}>
      {error && (
        <Error error={error} />
      )}
      {data && (
        <div>
          {config.enableSearch && (
            <SearchInput
              searchTerm={searchTerm}
              onChange={handleSearchChange}
            />
          )}
          <div>
            {config.enableFilters && (
              <FiltersList filters={filters} />
            )}
            <SortOptions options={sortOptions} selected={sortOrder} onChange={handleSortOrderChange} />
          </div>

          {config.type === LAYOUT_TYPE.Grid && products.length > 0 && (
            <ProductsGrid
              products={products}
              filters={filters}
              columns={config.columns}
              pages={pagination}
              showPreviousPageBtn={pagination.length > 0}
              showNextPageBtn={pageInfo?.hasNextPage}
              onPaginatePrevious={handlePaginateBack}
              onPaginateNext={handlePaginateForward}
              onQuickView={handleOnQuickView}
            />
          )}
          {config.type === LAYOUT_TYPE.Carousel && products.length > 0 && (
            <ProductsCarousel
              products={products}
              slidesToShow={config.columns}
              pages={pagination}
              showPreviousPageBtn={pagination.length > 0}
              showNextPageBtn={pageInfo?.hasNextPage}
              onPaginatePrevious={handlePaginateBack}
              onPaginateNext={handlePaginateForward}
              onQuickView={handleOnQuickView}
            />
          )}
          {products.length === 0 && (
            <NoProductsFound />
          )}
        </div>
      )}
      <Modal
        isOpen={isQuickViewOpen}
        onRequestClose={handleOnQuickViewClose}
        style={modalStyles}
      >
        <QuickView product={selectedProduct} />
      </Modal>
    </Container>
  );
};

export default App;