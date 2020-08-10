import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/theme';

export const ProductListSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, i) => (
        <View style={styles.list} key={i}>
          <View style={styles.imgWrapper}></View>
          <View>
            <View style={styles.line}></View>
            <View style={[styles.line, styles.halfLine]}></View>
          </View>
        </View>
      ))}
    </View>
  );
};

let width = Dimensions.get('screen').width / 2 - 22;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  list: { width: width, marginBottom: 15 },
  imgWrapper: {
    width: width,
    height: width,
    backgroundColor: colors.lightGray,
  },

  line: {
    backgroundColor: colors.lightGray,
    height: 20,
    marginTop: 10,
  },
  halfLine: {
    width: '50%',
  },
});
