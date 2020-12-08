import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';

const CategoriesSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(2)].map((_, i) => (
        <View style={styles.box} key={i} />
      ))}
    </View>
  );
};

export default CategoriesSkeleton;

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
