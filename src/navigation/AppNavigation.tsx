import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';

import navigationNames from './navigationNames';
import HomeTabNavigator from './HomeTabNavigator';
import AuthNavigation from './AuthNavigation';
import { useAuth } from '@/contexts';
import { AuthLoading } from '@/components/auth';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { loading } = useAuth();

  if (loading) {
    return <AuthLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={navigationNames.rootScreen}
          component={HomeTabNavigator}
        />
        <Stack.Screen
          name={navigationNames.rootAuthScreen}
          component={AuthNavigation}
          options={{ headerTitle: 'Log In' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
