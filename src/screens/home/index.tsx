import React from 'react';
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
import { HomeCategories, HomeBanners } from './components';
import { ProductList, ProductListSkeleton, Heading } from '@/components';
import { colors } from '@/theme';
import { useProducts } from '@/hooks';
import isReachedEnd from '@/utils/reachEnd';

const SPINNER_SIZE = 35;

export const HomeScreen = () => {
  const {
    isLoadingMore,
    loading,
    loadMore,
    hasLoadMore,
    refreshing,
    refresh,
    products,
  } = useProducts();

  const handleOnScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isReachedEnd(nativeEvent)) {
      loadMore();
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
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
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
