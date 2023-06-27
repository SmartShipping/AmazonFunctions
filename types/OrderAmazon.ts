export interface SellerSelectionCriteria {
  prime: boolean;
  handling_days_max: number;
  condition_in: string[];
}

export interface ProductBlockChain {
  product_id: string;
  quantity: number;
  seller_selection_criteria?: SellerSelectionCriteria;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
  phone_number: string;
}

export interface PaymentMethod {
  name_on_card: string;
  number: string;
  security_code: string;
  expiration_month: number;
  expiration_year: number;
  use_gift: boolean;
}

export interface RetailerCredentials {
  email: string;
  password: string;
  totp_2fa_key: string;
}

export interface Webhooks {
  request_succeeded: string;
  request_failed: string;
  tracking_obtained: string;
}

export interface ClientNotes {
  our_internal_order_id: string;
  any_other_field: string[];
}

export interface ShippingCriteria {
  order_by: string;
  max_days: number;
  max_price: number;
}

export interface OrderAmazon {
  idempotency_key: string;
  addax: boolean;
  retailer: string;
  products: ProductBlockChain[];
  max_price: number;
  shipping_address: ShippingAddress;
  is_gift: boolean;
  gift_message?: string;
  shipping: ShippingCriteria;
  shipping_method?: string;
  payment_method?: PaymentMethod;
  retailer_credentials?: RetailerCredentials;
  webhooks?: Webhooks;
  client_notes?: ClientNotes;
}

export interface OrderReturnAmzon {
  products: ProductBlockChain[];
  reason_code: OrderReturnReasonAmazon;
  method_code: OrderReturnMethodAmazon;
  explanation: string;
  requestId?: string;
}

export enum OrderReturnReasonAmazon {
  PURCHASED_BY_MISTAKE = "Purchased by mistake.",
  BEST_PRICE_AVAILABLE = "Best price available.",
  PERFORMANCE_OR_QUALITY_NOT_ADEQUATE = "Performance or quality not adequate.",
  INCOMPATIBLE_OR_INADEQUATE = "Incompatible or inadequate.",
  ITEM_DAMAGED_EXTERNAL_PACKAGING_INTACT = "Item damaged, external packaging intact.",
  ITEM_ARRIVED_LATE = "Item arrived late.",
  MISSING_COMPONENTS_OR_ACCESSORIES = "Missing components or accessories.",
  ITEM_AND_EXTERNAL_PACKAGING_DAMAGED = "Item and external packaging damaged.",
  RECEIVED_WRONG_ITEM = "Received wrong item.",
  DEFECTIVE_OR_NON_FUNCTIONING_ITEM = "Defective or non-functioning item.",
  RECEIVED_UNORDERED_ITEM_NO_REFUND_NECESSARY = "Received unordered item (no refund necessary).",
}

export enum OrderReturnMethodAmazon {
  UPS_DROPOFF = "UPS Dropoff",
}

export interface Product {
  price: number;
  seller_id: string;
  product_id: string;
  quantity: number;
}

export interface PriceComponents {
  converted_payment_total: number;
  tax: number;
  product_subtotals: any;
  payment_currency: string;
  currency: string;
  products: Product[];
  shipping: number;
  total: number;
  subtotal: number;
}

export interface TaxInfoAmzon {
  order_response?: any;
  price_components: PriceComponents;
  current_url?: any;
  max_price: number;
}
