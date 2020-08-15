import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Products } from '@/types';
import { ProductList, Heading } from '@/components';

interface Props {
  products: Products;
}

const ProductRelated: React.FC<Props> = ({ products }) => {
  return (
    <View style={styles.container}>
      <Heading title="Related Product" />
      <ProductList products={products} />
    </View>
  );
};

export default ProductRelated;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
