import React, { createContext, useReducer, useMemo, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import reducer from './authReducer';
import axios from 'axios';
import apiURL from '../../utils/apiURL';
import { SET_USER, SET_AUTH_ERROR, CLEAR_ERROR } from './authTypes';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    loading: true,
    user: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getLoginUser = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const payload = { headers: { authorization: userToken } };
        const { data } = await axios.get(`${apiURL}/account`, payload);
        dispatch({
          type: SET_USER,
          payload: { user: data, token: userToken }
        });
      } else {
        dispatch({
          type: SET_USER,
          payload: { user: null, token: null }
        });
      }
    } catch (error) {
      dispatch({
        type: SET_AUTH_ERROR,
        payload: error.response.data
      });
    }
  };

  const login = async user => {
    try {
      const { data } = await axios.post(`${apiURL}/login`, user);
      await AsyncStorage.setItem('userToken', data.token);
      dispatch({
        type: SET_USER,
        payload: { user: data.data, token: data.token }
      });
    } catch (error) {
      dispatch({ type: SET_AUTH_ERROR, payload: error.response.data });
      throw error.response.data;
    }
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  const value = useMemo(
    () => ({
      ...state,
      login,
      clearError,
      getLoginUser
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
