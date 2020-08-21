import { AppNavigation } from '@/navigation';
import { AuthProvider, CartProvider } from '@/store';
import React from 'react';
export default function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AppNavigation />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
