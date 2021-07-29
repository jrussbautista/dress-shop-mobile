import { CartService } from '@/services';
import { CartItem, Product } from '@/types';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
} from 'react';

import { useAuth } from '../auth';
import reducer from './cart-reducer';
import {
  ADD_CART,
  CLEAR_CART,
  REMOVE_CART,
  SET_CART,
  UPDATE_QTY_CART,
  SET_CART_ERROR,
} from './cart-types';

interface InitialStateType {
  cartItems: CartItem[];
  loading: boolean;
  error: null | string;
  addCartItem: (product: Product, quantity: number) => void;
  removeCartItem: (cartItemToRemove: CartItem) => void;
  clearCart: () => void;
  updateCartItemQty: (cartItem: CartItem, newQuantity: number) => void;
}

export const CartContext = createContext<InitialStateType>({
  cartItems: [],
  loading: true,
  error: null,
  addCartItem: () => null,
  removeCartItem: () => null,
  clearCart: () => null,
  updateCartItemQty: () => null,
});

export const CartProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const initialState = {
    cartItems: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCarts = async () => {
    try {
      const results = await CartService.getCart();
      dispatch({ type: SET_CART, payload: results.items });
    } catch (error) {
      dispatch({ type: SET_CART_ERROR, payload: { error: error.message } });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCarts();
    }
  }, [isAuthenticated]);

  const addCartItem = async (product: Product, quantity: number) => {
    const results = await CartService.addCartItem(quantity, product._id);
    const cartItem: CartItem = { _id: results._id, quantity, product };
    dispatch({ type: ADD_CART, payload: cartItem });
  };

  const removeCartItem = async (cartItem: CartItem) => {
    await CartService.removeCartItem(cartItem.product._id);
    dispatch({ type: REMOVE_CART, payload: cartItem });
  };

  const updateCartItemQty = async (cartItem: CartItem, newQuantity: number) => {
    await CartService.updateQuantityCarItem(cartItem.product._id, newQuantity);
    dispatch({ type: UPDATE_QTY_CART, payload: { cartItem, newQuantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const value = useMemo(
    () => ({
      ...state,
      addCartItem,
      removeCartItem,
      clearCart,
      updateCartItemQty,
    }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
