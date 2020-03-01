import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../../utils/colors';

const SkeletonBanner = () => {
  return <View style={styles.box}></View>;
};

export default SkeletonBanner;

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.lightGray,
    height: 200
  }
});
