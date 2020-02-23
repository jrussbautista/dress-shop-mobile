import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const ProductInfo = ({ product }) => {
  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={{ uri: product.imageURL }} style={styles.productImg} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}> {product.name}</Text>
        <Text style={styles.price}>P{product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>
    </>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  imgContainer: { paddingVertical: 15 },
  productImg: {
    width: '100%',
    height: 300,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 20,
    paddingTop: 15
  },
  price: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700'
  },
  info: {},
  desc: {
    paddingTop: 10,
    fontSize: 15,
    color: colors.gray
  }
});
