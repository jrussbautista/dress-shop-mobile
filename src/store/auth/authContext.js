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

  const login = async user => {
    try {
      const { data } = await axios.post(`${apiURL}/login`, user);
      await AsyncStorage.setItem('userToken', data.token);
      dispatch({
        type: SET_USER,
        payload: { user: data.data, token: data.token }
      });
    } catch (error) {
      console.log(error);
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
      clearError
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
