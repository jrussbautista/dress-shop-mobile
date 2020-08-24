import React from 'react';
import { ProductListSkeleton } from '@/components';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

export const HomeProductListSkeleton = () => {
  return (
    <>
      <View style={styles.heading} />
      <ProductListSkeleton />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    height: 20,
    marginBottom: 10,
    backgroundColor: colors.lightGray,
    width: 150,
  },
});
