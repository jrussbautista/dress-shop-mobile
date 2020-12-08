import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Avatar } from '@/components/ui';
import { useAuth, useCart, useToast } from '@/contexts';
import { useNavigation } from '@react-navigation/native';
import navigationNames from '@/navigation/navigationNames';
import { colors } from '@/theme';

const ICON_SIZE = 20;

const menus = [
  {
    title: 'My Orders',
    to: navigationNames.ordersScreen,
  },
  {
    title: 'Edit Profile',
    to: navigationNames.editProfileScreen,
  },
  {
    title: 'Change Password',
    to: navigationNames.changePasswordScreen,
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logOut, isAuthenticated, currentUser } = useAuth();
  const { clearCart } = useCart();
  const { showToast } = useToast();

  const onLogOut = async () => {
    try {
      await logOut();
      clearCart();
      navigation.navigate(navigationNames.rootAuthScreen);
    } catch (error) {
      showToast('error', error.message);
    }
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.emptyText}> Please login to see your profile </Text>
        <Button
          title="Go to Login"
          style={styles.btn}
          onPress={() => navigation.navigate(navigationNames.rootAuthScreen)}
        />
      </View>
    );
  }

  const menuListElement = menus.map((menu, i) => (
    <TouchableOpacity
      key={`menu-${i}`}
      style={styles.menuList}
      onPress={() => navigation.navigate(menu.to)}
    >
      <Text style={styles.menuTitle}> {menu.title} </Text>
      <Ionicons name="ios-arrow-forward" size={ICON_SIZE} color="black" />
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.infoContainer}>
          <Avatar user={currentUser} />
          <Text style={styles.name}>{currentUser.name}</Text>
        </View>
        <View style={styles.menu}>{menuListElement}</View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.btnLogOut} onPress={onLogOut}>
          <Text style={styles.btnText}> Log Out </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  name: {
    fontSize: 18,
    marginTop: 10,
  },
  menu: {
    marginVertical: 10,
  },
  menuList: {
    paddingVertical: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  menuTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 200,
  },
  main: {
    flex: 5,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  btnLogOut: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  btnText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});
