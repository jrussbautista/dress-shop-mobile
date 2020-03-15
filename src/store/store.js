import React from 'react';
import { AuthProvider } from './auth/authContext';
import { CartProvider } from './cart/cartContext';

const ProviderComposer = ({ contexts, children }) => {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),
    children
  );
};

const StoreProvider = ({ children, initialState }) => {
  return (
    <ProviderComposer
      contexts={[<AuthProvider currentUser={initialState} />, <CartProvider />]}
    >
      {children}
    </ProviderComposer>
  );
};

export { StoreProvider };
