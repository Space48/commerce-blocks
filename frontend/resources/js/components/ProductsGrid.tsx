import { Fragment, h } from 'preact';
import { FiltersNode, ProductNode } from '../types';
import ProductCard from './ProductCard';
import styled from 'styled-components';
import Pagination from './Pagination';
import FiltersList from './FiltersList';

/** @jsx h */

interface Props {
  products: ProductNode[];
  filters: FiltersNode[];
  pages: string[];
  columns: number;
  showPreviousPageBtn: boolean;
  showNextPageBtn: boolean;
  onPaginatePrevious: () => void;
  onPaginateNext: () => void;
}

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`;

const ProductsGrid = ({
  products,
  filters,
  columns,
  pages,
  showPreviousPageBtn,
  showNextPageBtn,
  onPaginatePrevious,
  onPaginateNext
}: Props) => (
  <Fragment>
    <FiltersList filters={filters} />
    <StyledProductsGrid columns={columns}>
      {products.map(product => (
        <ProductCard key={product.node.name} product={product.node} />
      ))}
    </StyledProductsGrid>
    {(showPreviousPageBtn || showNextPageBtn) && (
      <Pagination
        pages={pages}
        showPreviousPageBtn={showPreviousPageBtn}
        showNextPageBtn={showNextPageBtn}
        onPaginatePrevious={onPaginatePrevious}
        onPaginateNext={onPaginateNext}
      />
    )}
  </Fragment>
);

export default ProductsGrid;