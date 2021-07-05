import { Product } from './product';

export interface CartItem {
  _id: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
}
