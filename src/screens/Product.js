import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import apiURL from '../utils/apiURL';
import ProductInfo from '../components/Product/ProductInfo';
import ProductAction from '../components/Product/ProductAction';
import { ProductList } from '../components/Shared/Products';
import { useAuth } from '../store';
import { SkeletonProduct } from '../components/Shared/Loader';

const Product = ({ navigation, route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getProductInfo() {
      const payload = { params: { id } };
      const { data } = await axios.get(`${apiURL}/product`, payload);
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
      setLoading(false);
    }
    getProductInfo();
  }, []);

  const addCart = () => {
    if (user) {
    } else {
      navigation.navigate('Login', { ref: product._id });
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <SkeletonProduct />
      ) : (
        <View style={styles.container}>
          <ProductInfo product={product} />
          <ProductAction addCart={addCart} />
          <View style={styles.heading}>
            <Text style={styles.headingText}> Related Products </Text>
          </View>
          <ProductList products={relatedProducts} />
        </View>
      )}
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },
  heading: {
    paddingVertical: 15
  },
  headingText: {
    fontSize: 18,
    fontWeight: '700'
  }
});
