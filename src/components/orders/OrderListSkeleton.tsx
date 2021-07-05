import { colors } from '@/theme';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const OrderListSkeleton = () => {
  const renderList = () => {
    return [...Array(10)].map((_, i) => (
      <View key={i} style={styles.list}>
        <View style={styles.heading} />
        <View style={styles.info}>
          <View style={styles.imageBox} />
          <View style={styles.main}>
            <View style={styles.boxSmall} />
            <View style={styles.boxSmall} />
          </View>
          <View style={styles.boxSmall} />
        </View>
      </View>
    ));
  };

  return <View style={styles.container}>{renderList()}</View>;
};

export default OrderListSkeleton;

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  heading: {
    width: 150,
    backgroundColor: colors.lightGray,
    height: 20,
  },
  container: {
    padding: 15,
  },
  imageBox: {
    width: 100,
    height: 100,
    backgroundColor: colors.lightGray,
  },
  info: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  main: {
    paddingHorizontal: 10,
    flex: 1,
  },
  boxSmall: {
    backgroundColor: colors.lightGray,
    height: 20,
    width: 100,
    marginBottom: 10,
  },
});
