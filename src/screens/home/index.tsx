import React from 'react';
import { ScrollView } from 'react-native';
import HomeProducts from './HomeProducts';
import HomeCategories from './HomeCategories';
import HomeBanners from './HomeBanners';

export const HomeScreen = () => {
  return (
    <ScrollView>
      <HomeBanners />
      <HomeCategories />
      <HomeProducts />
    </ScrollView>
  );
};
