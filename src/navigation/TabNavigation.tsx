import { HomeScreen, SearchScreen, ProfileScreen, CartScreen } from '@/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { tabScreenOptions } from './NavigationHelper';
import { colors } from '@/theme';
import navigationNames from './navigationNames';
import { useAuth } from '@/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ProfileScreen" component={HomeScreen} />
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

const HomeTabNavigator = () => {
  const { isAuthenticated } = useAuth();
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
      <Tab.Screen name={navigationNames.cartTab} component={CartScreen} />
      <Tab.Screen
        name={navigationNames.profileTab}
        component={ProfileScreen}
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
