import { AuthService } from '@/services/authService';
import { User } from '@/types';
import { setAuthHeaderToken, removeAuthHeaderToken } from '@/utils/auth';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import {
  SET_CURRENT_USER,
  SET_AUTH_ERROR,
  SET_AUTH_LOGOUT,
  UPDATE_CURRENT_USER,
} from './authConstants';
import reducer from './authReducer';

interface InitialStateType {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): void;
  signUp(email: string, password: string, name: string): void;
  logOut(): void;
  updateCurrentUser(user: User): void;
}

const AuthContext = createContext<InitialStateType>({
  loading: true,
  currentUser: null,
  isAuthenticated: false,
  login: (user: string, password: string) => {},
  signUp: (email: string, password: string, name: string) => {},
  logOut: () => {},
  updateCurrentUser: (user: User) => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const initialState = {
    loading: true,
    currentUser: null,
    isAuthenticated: false,
  };

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
      } else {
        logOut();
      }
    } catch (error) {
      removeAuthHeaderToken();
      dispatch({ type: SET_AUTH_ERROR });
    }
  };

  const login = async (email: string, password: string) => {
    const { user, token } = await AuthService.login(
      email.toLowerCase(),
      password
    );
    await AsyncStorage.setItem('userToken', token);
    setAuthHeaderToken(token);
    dispatch({ type: SET_CURRENT_USER, payload: { user, token } });
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { user, token } = await AuthService.signUp({
      email,
      password,
      name,
    });
    await AsyncStorage.setItem('userToken', token);
    setAuthHeaderToken(token);
    dispatch({ type: SET_CURRENT_USER, payload: { user, token } });
  };

  const logOut = async () => {
    try {
      removeAuthHeaderToken();
      await AsyncStorage.removeItem('userToken');
      dispatch({ type: SET_AUTH_LOGOUT });
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateCurrentUser = (user: User) => {
    dispatch({ type: UPDATE_CURRENT_USER, payload: { user } });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, signUp, logOut, updateCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
