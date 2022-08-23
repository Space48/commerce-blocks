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
  SortOptions,
  FilterButton,
  FiltersContainer
} from './components';
import { FiltersNode, LAYOUT_TYPE, Product, SelectedAttributes } from './types';
import useConfig from './hooks/useConfig';
import Modal from 'react-modal';
import { SortOptions as SortOptionItems, ModalStyles, searchQuery } from './helpers';

/** @jsx h */

Modal.setAppElement('body');

const App = () => {
  const [config] = useConfig();
  const [pagination, setPagination] = useState<string[]>([]);
  const [currentPageCursor, setCurrentPageCursor] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('RELEVANCE');
  const [currentSelectedCategories, setCurrentSelectedCategories] = useState<number[]>([]);
  const [currentSelectedAttributes, setCurrentSelectedAttributes] = useState<SelectedAttributes>({});
  const [filters, setFilters] = useState<FiltersNode[]>([]);

  const [result] = useQuery({
    query: searchQuery(
      config.perPage,
      currentPageCursor,
      sortOrder,
      searchTerm,
      currentSelectedCategories,
      currentSelectedAttributes
    )
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

  const handlePaginateBack = useCallback(() => {
    setPagination(prev => {
      prev.pop();
      return [...prev];
    });

  }, []);

  const handlePaginateForward = useCallback(() => {
    if (pageInfo?.hasNextPage) {
      setPagination(prev => {
        prev.push(pageInfo?.endCursor);
        return [...prev];
      });
    }
  }, [pageInfo?.hasNextPage, pageInfo?.endCursor]);
  
  const handleSearchChange = useCallback((event) => {
    // @ts-ignore
    setSearchTerm(event.target.value);
    setPagination([]);
    setCurrentPageCursor('');
  }, []);

  const handleOnQuickView = useCallback((product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  }, []);

  const handleOnQuickViewClose = useCallback((event) => {
    event.preventDefault();
    setIsQuickViewOpen(false);
    setSelectedProduct(undefined);
  }, []);

  const handleSortOrderChange = useCallback((event) => {
    setSortOrder(event.target.value);
  }, []);

  const handleFilterButtonClick = useCallback((event) => {
    event.preventDefault();
    setIsFilterOpen(prev => !prev);
  }, []);
  
  const handleCategorySelection = useCallback((entityId: number) => {
    setCurrentSelectedCategories(prev => {
      if (prev.includes(entityId)) {
        const index = prev.indexOf(entityId);
        if (index !== -1) {
          prev.splice(index, 1);
        }
        return [...prev];
      }
      prev.push(entityId);
      return [...prev];
    });
  }, []);

  const handleAttributeSelection = useCallback((attribute: string, value: string) => {
    setCurrentSelectedAttributes(prev => {
      if (prev[attribute] !== undefined) {
        // remove an existing value and attribute
        if (prev[attribute].length > 0 &&
          prev[attribute].find(attributeValue => attributeValue === value)) {
          const index = prev[attribute].indexOf(value);
          if (index !== -1) {
            prev[attribute].splice(index, 1);
          }
          if (prev[attribute].length === 0) {
            delete prev[attribute];
          }
          return { ...prev };
        }
        // append value to existing attribute
        prev[attribute] = [...prev[attribute], value];
        return { ...prev };
      }
      // create a new attribute + value
      const newAttributes = {
        [attribute]: [value]
      };
      return { ...prev, ...newAttributes };
    });
  }, []);

  useEffect(() => {
    setFilters(prev => {
      // update the existing
      if (prev && prev.length > 0 && data?.site?.search?.searchProducts?.filters?.edges) {
        // merge the previous
        prev.forEach(previousFilter => {
          const current = data?.site?.search?.searchProducts?.filters?.edges.find(filter => filter.node.name === previousFilter.node.name);
          previousFilter.node.enabled = current === undefined;
          if (previousFilter.node.attributes?.edges) {
            previousFilter.node.attributes.edges.forEach(attribute => {
              const existingAttr = current?.node?.attributes?.edges?.find((currentAttribute) => attribute.node.value === currentAttribute.node.value);
              attribute.node.enabled = existingAttr !== undefined;
            });
          }
          if (previousFilter.node.categories?.edges) {
            previousFilter.node.categories.edges.forEach(attribute => {
              const existingCategory = current?.node?.categories?.edges?.find((currentAttribute) => attribute.node.entityId === currentAttribute.node.entityId);
              attribute.node.enabled = existingCategory !== undefined;
            });
          }
        });
        return [...prev];
      }
      // set defaults on the original data
      if (data?.site?.search?.searchProducts?.filters?.edges) {
        data?.site?.search?.searchProducts?.filters?.edges.forEach(filter => {
          filter.node.enabled = true;
          if (filter?.node?.attributes?.edges) {
            filter.node.attributes.edges.forEach(attribute => {
              attribute.node.enabled = true;
            });
          }
          if (filter?.node?.categories?.edges) {
            filter.node.categories.edges.forEach(category => {
              category.node.enabled = true;
            });
          }
        });
        return data?.site?.search?.searchProducts?.filters?.edges;
      }
      return [];
    });
  }, [data?.site?.search?.searchProducts?.filters?.edges]);

  useEffect(() => {
    setCurrentPageCursor(pagination.length > 0 ? pagination[pagination.length - 1] : '');
  }, [pagination]);

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
          <FiltersContainer>
            {config.enableFilters && filters.length > 0 && (
              <FilterButton isOpen={isFilterOpen} onClick={handleFilterButtonClick} />
            )}
            <SortOptions options={SortOptionItems} selected={sortOrder} onChange={handleSortOrderChange} />
          </FiltersContainer>
          {filters.length > 0 && (
            <FiltersList
              filters={filters}
              isOpen={isFilterOpen}
              onCategoryChange={handleCategorySelection}
              onAttributeChange={handleAttributeSelection}
            />
          )}
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
        style={ModalStyles}
      >
        <QuickView
          product={selectedProduct}
          onClose={handleOnQuickViewClose}
        />
      </Modal>
    </Container>
  );
};

export default App;