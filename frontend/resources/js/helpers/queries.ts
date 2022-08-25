export const TYPE_SPECIFIC_PRODUCTS = 'specific_products';
export const TYPE_SEARCH = 'search';
export const TYPE_CATEGORY = 'category';

const getCategoriesFilter = (categoryFilters) => categoryFilters && categoryFilters.length > 0
  ? `categoryEntityIds: [${categoryFilters.join(',')}]` : '';

const getCategoryFilter = (categoryFilter) => categoryFilter && categoryFilter.length > 0
  ? `categoryEntityId: ${categoryFilter[0]}` : '';

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

const getProductQuery = (isProductOnlyQuery = false, ids = []) => {
  const params: string[] = [
    'first: $pageSize',
    'after: $cursor'
  ];
  if (isProductOnlyQuery) {
    params.push('hideOutOfStock: $hideOfOutOfStock');
  }
  if (ids && ids.length > 0) {
    params.push(`entityIds: [${ids.join(',')}]`);
  }
  return `
  products (${params.join(', ')}) {
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
};

export const productsQuery = (ids, perPage, cursor, hideOutOfStockProducts) => `
  query paginateProducts(
   $pageSize: Int = ${perPage}
   $cursor: String = "${cursor}"
   $hideOfOutOfStock: Boolean = ${hideOutOfStockProducts}
 ) {
   site {
     ${getProductQuery(true, ids)}
   }
 }
`;

export const searchQuery = (categoryIds, perPage, cursor, sortOrder, searchTerm, categoryFilters, attributeFilters, hideOutOfStockProducts) => `
  query paginateProducts(
   $pageSize: Int = ${perPage}
   $cursor: String = "${cursor}"
   $hideOfOutOfStock: Boolean = ${hideOutOfStockProducts}
 ) {
   site {
     search {
      searchProducts(sort: ${sortOrder}, filters: {
        searchTerm: "${searchTerm}"
        ${getCategoryFilter(categoryIds)} 
        ${getCategoriesFilter(categoryFilters)}
        ${getAttributeFilter(attributeFilters)}
        hideOutOfStock: $hideOfOutOfStock
        searchSubCategories: true
      }) {
        filters(first: $pageSize, after: $cursor) {
          edges {
            node {
              __typename
              name
              isCollapsedByDefault
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
        ${getProductQuery(false)}
      }
     }
   }
 }
`;

export const getQuery = (queryType, perPage, cursor, sortOrder, searchTerm, categoryFilters, attributeFilters, hideOutOfStockProducts) => {
  if (queryType.type === TYPE_SPECIFIC_PRODUCTS) {
    return productsQuery(queryType.ids, perPage, cursor, hideOutOfStockProducts);
  }
  return searchQuery(queryType.ids, perPage, cursor, sortOrder, searchTerm, categoryFilters, attributeFilters, hideOutOfStockProducts);
};