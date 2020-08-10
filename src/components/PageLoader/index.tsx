import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const PageLoader = () => {
  return (
    <View style={styles.pageLoader}>
      <ActivityIndicator size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  pageLoader: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
