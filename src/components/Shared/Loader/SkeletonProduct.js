import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const SkeletonProduct = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}></View>
      <View style={styles.line}></View>
      <View style={[styles.line, { width: 100 }]}></View>
      <View style={[styles.line, { height: 50 }]}></View>
    </View>
  );
};

export default SkeletonProduct;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
  box: {
    width: '100%',
    height: 300,
    backgroundColor: colors.lightGray,
    marginVertical: 15
  },
  line: {
    height: 30,
    backgroundColor: colors.lightGray,
    marginVertical: 5
  }
});
