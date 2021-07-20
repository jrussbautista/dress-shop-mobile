import { CartButton } from '@/components/cart';
import { HomeBanners } from '@/components/home';
import HomeCategories from '@/components/home/HomeCategories';
import { ProductListSkeleton, ProductList } from '@/components/product';
import { Heading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { colors } from '@/theme';
import isReachedEnd from '@/utils/reachEnd';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
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

const SPINNER_SIZE = 35;

const HomeScreen = () => {
  const {
    isLoadingMore,
    loading: loadingProducts,
    loadMore,
    hasLoadMore,
    refreshing,
    refresh,
    products,
  } = useProducts();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartButton />,
    });
  }, []);

  const handleOnScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isReachedEnd(nativeEvent) && !loadingProducts) {
      loadMore();
    }
  };

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

        {loadingProducts ? (
          <ProductListSkeleton />
        ) : (
          <ProductList products={products} />
        )}

        {isLoadingMore && (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} size={SPINNER_SIZE} />
          </View>
        )}

        {!hasLoadMore && (
          <View style={styles.msg}>
            <Text style={styles.msgText}> No more products to load.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

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
