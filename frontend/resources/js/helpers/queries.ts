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

export const SearchQuery = (perPage, cursor, searchTerm) => `
  query paginateProducts(
   $pageSize: Int = ${perPage}
   $cursor: String = "${cursor}"
 ) {
   site {
     search {
      searchProducts(filters: {
        searchTerm: "${searchTerm}"
        hideOutOfStock: false
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