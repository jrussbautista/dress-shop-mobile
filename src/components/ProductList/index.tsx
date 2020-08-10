import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Products } from '@/types';
import ProductItem from './ProductItem';

interface Props {
  products: Products;
}

export const ProductList: React.FC<Props> = ({ products }) => {
  const productsEl = products.map((product) => (
    <ProductItem product={product} key={product._id} />
  ));

  return <View style={styles.products}>{productsEl}</View>;
};

const styles = StyleSheet.create({
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
