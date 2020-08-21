import { Product } from './product';

export type AddCart = {
  quantity: number;
  product: Product;
};

export type Cart = {
  _id: string;
  quantity: number;
  product: Product;
};
