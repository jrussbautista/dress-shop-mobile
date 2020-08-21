import React, { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import { SET_CURRENT_USER, SET_AUTH_ERROR, SET_AUTH_LOGOUT } from './constants';
import { AuthService } from '@/services/authService';
import { AsyncStorage } from 'react-native';
import { setAuthHeaderToken, removeAuthHeaderToken } from '@/utils/auth';
import { User } from '@/types';

interface InitialStateType {
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login(user: User, token: string): void;
  logOut(): void;
}

const AuthContext = createContext<InitialStateType>({
  loading: true,
  currentUser: null,
  isAuthenticated: false,
  login: (user: User, token: string) => {},
  logOut: () => {},
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
      removeAuthHeaderToken();
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
