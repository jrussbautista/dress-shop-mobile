import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View, StyleSheet } from 'react-native';
import { ProductService } from '@/services';
import HomeCategories from './HomeCategories';
import HomeBanners from './HomeBanners';
import { Products } from '@/types';
import { ProductList, ProductListSkeleton, Heading } from '@/components';

export const HomeScreen = () => {
  const [products, setProducts] = useState<Products>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const results = await ProductService.getProducts();
      setProducts(results.products);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const productList = loading ? (
    <ProductListSkeleton />
  ) : (
    <ProductList products={products} />
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <HomeBanners />
      <HomeCategories />
      <View style={styles.productOverview}>
        <Heading title="Product Overview" />
        {productList}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productOverview: {
    paddingHorizontal: 15,
  },
});
