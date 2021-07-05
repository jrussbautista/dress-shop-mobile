import { useAuth, useCart } from '@/contexts';
import {
  HomeScreen,
  SearchScreen,
  ProfileScreen,
  CartScreen,
  ProductScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  OrdersScreen,
} from '@/screens';
import { colors } from '@/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { tabScreenOptions } from './NavigationHelper';
import navigationNames from './navigationNames';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name={navigationNames.homeScreen}
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
      <Stack.Screen
        name={navigationNames.searchScreen}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationNames.productSearchScreenTab}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};

const CartStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={navigationNames.cartScreen} component={CartScreen} />
      <Stack.Screen
        name={navigationNames.productCartScreenTab}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationNames.profileScreen}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={navigationNames.ordersScreen}
        component={OrdersScreen}
        options={{ headerTitle: 'My Orders' }}
      />
      <Stack.Screen
        name={navigationNames.changePasswordScreen}
        component={ChangePasswordScreen}
        options={{ headerTitle: 'Change Password' }}
      />
      <Stack.Screen
        name={navigationNames.editProfileScreen}
        component={EditProfileScreen}
        options={{ headerTitle: 'Edit Profile' }}
      />
      <Stack.Screen
        name={navigationNames.productProfileScreenTab}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  interface CartTabOptions {
    tabBarBadge?: number;
  }

  const { isAuthenticated } = useAuth();
  const { cartItems } = useCart();

  let cartTabOptions: CartTabOptions = {};

  const cartItemsNum = cartItems.length;

  if (cartItemsNum > 0) {
    cartTabOptions = { tabBarBadge: cartItemsNum };
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
