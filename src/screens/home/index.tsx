import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  RefreshControl,
  View,
  StyleSheet,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';
import { ProductService } from '@/services';
import { HomeCategories, HomeBanners } from './components';
import { Products } from '@/types';
import { ProductList, ProductListSkeleton, Heading } from '@/components';
import { colors } from '@/theme';
import { PAGE_LIMIT } from '@/constants';

const SPINNER_SIZE = 35;

export const HomeScreen = () => {
  const [products, setProducts] = useState<Products>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(true);

  useEffect(() => {
    fetchProducts(page);
  }, []);

  const fetchProducts = async (currentPage: number) => {
    try {
      setLoading(true);
      const payload = {
        page: currentPage,
        limit: PAGE_LIMIT,
      };
      const results = await ProductService.getProducts(payload);
      setProducts(results.products);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    try {
      if (!hasLoadMore) {
        return;
      }
      setIsLoadingMore(true);
      setPage((page) => page + 1);
      const payload = { page: page + 1, limit: PAGE_LIMIT };
      const { total, products: newProducts } = await ProductService.getProducts(
        payload
      );
      const isLoadMore = total <= newProducts.length;
      setProducts([...products, ...newProducts]);
      setHasLoadMore(isLoadMore);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleRefresh = async () => {
    setHasLoadMore(true);
    setPage(1);
    setRefreshing(true);
    await fetchProducts(1);
    setRefreshing(false);
  };

  const isReachedEnd = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleOnScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isReachedEnd(nativeEvent)) {
      loadMoreProducts();
    }
  };

  const productList = loading ? (
    <ProductListSkeleton />
  ) : (
    <ProductList products={products} />
  );

  const spinnerElement = isLoadingMore ? (
    <View style={styles.loading}>
      <ActivityIndicator color={colors.primary} size={SPINNER_SIZE} />
    </View>
  ) : null;

  const reachedEndElement = !hasLoadMore ? (
    <View style={styles.msg}>
      <Text style={styles.msgText}> No more products to load.</Text>
    </View>
  ) : null;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      onScroll={handleOnScroll}
    >
      <HomeBanners />
      <HomeCategories />
      <View style={styles.productOverview}>
        <Heading title="Product Overview" />
        {productList}
        {spinnerElement}
        {reachedEndElement}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productOverview: {
    paddingHorizontal: 15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  msg: {
    padding: 10,
  },
  msgText: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.primary,
  },
});
