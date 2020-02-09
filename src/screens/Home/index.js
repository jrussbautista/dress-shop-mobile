import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { ProductList } from "../../components/Shared/Products";
import styles from "./styles";
import Categories from "./Categories";
import axios from "axios";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(
          `https://dress-shop.now.sh/api/products`
        );
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
