import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductListSkeleton } from '@/components';
import { colors } from '@/theme';

const HomeProductsSkeleton = () => {
  return (
    <View>
      <View style={styles.heading} />
      <ProductListSkeleton />
    </View>
  );
};

export default HomeProductsSkeleton;

const styles = StyleSheet.create({
  heading: {
    backgroundColor: colors.lightGray,
    height: 25,
    width: 150,
    marginHorizontal: 15,
    marginTop: 20,
  },
});
