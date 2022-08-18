import {Fragment, h} from 'preact';
import { useCallback, useEffect, useState } from 'preact/compat';
import { useQuery } from '@urql/preact';
import { Loading, Error, ProductsCarousel, ProductsGrid, Container } from './components';
import { LAYOUT_TYPE } from './types';
import useConfig from './hooks/useConfig';

/** @jsx h */

const App = () => {
  const [config] = useConfig();
  const [pagination, setPagination] = useState<string[]>([]);
  const [currentPageCursor, setCurrentPageCursor] = useState<string>('');

  const ProductsQuery = `
  query paginateProducts(
   $pageSize: Int = ${config.perPage}
   $cursor: String = "${currentPageCursor}"
 ) {
   site {
     products (first: $pageSize, after:$cursor) {
       pageInfo {
         hasNextPage
         hasPreviousPage
         startCursor
         endCursor
       }
       edges {
         cursor
         node {
           entityId
           name
           sku
           path
           addToCartUrl
           images {
            edges {
              node {
                url(width: 400, height: 400)
                altText,
                isDefault
              }
            }
           }
           prices(includeTax: true, currencyCode: GBP) {
            price {
              value
            }
            salePrice {
              value
            }
            basePrice {
              value
            }
            basePrice {
              value
            }
           }
         }
       }
     }
   }
 }
`;

  const [result, reexecuteQuery] = useQuery({
    query: ProductsQuery
  });
  const { data, fetching, error } = result;

  const handlePaginateBack = useCallback(() => {
    setPagination(prev => {
      prev.pop();
      return [...prev];
    });

  }, [pagination]);

  const handlePaginateForward = useCallback(() => {
    if (data?.site?.products?.pageInfo?.hasNextPage) {
      setPagination(prev => {
        prev.push(data?.site?.products?.pageInfo?.endCursor);
        return [...prev];
      });
    }
  }, [pagination, data?.site?.products?.pageInfo?.hasNextPage, data?.site?.products?.pageInfo?.endCursor]);

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
          {config.type === LAYOUT_TYPE.Grid && (
            <ProductsGrid
              products={data?.site?.products?.edges}
              columns={config.columns}
              pages={pagination}
              showPreviousPageBtn={pagination.length > 0}
              showNextPageBtn={data?.site?.products?.pageInfo?.hasNextPage}
              onPaginatePrevious={handlePaginateBack}
              onPaginateNext={handlePaginateForward}
            />
          )}
          {config.type === LAYOUT_TYPE.Carousel && (
            <ProductsCarousel
              products={data?.site?.products?.edges}
              slidesToShow={config.columns}
              pages={pagination}
              showPreviousPageBtn={pagination.length > 0}
              showNextPageBtn={data?.site?.products?.pageInfo?.hasNextPage}
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