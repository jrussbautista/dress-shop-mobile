import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

export const Toast = ({ message, active, type }) => {
  const typeStyle = type === 'success' ? styles.success : styles.danger;

  if (!active) return null;

  return (
    <View style={styles.toastContainer}>
      <View style={[styles.toast, typeStyle]}>
        <Text style={styles.toastText}> {message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
    top: 100,
    padding: 10,
  },
  toast: {
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 6,
  },
  toastText: {
    color: '#fff',
  },
  success: {
    backgroundColor: colors.success,
  },
  danger: {
    backgroundColor: colors.danger,
  },
});
