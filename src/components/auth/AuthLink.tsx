import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import navigationNames from '@/navigation/navigationNames';

interface Props {
  type: 'login' | 'signUp';
}

const AuthLink = ({ type }: Props) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    const route =
      type === 'login'
        ? navigationNames.signUpScreen
        : navigationNames.loginScreen;
    navigation.navigate(route);
  };

  const link =
    type === 'login' ? (
      <TouchableOpacity style={styles.linkContainer} onPress={handleNavigate}>
        <Text> Don't have an account? </Text>
        <Text> Sign up here.</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.linkContainer} onPress={handleNavigate}>
        <Text> Already have an account? </Text>
        <Text> Log in here.</Text>
      </TouchableOpacity>
    );

  return <View style={styles.container}>{link}</View>;
};

export default AuthLink;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
  },
});
