import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const AuthLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
