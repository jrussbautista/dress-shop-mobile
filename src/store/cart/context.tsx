import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';
import { useAuth } from '../auth';
import reducer from './reducer';
import {
  ADD_CART,
  CLEAR_CART,
  REMOVE_CART,
  SET_CART,
  UPDATE_QTY_CART,
} from './constants';
import { Cart } from '@/types';
import { CartService } from '@/services';

interface InitialStateType {
  carts: Cart[];
  cartsNum: number;
  addCart: (cart: Cart) => void;
  removeCart: (cartId: string) => void;
  clearCart: () => void;
  updateCartQuantity: (cartId: string, qty: number) => void;
}

export const CartContext = createContext<InitialStateType>({
  carts: [],
  cartsNum: 0,
  addCart: () => null,
  removeCart: () => null,
  clearCart: () => null,
  updateCartQuantity: () => null,
});

export const CartProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const initialState = {
    carts: [],
    cartsNum: 0,
    loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const { carts } = await CartService.fetchCarts();
        dispatch({ type: SET_CART, payload: carts });
      } catch (error) {
        console.log(error.message);
      }
    };

    if (isAuthenticated) {
      fetchCarts();
    }
  }, [isAuthenticated]);

  const addCart = async (cart: Cart) => {
    dispatch({ type: ADD_CART, payload: cart });
  };

  const removeCart = async (cartId: string) => {
    dispatch({ type: REMOVE_CART, payload: { id: cartId } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    dispatch({ type: UPDATE_QTY_CART, payload: { id: cartId, quantity } });
  };

  const value = useMemo(
    () => ({
      ...state,
      addCart,
      removeCart,
      clearCart,
      updateCartQuantity,
    }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
