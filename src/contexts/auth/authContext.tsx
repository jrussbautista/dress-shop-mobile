import { AuthService } from '@/services/AuthService';
import { User } from '@/types';
import { setAuthHeaderToken, removeAuthHeaderToken } from '@/utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

import reducer from './auth-reducer';
import {
  SET_CURRENT_USER,
  SET_AUTH_ERROR,
  SET_AUTH_LOGOUT,
  UPDATE_CURRENT_USER,
} from './auth-types';

interface InitialStateType {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): void;
  signUp(email: string, password: string, name: string): void;
  logOut(): void;
  updateCurrentUser(user: User): void;
  setCurrentUser(user: User, token: string): void;
}

const AuthContext = createContext<InitialStateType>({
  loading: true,
  currentUser: null,
  isAuthenticated: false,
  login: (user: string, password: string) => {},
  signUp: (email: string, password: string, name: string) => {},
  logOut: () => {},
  updateCurrentUser: (user: User) => {},
  setCurrentUser: (user: User, token: string) => {},
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
      const userDetails = await AsyncStorage.getItem('user');

      console.log(userDetails);

      if (userToken && userDetails) {
        setAuthHeaderToken(userToken);
        dispatch({
          type: SET_CURRENT_USER,
          payload: { user: JSON.parse(userDetails), token: userToken },
        });
        return;
      } else {
        logOut();
      }
    } catch (error) {
      removeAuthHeaderToken();
      dispatch({ type: SET_AUTH_ERROR });
    }
  };

  const setCurrentUser = async (user: User, token: string) => {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setAuthHeaderToken(token);
    dispatch({ type: SET_CURRENT_USER, payload: { user, token } });
  };

  const login = async (email: string, password: string) => {
    const { user, token } = await AuthService.login(
      email.toLowerCase(),
      password
    );
    setCurrentUser(user, token);
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { user, token } = await AuthService.signUp({
      email,
      password,
      name,
    });
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setAuthHeaderToken(token);
    dispatch({ type: SET_CURRENT_USER, payload: { user, token } });
  };

  const logOut = async () => {
    try {
      removeAuthHeaderToken();
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
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
      value={{
        ...state,
        login,
        signUp,
        logOut,
        updateCurrentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
