import { Fragment, h } from 'preact';
import { CurrencyInfo, FiltersNode, Product, ProductNode } from '../types';
import ProductCard from './ProductCard';
import styled from 'styled-components';
import Pagination from './Pagination';
import { Devices, getClassName } from '../helpers';

/** @jsx h */

interface Props {
  siteUrl: string | null;
  products: ProductNode[];
  filters: FiltersNode[];
  pages: string[];
  columns: number;
  showPreviousPageBtn: boolean;
  showNextPageBtn: boolean;
  onPaginatePrevious: () => void;
  onPaginateNext: () => void;
  onQuickView: (product: Product) => void;
  currencyInfo: CurrencyInfo
}

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;

  @media ${Devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${Devices.desktop} {
    grid-template-columns: repeat(${props => props.columns}, 1fr);
  }
`;

const ProductsGrid = ({
  siteUrl,
  products,
  filters,
  columns,
  pages,
  showPreviousPageBtn,
  showNextPageBtn,
  onPaginatePrevious,
  onPaginateNext,
  onQuickView,
  currencyInfo
}: Props) => (
  <Fragment>
    <StyledProductsGrid columns={columns} className={getClassName('products__grid')}>
      {products.map(product => (
        <ProductCard key={product.node.name} product={product.node} onQuickView={onQuickView} siteUrl={siteUrl} currencyInfo={currencyInfo} />
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
