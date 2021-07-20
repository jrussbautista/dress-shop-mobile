import {
  AuthProvider,
  CartProvider,
  ToastProvider,
  WishlistProvider,
} from '@/contexts';
import { AppNavigation } from '@/navigation';
import React from 'react';

export default function App() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AppNavigation />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}
