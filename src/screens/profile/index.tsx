import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button } from '@/components';
import { useAuth, useCart } from '@/store';
import { useNavigation } from '@react-navigation/native';
import navigationNames from '@/navigation/navigationNames';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logOut, isAuthenticated } = useAuth();
  const { clearCart } = useCart();

  const handleLogOut = async () => {
    try {
      await logOut();
      clearCart();
      navigation.navigate(navigationNames.rootAuthScreen);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.emptyText}> Please login to see your cart </Text>
        <Button
          title="Go to Login"
          style={styles.btn}
          onPress={() => navigation.navigate(navigationNames.rootAuthScreen)}
        />
      </View>
    );
  }

  return (
    <View>
      <Text> Profile screen here </Text>
      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
};

const styles = StyleSheet.create({});
