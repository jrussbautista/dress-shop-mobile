import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';

import navigationNames from './navigationNames';
import HomeTabNavigator from './TabNavigation';
import AuthNavigation from './AuthNavigation';
import { useAuth } from '@/store';
import { AuthLoadingScreen } from '@/screens';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={navigationNames.rootScreen}
          component={HomeTabNavigator}
          options={{ title: 'Dress' }}
        />
        <Stack.Screen
          name={navigationNames.rootAuthScreen}
          component={AuthNavigation}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
