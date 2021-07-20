import { colors } from '@/theme';
import { Product } from '@/types';
import formatPrice from '@/utils/formatPrice';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface Props {
  product: Product;
}

const ProductInfo: React.FC<Props> = ({ product }) => {
  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={{ uri: product.imageURL }} style={styles.productImg} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}> {product.name}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>
    </>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  imgContainer: { paddingBottom: 15 },
  productImg: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 20,
  },
  price: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '700',
  },
  info: {
    padding: 15,
  },
  desc: {
    paddingTop: 10,
    fontSize: 15,
    color: colors.gray,
  },
});
