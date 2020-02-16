import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Search, Product, Login } from '../screens';
import { MenuRight, HeaderTitle } from '../components/Shared/Menu';
import { useAuth } from '../store';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { user } = useAuth();

  return (
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
  );
};

export default AppNavigation;
