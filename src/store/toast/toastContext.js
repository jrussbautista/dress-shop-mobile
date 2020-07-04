import React, { useState, useContext, createContext } from 'react';
import { Toast } from '../../components/Shared';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const initialState = {
    active: false,
    type: null,
    message: null,
  };

  const [toast, setToast] = useState(initialState);

  const showToast = (type, message) => {
    setToast({ ...toast, type, message, active: true });
    setTimeout(() => {
      closeToast();
    }, 3000);
  };

  const closeToast = () => {
    setToast(initialState);
  };

  return (
    <ToastContext.Provider value={{ ...toast, showToast }}>
      <Toast active={toast.active} message={toast.message} type={toast.type} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
