import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import React from 'react';

import navigationNames from './navigationNames';

const getTabTitle = (routeName: string): string => {
  switch (routeName) {
    case navigationNames.homeTab:
      return 'Home';
    case navigationNames.searchTab:
      return 'Search';
    case navigationNames.profileTab:
      return 'Profile';
    case navigationNames.wishlistTab:
      return 'Wishlist';
    default:
      return '';
  }
};

export const tabScreenOptions: (props: {
  route: RouteProp<ParamListBase, keyof ParamListBase>;
  navigation: any;
}) => BottomTabNavigationOptions = ({ route }) => ({
  title: getTabTitle(route.name),
  tabBarIcon: ({ color, size }) => {
    let iconName = '';
    switch (route.name) {
      case navigationNames.homeTab:
        iconName = 'ios-home';
        break;
      case navigationNames.searchTab:
        iconName = 'ios-search';
        break;
      case navigationNames.wishlistTab:
        iconName = 'ios-heart';
        break;
      case navigationNames.profileTab:
        iconName = 'md-person';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});
