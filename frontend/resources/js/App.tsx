import { h } from 'preact';
import { useQuery } from '@urql/preact';
import Loading from './components/Loading';
import Error from './components/Error';
import ProductsGrid from './components/ProductsGrid';

/** @jsx h */

const App = () => {

  const ProductsQuery = `
  query paginateProducts(
   $pageSize: Int = 12
   $cursor: String
 ) {
   site {
     products (first: $pageSize, after:$cursor) {
       pageInfo {
         startCursor
         endCursor
       }
       edges {
         cursor
         node {
           entityId
           name,
           sku,
           path,
           images {
            edges {
              node {
                url(width: 400, height: 400)
                altText,
                isDefault
              }
            }
           }
           prices(includeTax: true, currencyCode: USD) {
             salePrice {
              value
            }
            basePrice {
              value
            }
           }
           addToCartUrl
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

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <ProductsGrid products={data?.site?.products?.edges} />
  );
};

export default App;