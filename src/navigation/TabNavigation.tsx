import {
  HomeScreen,
  SearchScreen,
  ProfileScreen,
  CartScreen,
  ProductScreen,
} from '@/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { tabScreenOptions } from './NavigationHelper';
import { colors } from '@/theme';
import navigationNames from './navigationNames';
import { useAuth, useCart } from '@/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Dress' }}
      />
      <Stack.Screen
        name={navigationNames.productHomeScreenTab}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const CartStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  interface CartTabOptions {
    tabBarBadge?: number;
  }

  const { isAuthenticated } = useAuth();
  const { cartsNum } = useCart();

  let cartTabOptions: CartTabOptions = {};

  if (cartsNum > 0) {
    cartTabOptions = { tabBarBadge: cartsNum };
  }

  return (
    <Tab.Navigator
      screenOptions={tabScreenOptions}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.dark,
      }}
    >
      <Tab.Screen name={navigationNames.homeTab} component={HomeStackScreen} />
      <Tab.Screen
        name={navigationNames.searchTab}
        component={SearchStackScreen}
      />
      <Tab.Screen
        name={navigationNames.cartTab}
        component={CartStackScreen}
        options={cartTabOptions}
      />
      <Tab.Screen
        name={navigationNames.profileTab}
        component={ProfileStackScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (isAuthenticated) return;
            e.preventDefault();
            navigation.navigate(navigationNames.rootAuthScreen);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
