import React, { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from './authReducer';
import { SET_CURRENT_USER, SET_AUTH_ERROR, SET_AUTH_LOGOUT } from './constants';
import { AuthService } from '@/services/authService';
import { AsyncStorage } from 'react-native';
import { setAuthHeaderToken, removeAuthHeaderToken } from '@/utils/auth';
import { User } from '@/types';

const initialState = {
  loading: true,
  currentUser: null,
  isAuthenticated: false,
  login: (user: User, token: string) => {},
  logOut: () => {},
};

const AuthContext = createContext(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setAuthHeaderToken(userToken);
        const { user, token } = await AuthService.getMe();
        dispatch({ type: SET_CURRENT_USER, payload: { user, token } });
        return;
      }
      // throw an error if user token is null
      throw new Error('User token not found');
    } catch (error) {
      removeAuthHeaderToken();
      dispatch({ type: SET_AUTH_ERROR });
    }
  };

  const login = async (user: User, token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setAuthHeaderToken(token);
      dispatch({ type: SET_CURRENT_USER, payload: { user, token } });
    } catch (error) {
      throw new Error(error);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch({ type: SET_AUTH_LOGOUT });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
