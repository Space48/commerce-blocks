import { h } from 'preact';
import { useCallback, useEffect, useMemo, useState, useContext } from 'preact/compat';
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
import Modal from 'react-modal';
import { SortOptions as SortOptionItems, ModalStyles, getQuery, TYPE_SPECIFIC_PRODUCTS, TYPE_CATEGORY, TYPE_SEARCH } from './helpers';
import ConfigContext from './context/ConfigContext';

/** @jsx h */

Modal.setAppElement('body');

const App = () => {
  const config = useContext(ConfigContext);
  const [pagination, setPagination] = useState<string[]>([]);
  const [currentPageCursor, setCurrentPageCursor] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(config?.product_selection_search_term ?? '');
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(config?.product_selection_sort_order ?? 'RELEVANCE');
  const [currentSelectedCategories, setCurrentSelectedCategories] = useState<number[]>([]);
  const [currentSelectedAttributes, setCurrentSelectedAttributes] = useState<SelectedAttributes>({});
  const [filters, setFilters] = useState<FiltersNode[]>([]);

  const getQueryIds = (type) => {
    if (type === TYPE_SPECIFIC_PRODUCTS) {
      return config?.product_selection_product_ids;
    }
    if (type === TYPE_CATEGORY || type === TYPE_SEARCH) {
      return config?.product_selection_category_ids;
    }
    return [];
  };

  const queryType = {
    type: config?.product_selection_type,
    ids: getQueryIds(config?.product_selection_type)
  };

  const query = getQuery(
    queryType,
    config?.design?.limit ?? 12,
    currentPageCursor,
    sortOrder,
    searchTerm,
    currentSelectedCategories,
    currentSelectedAttributes,
    config?.hide_out_of_stock_products ?? false,
  );

  const [result] = useQuery({ query });
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

  const scrollToTop = () => {
    const blockId = config?.block_name;
    if (blockId !== undefined) {
      const element = document.getElementById(blockId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePaginateBack = useCallback(() => {
    setPagination(prev => {
      prev.pop();
      return [...prev];
    });
    scrollToTop();
  }, []);

  const handlePaginateForward = useCallback(() => {
    if (pageInfo?.hasNextPage) {
      setPagination(prev => {
        prev.push(pageInfo?.endCursor);
        return [...prev];
      });
      scrollToTop();
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

  const resetPagination = () => {
    setCurrentPageCursor('');
    setPagination([]);
  };

  const handleFilterButtonClick = useCallback((event) => {
    event.preventDefault();
    resetPagination();
    setIsFilterOpen(prev => !prev);
  }, []);

  const handleCategorySelection = useCallback((entityId: number) => {
    resetPagination();
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
            previousFilter.node.attributes.edges.forEach(prevAttribute => {
              const currentAttr = current?.node?.attributes?.edges?.find((currentAttribute) => prevAttribute.node.value === currentAttribute.node.value);
              prevAttribute.node.enabled = currentAttr !== undefined;
              prevAttribute.node.productCount = currentAttr !== undefined ? currentAttr.node.productCount : 0;
            });
          }
          if (previousFilter.node.categories?.edges) {
            previousFilter.node.categories.edges.forEach(prevCategory => {
              const currentCategory = current?.node?.categories?.edges?.find((currentCat) => prevCategory.node.entityId === currentCat.node.entityId);
              prevCategory.node.enabled = currentCategory !== undefined;
              prevCategory.node.productCount = currentCategory !== undefined ? currentCategory.node.productCount : 0;
            });
          }
        });
        return [...prev];
      }
      // set defaults on the original data
      if (data?.site?.search?.searchProducts?.filters?.edges) {
        // clone the filters, so we don't run into issues when setting product count above
        const newFilters = JSON.parse(JSON.stringify(data?.site?.search?.searchProducts?.filters?.edges));
        newFilters?.forEach(filter => {
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
        return newFilters;
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
    <Container isLoading={fetching} id={config?.block_name ?? ''}>
      {error && (
        <Error error={error} />
      )}
      {data && (
        <div>
          {queryType.type === TYPE_CATEGORY && config?.enable_search && (
            <SearchInput
              searchTerm={searchTerm}
              onChange={handleSearchChange}
            />
          )}
          {queryType.type !== TYPE_SPECIFIC_PRODUCTS && (
            <FiltersContainer>
              {config?.enable_filters && filters.length > 2 && (
                <FilterButton isOpen={isFilterOpen} onClick={handleFilterButtonClick} />
              )}
              <SortOptions options={SortOptionItems} selected={sortOrder} onChange={handleSortOrderChange} />
            </FiltersContainer>
          )}
          {queryType.type !== TYPE_SPECIFIC_PRODUCTS && config?.enable_filters && filters.length > 2 && (
            <FiltersList
              filters={filters}
              isOpen={isFilterOpen}
              onCategoryChange={handleCategorySelection}
              onAttributeChange={handleAttributeSelection}
            />
          )}
          {config?.block_type === LAYOUT_TYPE.Grid && products.length > 0 && (
            <ProductsGrid
              products={products}
              filters={filters}
              columns={config?.design?.columns ?? 3}
              pages={pagination}
              showPreviousPageBtn={pagination.length > 0}
              showNextPageBtn={pageInfo?.hasNextPage}
              onPaginatePrevious={handlePaginateBack}
              onPaginateNext={handlePaginateForward}
              onQuickView={handleOnQuickView}
            />
          )}
          {config?.block_type === LAYOUT_TYPE.Carousel && products.length > 0 && (
            <ProductsCarousel
              products={products}
              slidesToShow={config?.design?.columns ?? 3}
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
