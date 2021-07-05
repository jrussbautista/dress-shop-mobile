import { Heading } from '@/components/ui';
import navigationNames from '@/navigation/navigationNames';
import { Products } from '@/types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import ProductList from './ProductList';

interface Props {
  products: Products;
}

const ProductRelated: React.FC<Props> = ({ products }) => {
  return (
    <View style={styles.container}>
      <Heading title="Related Products" />
      <ProductList
        routeName={navigationNames.productHomeScreenTab}
        products={products}
      />
    </View>
  );
};

export default ProductRelated;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
