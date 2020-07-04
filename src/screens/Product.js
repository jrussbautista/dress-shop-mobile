import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import apiURL from '~/utils/apiURL';
import ProductInfo from '~/components/Product/ProductInfo';
import ProductAction from '~/components/Product/ProductAction';
import { ProductList } from '~/components/Shared/Products';
import { useAuth, useCart, useToast } from '~/store';
import { SkeletonProduct } from '~/components/Shared/Loader';

const Product = ({ navigation, route }) => {
  const { id } = route.params;
  const { user } = useAuth();
  const { addCart } = useCart();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState('1');
  const pageRef = useRef();

  useEffect(() => {
    async function getProductInfo() {
      setLoading(true);
      const payload = { params: { id } };
      const { data } = await axios.get(`${apiURL}/product`, payload);
      setProduct(data.product);
      setRelatedProducts(data.relatedProducts);
      setLoading(false);
    }
    getProductInfo();
  }, [id]);

  // useEffect(() => {
  //   pageRef.current.scrollTo({ x: 0, y: 0, animated: true });
  // }, [id]);

  const handleAddCart = () => {
    if (user) {
      const cartObj = { quantity: Number(qty), product };
      addCart(cartObj);
      showToast('success', 'Successfully added to your cart');
    } else {
      navigation.navigate('Login', { ref: product._id });
    }
  };

  const handleChangeQty = (action) => {
    if (action === 'add') {
      if (qty >= 10) {
        alert('Ops you can buy up to 10 max');
        return;
      }
      setQty((qty) => (parseInt(qty) + 1).toString());
    } else {
      if (qty > 1) setQty((qty) => (parseInt(qty) - 1).toString());
    }
  };

  return (
    <ScrollView ref={pageRef}>
      {loading ? (
        <SkeletonProduct />
      ) : (
        <View style={styles.container}>
          <ProductInfo product={product} />
          <ProductAction
            addCart={handleAddCart}
            handleQty={handleChangeQty}
            qty={qty}
          />
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
    paddingHorizontal: 15,
  },
  heading: {
    paddingVertical: 15,
  },
  headingText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
