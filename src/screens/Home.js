import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { ProductList } from '../components/Shared/Products';
import Categories from '../components/Home/Categories';
import axios from 'axios';
import apiURL from '../utils/apiURL';
import SkeletonGrid from '../components/Shared/Loader/SkeletonGrid';
import colors from '../utils/colors';
import Banner from '../components/Home/Banner';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasLoadMore, setHasLoadMore] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  async function fetchProducts(curPage) {
    try {
      const payload = { params: { limit: 10, page: curPage } };
      const { data } = await axios.get(`${apiURL}/products`, payload);
      return data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts(page);
        const total = data.totalProducts;
        const newProducts = [...products, ...data.products];
        setProducts(newProducts);
        setLoading(false);
        const isLoadMore = total <= newProducts.length;
        if (isLoadMore) setHasLoadMore(false);
        setIsAdding(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (hasLoadMore) getProducts();
  }, [page]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const loadMore = () => {
    if (hasLoadMore) {
      setPage(page => page + 1);
      setIsAdding(true);
    }
  };

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          loadMore();
        }
      }}
    >
      <Banner />
      <View style={styles.container}>
        <Text style={styles.heading}> Shop Categories </Text>
        <Categories />
        <Text style={styles.heading}> Product Overview </Text>
        {loading ? <SkeletonGrid /> : <ProductList products={products} />}
        {isAdding && (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} size={35} />
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

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  msg: {
    paddingHorizontal: 10
  },
  msgText: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.primary
  }
});
