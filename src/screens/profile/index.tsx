import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from '@/components';
import { useAuth } from '@/store';
import { useNavigation } from '@react-navigation/native';
import navigationNames from '@/navigation/navigationNames';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logOut } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigation.navigate(navigationNames.rootAuthScreen);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <Text> Profile screen here </Text>
      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
};
