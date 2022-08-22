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

const getCategoryFilter = (categoryFilters) => categoryFilters.length > 0
  ? `categoryEntityIds: [${categoryFilters.join(',')}]` : '';

const getAttributeFilter = (attributes) => {
  if (Object.keys(attributes).length === 0) {
    return '';
  }
  const filterItems: string[] = [];
  Object.keys(attributes).map(key => {
    filterItems.push(`{
      attribute: "${key}"
      values: ["${attributes[key].join('","')}"] 
    }`);
  });
  return `productAttributes: [${filterItems.join(',')}]`;
};

export const SearchQuery = (perPage, cursor, sortOrder, searchTerm, categoryFilters, attributeFilters) => `
  query paginateProducts(
   $pageSize: Int = ${perPage}
   $cursor: String = "${cursor}"
 ) {
   site {
     search {
      searchProducts(sort: ${sortOrder}, filters: {
        searchTerm: "${searchTerm}"
        ${getCategoryFilter(categoryFilters)}
        ${getAttributeFilter(attributeFilters)}
        hideOutOfStock: false
        searchSubCategories: true
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