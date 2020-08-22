import {
  ADD_CART,
  REMOVE_CART,
  SET_CART,
  CLEAR_CART,
  UPDATE_QTY_CART,
} from './constants';
import { Cart } from '@/types';

type State = {
  carts: Cart[];
  cartsNum: number;
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: State, action: Action): State => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, carts: [], cartsNum: 0 };
    case SET_CART:
      return {
        ...state,
        carts: action.payload,
        cartsNum: action.payload.length,
      };
    case ADD_CART: {
      // check if new added cart is exist on cart
      const isCartExist = state.carts.some(
        (cart) => cart.product._id === action.payload.product._id
      );

      if (isCartExist) {
        return state;
      } else {
        return {
          ...state,
          carts: [...state.carts, action.payload],
          cartsNum: state.cartsNum + 1,
        };
      }
    }
    case REMOVE_CART: {
      const filteredCarts = state.carts.filter(
        (cart) => cart._id !== action.payload.id
      );
      return { ...state, carts: filteredCarts, cartsNum: state.cartsNum - 1 };
    }

    case UPDATE_QTY_CART: {
      const updatedCarts = state.carts.map((cart) =>
        cart._id === action.payload.id
          ? { ...cart, quantity: action.payload.quantity }
          : cart
      );

      return { ...state, carts: updatedCarts };
    }
    default:
      return state;
  }
};
