import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

const ProductSkeleton = () => {
  return (
    <View>
      <View style={styles.box}></View>
      <View style={styles.container}>
        <View style={styles.line}></View>
        <View style={[styles.line, { width: 100 }]}></View>
        <View style={[styles.line, { height: 50 }]}></View>
      </View>
    </View>
  );
};

export default ProductSkeleton;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
  box: {
    width: '100%',
    height: 300,
    backgroundColor: colors.lightGray,
    marginBottom: 15,
  },
  line: {
    height: 30,
    backgroundColor: colors.lightGray,
    marginVertical: 5,
  },
});
