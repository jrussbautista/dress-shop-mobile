import { Toast } from '@/components/ui';
import React, { createContext, useContext, useState } from 'react';
import { Animated } from 'react-native';

interface Toast {
  active: boolean;
  type: string;
  message: string;
  animatedValue: any;
  showToast(type: string, message: string): void;
}

const DURATION = 400;

const ToastContext = createContext<Toast>({
  active: false,
  type: '',
  message: '',
  showToast: () => {},
  animatedValue: new Animated.Value(0),
});

export const ToastProvider: React.FC = ({ children }) => {
  const initialState = {
    active: false,
    type: '',
    message: '',
    animatedValue: new Animated.Value(0),
  };

  const [toast, setToast] = useState(initialState);

  const showToast = (type: string, message: string) => {
    setToast({ ...toast, message, type, active: true });

    Animated.timing(toast.animatedValue, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      closeToast();
    }, 3000);
  };

  const closeToast = () => {
    Animated.timing(toast.animatedValue, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    }).start(() => setToast(initialState));
  };

  return (
    <ToastContext.Provider
      value={{
        active: toast.active,
        type: toast.type,
        message: toast.message,
        animatedValue: toast.animatedValue,
        showToast,
      }}
    >
      <Toast
        type={toast.type}
        active={toast.active}
        animatedValue={toast.animatedValue}
        message={toast.message}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
