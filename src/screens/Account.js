import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '~/store';

const Account = () => {
  const { logout } = useAuth();
  return (
    <View>
      <Text> Account page here </Text>
      <Button type="primary" onPress={logout} title="Log Out" />
    </View>
  );
};

export default Account;
