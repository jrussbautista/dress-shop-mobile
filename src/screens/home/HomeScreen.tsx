import Banners from '@/components/banners';
import { CategoriesSkeleton, Categories } from '@/components/category';
import { ProductListSkeleton, ProductList } from '@/components/product';
import { Heading } from '@/components/ui';
import { useProducts } from '@/hooks';
import navigationNames from '@/navigation/navigationNames';
import { CategoryService, BannerService } from '@/services';
import { colors } from '@/theme';
import { Category, Banner } from '@/types';
import isReachedEnd from '@/utils/reachEnd';
import React, { useState, useEffect } from 'react';
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

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const results = await CategoryService.getCategories();
        setCategories(results.categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoadingCategories(true);
        const results = await BannerService.getBanners();
        setBanners(results.banners);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingBanners(false);
      }
    };
    fetchBanners();
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
      {loadingBanners ? (
        <View style={styles.bannersBox} />
      ) : (
        <Banners banners={banners} />
      )}

      {loadingCategories ? (
        <CategoriesSkeleton />
      ) : (
        <Categories categories={categories} />
      )}

      <View style={styles.productOverview}>
        <Heading title="Product Overview" />

        {loadingProducts ? (
          <ProductListSkeleton />
        ) : (
          <ProductList
            routeName={navigationNames.productHomeScreenTab}
            products={products}
          />
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
  bannersBox: {
    backgroundColor: colors.lightGray,
    height: 200,
  },
});
