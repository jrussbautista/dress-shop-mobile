import React from 'react';
import { ScrollView } from 'react-native';
import HomeProducts from './HomeProducts';
import HomeCategories from './HomeCategories';

export const HomeScreen = () => {
  return (
    <ScrollView>
      <HomeCategories />
      <HomeProducts />
    </ScrollView>
  );
};
