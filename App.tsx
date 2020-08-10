import { AppNavigation } from '@/navigation';
import { AuthProvider } from '@/store';
import React from 'react';

export default function App() {
  return (
    <>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </>
  );
}
