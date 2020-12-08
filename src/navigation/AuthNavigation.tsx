import { LoginScreen, SignUpScreen } from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import navigationNames from './navigationNames';

const RootStack = createStackNavigator();

export default function () {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={navigationNames.loginScreen}
        component={LoginScreen}
        options={{ headerTitle: 'Log In' }}
      />
      <RootStack.Screen
        name={navigationNames.signUpScreen}
        component={SignUpScreen}
        options={{ headerTitle: 'Sign Up' }}
      />
    </RootStack.Navigator>
  );
}
