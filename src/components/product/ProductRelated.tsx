import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Products } from '@/types';
import { Heading } from '@/components/ui';
import ProductList from './ProductList';
import navigationNames from '@/navigation/navigationNames';

interface Props {
  products: Products;
}

const ProductRelated: React.FC<Props> = ({ products }) => {
  return (
    <View style={styles.container}>
      <Heading title="Related Product" />
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
    padding: 15,
  },
});
