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

export const SearchQuery = (perPage, cursor, sortOrder, searchTerm) => `
  query paginateProducts(
   $pageSize: Int = ${perPage}
   $cursor: String = "${cursor}"
 ) {
   site {
     search {
      searchProducts(sort: ${sortOrder}, filters: {
        searchTerm: "${searchTerm}"
        hideOutOfStock: false
      }) {
       
        filters(first: $pageSize, after: $cursor) {
          edges {
            node {
              __typename
              name
              isCollapsedByDefault
              ... on ProductAttributeSearchFilter {
                attributes {
                  edges {
                    node {
                      value
                      isSelected
                      productCount
                    }
                  }
                }
              }
              ... on CategorySearchFilter {
                name
                displayProductCount
                isCollapsedByDefault
                categories {
                  edges {
                    node {
                      name
                      entityId
                      isSelected
                      productCount
                      subCategories {
                        edges {
                          node {
                            entityId
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on OtherSearchFilter {
                name
                displayProductCount
                isCollapsedByDefault
                freeShipping {
                  isSelected
                  productCount
                }
                isInStock {
                  isSelected
                  productCount
                }
                isFeatured {
                  isSelected
                  productCount
                }
              }
            }
          }
        }
        ${Product}
      }
     }
   }
 }
`;