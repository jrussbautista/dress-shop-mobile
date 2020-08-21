import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

const HomeCategoriesSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(2)].map((_, i) => (
        <View style={styles.box} key={i} />
      ))}
    </View>
  );
};

export default HomeCategoriesSkeleton;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 150,
    backgroundColor: colors.lightGray,
    marginBottom: 15,
  },
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
});
