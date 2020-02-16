import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Home,
  Search,
  Product,
  Login,
  Splash,
  Cart,
  Account
} from '../screens';
import { MenuRight, HeaderTitle } from '../components/Shared/Menu';
import { useAuth } from '../store';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { user, loading, getLoginUser } = useAuth();

  useEffect(() => {
    getLoginUser();
  }, []);

  if (loading) {
    return <Splash />;
  }

  const getOptions = name => {
    const options = {
      headerTitle: () => <HeaderTitle title={name} />,
      headerRight: () => <MenuRight />
    };
    return options;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={() => getOptions('Dress')}
        />
        {user ? (
          <>
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={() => getOptions('Cart')}
            />
            <Stack.Screen name="Account" component={Account} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
