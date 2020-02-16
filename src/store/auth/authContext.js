import React, { createContext, useReducer, useMemo, useContext } from 'react';
import reducer from './authReducer';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    loading: true,
    user: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      ...state
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
