import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@/components';

export const CartCheckOut = () => {
  return <Button title="Check Out" style={styles.btn} />;
};

const styles = StyleSheet.create({
  btn: {
    marginVertical: 20,
    width: 200,
  },
});
