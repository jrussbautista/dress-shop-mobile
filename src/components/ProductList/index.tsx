import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Products, Product } from '@/types';
import ProductItem from './ProductItem';

interface Props {
  products: Products;
  routeName: string;
}

export const ProductList: React.FC<Props> = ({ products, routeName }) => {
  const productsEl = products.map((product) => (
    <ProductItem routeName={routeName} product={product} key={product._id} />
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
