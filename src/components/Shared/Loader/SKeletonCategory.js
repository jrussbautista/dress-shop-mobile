import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const SkeletonCategory = () => {
  return (
    <View>
      {[...Array(2)].map((_, i) => (
        <View style={styles.box} key={i}></View>
      ))}
    </View>
  );
};

export default SkeletonCategory;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 150,
    backgroundColor: colors.lightGray,
    marginBottom: 15
  }
});
