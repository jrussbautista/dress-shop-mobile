import { useAuth } from '@/contexts';
import {
  HomeScreen,
  SearchScreen,
  ProfileScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  OrdersScreen,
  WishlistScreen,
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
    </Stack.Navigator>
  );
};

const WishlistStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationNames.wishlistScreen}
        component={WishlistScreen}
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
      <Tab.Screen
        name={navigationNames.wishlistTab}
        component={WishlistStackScreen}
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
