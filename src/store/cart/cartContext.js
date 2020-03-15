import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo
} from 'react';
import apiURL from '../../utils/apiURL';
import { useAuth } from '../auth/authContext';
import reducer from './cartReducer';
import { ADD_CART, CLEAR_CART, REMOVE_CART, SET_CART } from './cartTypes';
import { AsyncStorage } from 'react-native';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    carts: [],
    loading: true
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const payload = { headers: { Authorization: token } };
        const { data } = await axios.get(`${apiURL}/cart`, payload);
        if (data.carts) {
          dispatch({ type: SET_CART, payload: data.carts });
        } else {
          dispatch({ type: SET_CART, payload: [] });
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    if (user) getUserCart();
  }, [user]);

  const addCart = async cart => {
    dispatch({ type: ADD_CART, payload: cart });
    try {
      const token = await AsyncStorage.getItem('userToken');
      const headers = { headers: { Authorization: token } };
      const data = { quantity: cart.quantity, productId: cart.product._id };
      const res = await axios.post(`${apiURL}/cart`, data, headers);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCart = async cartId => {
    dispatch({ type: REMOVE_CART, payload: cartId });
    try {
      const token = await AsyncStorage.getItem('userToken');
      const payload = { params: { cartId }, headers: { Authorization: token } };
      const res = await axios.delete(`${apiURL}/cart`, payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const value = useMemo(
    () => ({
      ...state,
      addCart,
      removeCart,
      clearCart
    }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
