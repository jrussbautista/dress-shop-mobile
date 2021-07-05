import { PageLoader } from '@/components/ui';
import { GOOGLE_ANDROID_DEV_CLIENT_ID } from '@/constants';
import { useAuth, useToast } from '@/contexts';
import navigationNames from '@/navigation/navigationNames';
import { AuthService } from '@/services';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AuthSocial = () => {
  const { setCurrentUser } = useAuth();
  const { showToast } = useToast();
  const navigation = useNavigation();
  const [isVerifying, setIsVerifying] = useState(false);

  async function signInWithGoogleAsync() {
    try {
      setIsVerifying(true);
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: GOOGLE_ANDROID_DEV_CLIENT_ID,
        scopes: ['profile', 'email'],
        androidStandaloneAppClientId: '',
      });

      if (result.type === 'success') {
        const idToken = result.idToken as string;
        const { user, token } = await AuthService.verifyGoogleIdToken(idToken);
        await setCurrentUser(user, token);
        navigation.navigate(navigationNames.profileTab);
      }
    } catch ({ message }) {
      showToast('error', message);
    } finally {
      setIsVerifying(false);
    }
  }

  const onLogin = () => {
    signInWithGoogleAsync();
  };

  return (
    <>
      <PageLoader visible={isVerifying} />
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}> or </Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity onPress={onLogin} style={styles.btn}>
        <Image
          source={require('../../../assets/google_logo.png')}
          style={styles.logo}
        />
        <Text> Login with Google </Text>
      </TouchableOpacity>
    </>
  );
};

export default AuthSocial;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgb(205, 209, 212)',
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textWhite: {
    color: '#fff',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    backgroundColor: '#c6d2d9',
    height: 1,
  },
  orText: {
    paddingHorizontal: 10,
  },
});
