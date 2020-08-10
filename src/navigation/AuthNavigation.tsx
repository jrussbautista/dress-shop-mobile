import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen } from '../screens';

const RootStack = createStackNavigator();

export default function () {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Login" component={LoginScreen} />
    </RootStack.Navigator>
  );
}
