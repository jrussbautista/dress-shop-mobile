import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SearchForm, SearchCategory, SearchFilter } from './components';
import { useProducts } from '@/hooks';
import { ProductList, ProductListSkeleton } from '@/components';
import { colors } from '@/theme';
import isReachedEnd from '@/utils/reachEnd';

interface Payload {
  keyword?: string;
  category?: string;
}

interface RouteParams {
  category: string;
}

const SPINNER_SIZE = 35;

export const SearchScreen = () => {
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();

  const category = route.params.category ? route.params.category : '';

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);

  let payload: Payload = {};

  if (selectedCategory) {
    payload.category = selectedCategory;
  }

  if (searchText) {
    payload.keyword = searchText;
  }

  const {
    isLoadingMore,
    loading,
    loadMore,
    hasLoadMore,
    refreshing,
    refresh,
    products,
    loadProducts,
  } = useProducts(payload);

  const handleSubmit = () => {
    loadProducts(payload);
  };

  const handleChangeText = (val: string) => {
    setSearchText(val);
  };

  const handleOnScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isReachedEnd(nativeEvent) && !loading) {
      loadMore();
    }
  };

  const handlePressCategory = (val: string) => {
    setSelectedCategory(val);
    loadProducts({ ...payload, category: val });
  };

  const productList = loading ? (
    <ProductListSkeleton />
  ) : (
    <ProductList products={products} />
  );

  const searchEmptyText =
    !loading && products.length === 0 ? (
      <View style={styles.searchEmpty}>
        <Text style={styles.searchEmptyHeading}> No matching products.</Text>
        <Text style={styles.searchEmptySub}> Try a different search. </Text>
      </View>
    ) : null;

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
    <TouchableWithoutFeedback
      style={styles.main}
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.container}>
        <SearchForm
          onSubmit={handleSubmit}
          value={searchText}
          onChangeText={handleChangeText}
        />
        <View style={styles.actionContainer}>
          <SearchCategory
            active={selectedCategory}
            onPress={handlePressCategory}
          />
          <SearchFilter />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          onScroll={handleOnScroll}
        >
          <View style={styles.productContainer}>
            {searchEmptyText}
            {productList}
            {spinnerElement}
            {reachedEndElement}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
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
  productContainer: {
    padding: 15,
  },
  searchTotalContainer: {
    marginBottom: 10,
  },
  searchTotalText: {
    fontSize: 16,
  },
  searchEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchEmptyHeading: {
    fontWeight: '700',
  },
  searchEmptySub: {
    marginTop: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
