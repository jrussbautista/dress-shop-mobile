import React from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import { AuthProvider } from './src/store';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
