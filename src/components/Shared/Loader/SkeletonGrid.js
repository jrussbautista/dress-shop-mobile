import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../../utils/colors';

const SkeletonGrid = () => {
  return (
    <View style={styles.container}>
      {[...Array(10)].map((arr, i) => (
        <View style={styles.list} key={i}>
          <View style={styles.imgWrapper}></View>
          <View style={styles.info}>
            <View style={styles.line}></View>
            <View style={[styles.line, styles.halfLine]}></View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SkeletonGrid;

let width = Dimensions.get('screen').width / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: 15
  },
  list: { width: width - 22, marginBottom: 15 },
  imgWrapper: {
    width: width - 22,
    height: width - 22,
    backgroundColor: colors.lightGray
  },

  line: {
    backgroundColor: colors.lightGray,
    height: 20,
    marginTop: 10
  },
  halfLine: {
    width: '50%'
  }
});
