import React from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import { StoreProvider } from './src/store';

export default function App() {
  return (
    <StoreProvider>
      <AppNavigation />
    </StoreProvider>
  );
}
