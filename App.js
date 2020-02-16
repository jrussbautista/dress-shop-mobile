import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Search, Product, Login } from './src/screens';
import { MenuRight, HeaderTitle } from './src/components/Shared/Menu';
import { AuthProvider } from './src/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Dress' }}
            options={{
              headerTitle: () => <HeaderTitle />,
              headerRight: () => <MenuRight />
            }}
          />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
