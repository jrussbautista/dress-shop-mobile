import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

const MySafeAreaView: React.FC = ({ children }) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

export default MySafeAreaView;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
