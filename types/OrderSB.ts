import { OrderStatus } from "./Order";

export interface OrderSB {
  order_id?: string;
  created_at?: string;
  wallet_address?: string;
  country?: string;
  status?: OrderStatus;
  shipping_info?: ShippingInfoSB;
  products?: ProductSB[];
  request_id?: string;
  payment_tx?: string;
  unlock_tx?: string;
  return_tx?: string;
  creation_tx?: string;
  tax_request_id?: string;
  tax_amount?: number;
  subtotal_amount?: number;
  total_amount?: number;
  amount_paid?: number;
  previous_status?: string[];
  shipping_amount?: number;
}

export interface ShippingInfoSB {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  zip_code: string;
  city: string;
  state: string;
  phone_number: string;
  email: string;
}

export interface ProductSB {
  asin: string;
  image: string;
  price: number;
  symbol: string;
  title: string;
  url: string;
  quantity: number;
}
