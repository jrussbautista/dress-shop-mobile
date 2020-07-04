import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const CartCheckOut = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.btnText}>Check Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'flex-end',
  },
  btnText: {
    color: '#fff',
  },
  btn: {
    backgroundColor: '#3d3d3d',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
});
