import { h } from 'preact';
import { useQuery } from '@urql/preact';
import Loading from './components/Loading';
import Error from './components/Error';
import ProductsGrid from './components/ProductsGrid';
import Container from './components/Container';

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

  if (fetching) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Container>
      <ProductsGrid products={data?.site?.products?.edges} />
    </Container>
  );
};

export default App;