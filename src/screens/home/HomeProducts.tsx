import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductService } from '@/services';
import { Products } from '@/types';
import { ProductList, Heading } from '@/components';

import HomeProductsSkeleton from './HomeProductsSkeleton';

const HomeProducts = () => {
  const [products, setProducts] = useState<Products>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const results = await ProductService.getProducts();
      setProducts(results.products);
    } catch (error) {
      setError('Error in fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return <Text> Error </Text>;
  }

  if (loading) {
    return <HomeProductsSkeleton />;
  }

  return (
    <View style={styles.container}>
      <Heading title="Product Overview" />
      <ProductList products={products} />
    </View>
  );
};

export default HomeProducts;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
