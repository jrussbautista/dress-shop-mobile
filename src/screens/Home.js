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

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const payload = { params: { limit: 10 } };
        const { data } = await axios.get(`${apiURL}/products`, payload);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}> Shop Categories </Text>
        <Categories />
        <Text style={styles.heading}> Product Overview </Text>
        {loading ? <ActivityIndicator /> : <ProductList products={products} />}
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
  }
});
