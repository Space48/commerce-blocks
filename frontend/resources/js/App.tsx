import { Fragment, h } from 'preact';
import {useCallback, useEffect, useMemo, useState} from 'preact/compat';
import { useQuery } from '@urql/preact';
import { Loading, Error, ProductsCarousel, ProductsGrid, Container } from './components';
import { LAYOUT_TYPE } from './types';
import useConfig from './hooks/useConfig';
import { ProductsQuery, SearchQuery } from './helpers/queries';

/** @jsx h */

const App = () => {
  const [config] = useConfig();
  const [pagination, setPagination] = useState<string[]>([]);
  const [currentPageCursor, setCurrentPageCursor] = useState<string>('');

  const [result] = useQuery({
    query: SearchQuery(config.perPage, currentPageCursor)
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
          {config.type === LAYOUT_TYPE.Grid && (
            <ProductsGrid
              products={products}
              filters={filters}
              columns={config.columns}
              pages={pagination}
              showPreviousPageBtn={pagination.length > 0}
              showNextPageBtn={pageInfo?.hasNextPage}
              onPaginatePrevious={handlePaginateBack}
              onPaginateNext={handlePaginateForward}
            />
          )}
          {config.type === LAYOUT_TYPE.Carousel && (
            <ProductsCarousel
              products={products}
              slidesToShow={config.columns}
              pages={pagination}
              showPreviousPageBtn={pagination.length > 0}
              showNextPageBtn={pageInfo?.hasNextPage}
              onPaginatePrevious={handlePaginateBack}
              onPaginateNext={handlePaginateForward}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default App;