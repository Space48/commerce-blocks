import {ButtonProps} from '@bigcommerce/big-design/dist/components/Button/Button';
import {TablePaginationProps} from '@bigcommerce/big-design';

export interface ContextType {
  appId: string;
  appName: string;
  noticeableProjectId: string;
  noticeableLabelId: string;
  noticeableToken: string;
  supportDocsUrl: string;
  supportDocsFAQUrl: string;
  supportEmail: string;
  appDescription: string;
}

export interface PageHeaderActions extends ButtonProps {
  text: string;
}

export enum LAYOUT_TYPE {
  Grid = 'GRID',
  Carousel = 'CAROUSEL'
}

export interface Location {
  state: {
    referrer?: string;
  }
}

export interface Channel {
  id: number;
  is_listable_from_ui: boolean;
  is_visible: boolean;
  status: string;
  name: string;
  type: string;
  platform: string;
  date_created: string;
  date_modified: string;
  icon_url: string;
}

export interface ProductImage {
  url_thumbnail: string;
}

export interface Product {
  sku: string;
  name: string;
  price: number;
  inventory_level: number;
  custom_url: {
    url: string;
  }
  images: ProductImage[]
}

export interface Errors {
  [key: string]: string;
}

export interface Block {
  id?: string;
  bigcommerce_store_id?: number | null;
  name?: string,
  channel_id?: number | null;
  design_id?: number | null;
  block_type?: string | null;
  valid_domain?: string;
  product_selection_type?: string
  graphql_access_token?: string;
  graphql_access_token_expires_at?: string | null;
  graphql_filters?: [];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProductPagination extends TablePaginationProps {

}

export interface Design {
  id?: number;
  name?: string;
  limit: number | null;
  columns: number | null;
  heading_font_family: string | null;
  heading_font_size: string | null;
  heading_font_weight: string | null;
  heading_colour: string | null;
  text_font_family: string | null;
  text_font_weight: string | null;
  text_font_size: string | null;
  text_colour: string | null;
  price_font_family: string | null;
  price_font_size: string | null;
  price_font_weight: string | null;
  price_colour: string | null;
  sale_price_font_size: string | null;
  sale_price_font_weight: string | null;
  sale_price_colour: string | null;
  link_colour: string | null;
  link_hover_colour: string | null;
  button_font_family: string | null;
  button_font_weight: string | null;
  button_font_size: string | null;
  button_colour: string | null;
  button_hover_colour: string | null;
  button_text_colour: string | null;
  button_hover_text_colour: string | null;
}
