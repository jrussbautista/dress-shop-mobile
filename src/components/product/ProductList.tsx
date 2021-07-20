import { Product } from '@/types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProductItem from './ProductItem';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <View style={styles.products}>
      {products.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
});
