import React from 'react';
import { AuthProvider } from './auth/authContext';
import { CartProvider } from './cart/cartContext';
import { ToastProvider } from './toast/toastContext';

const ProviderComposer = ({ contexts, children }) => {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
};

const StoreProvider = ({ children, initialState }) => {
  return (
    <ProviderComposer
      contexts={[
        <AuthProvider currentUser={initialState} />,
        <CartProvider />,
        <ToastProvider />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};

export { StoreProvider };
