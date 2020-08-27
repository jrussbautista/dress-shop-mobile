import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Products } from '@/types';
import { ProductList, Heading } from '@/components';
import navigationNames from '@/navigation/navigationNames';

interface Props {
  products: Products;
}

export const ProductRelated: React.FC<Props> = ({ products }) => {
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

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
