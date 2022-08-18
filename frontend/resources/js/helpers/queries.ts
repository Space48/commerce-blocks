const Product = `
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
`;

export const ProductsQuery = (perPage, cursor) => `
  query paginateProducts(
   $pageSize: Int = ${perPage}
   $cursor: String = "${cursor}"
 ) {
   site {
     ${Product}
   }
 }
`;

export const SearchQuery = (perPage, cursor) => `
  query paginateProducts(
   $pageSize: Int = ${perPage}
   $cursor: String = "${cursor}"
 ) {
   site {
     search {
      searchProducts(filters: {
        price: {
          minPrice: 0.00
        }
      }) {
        filters(first: $pageSize, after: $cursor) {
          edges {
            node {
              name
            }
          }
        }
        ${Product}
      }
     }
   }
 }
`;