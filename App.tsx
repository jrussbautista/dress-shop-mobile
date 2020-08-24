import { Toast } from '@/components';
import { AppNavigation } from '@/navigation';
import { AuthProvider, CartProvider, ToastProvider } from '@/store';
import React from 'react';

export default function App() {
  return (
    <>
      <ToastProvider>
        <Toast />
        <AuthProvider>
          <CartProvider>
            <AppNavigation />
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}
