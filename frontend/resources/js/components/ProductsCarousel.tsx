import { Fragment, h } from 'preact';
import styled from 'styled-components';
import Slider from 'react-slick';
import {CurrencyInfo, Product, ProductNode} from '../types';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slick-reset.scss';
import './slick-custom.scss';
import { useRef } from 'preact/compat';
import { Sizes } from '../helpers';

/** @jsx h */

interface Props {
  siteUrl: string | null;
  products: ProductNode[];
  pages: string[];
  showPreviousPageBtn: boolean;
  showNextPageBtn: boolean;
  onPaginatePrevious: () => void;
  onPaginateNext: () => void;
  slidesToShow: number;
  onQuickView: (product: Product) => void;
  currencyInfo: CurrencyInfo;
}

const SlideCard = styled.div`
  padding: 20px;
`;

const StyledSlider = styled(Slider)`
  margin-bottom: 40px;
`;

const ProductsCarousel = ({
  siteUrl,
  products,
  pages,
  showPreviousPageBtn,
  showNextPageBtn,
  onPaginatePrevious,
  onPaginateNext,
  slidesToShow,
  onQuickView,
  currencyInfo
}: Props) => {
  const sliderRef = useRef(null);
  const settings = {
    ref: sliderRef,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: slidesToShow,
    responsive: [
      {
        breakpoint: Sizes.tablet,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: Sizes.desktop,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <Fragment>
      <StyledSlider {...settings}>
        {products.map(product => (
          <SlideCard key={product.node.name}>
            <ProductCard product={product.node} onQuickView={onQuickView} siteUrl={siteUrl} currencyInfo={currencyInfo} />
          </SlideCard>
        ))}
      </StyledSlider>
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
};

export default ProductsCarousel;
