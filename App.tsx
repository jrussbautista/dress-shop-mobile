import { AuthProvider, CartProvider, ToastProvider } from '@/contexts';
import { AppNavigation } from '@/navigation';
import React from 'react';

export default function App() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <AppNavigation />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}
