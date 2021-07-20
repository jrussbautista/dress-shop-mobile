import { AuthLoading } from '@/components/auth';
import { useAuth } from '@/contexts';
import { ProductScreen, CartScreen } from '@/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';

import AuthNavigation from './AuthNavigation';
import HomeTabNavigator from './HomeTabNavigator';
import navigationNames from './navigationNames';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { loading } = useAuth();

  if (loading) {
    return <AuthLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name={navigationNames.rootScreen}
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={navigationNames.rootAuthScreen}
          component={AuthNavigation}
          options={{ headerTitle: 'Log In' }}
        />
        <Stack.Screen
          name={navigationNames.productScreen}
          component={ProductScreen}
        />
        <Stack.Screen
          name={navigationNames.cartScreen}
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
