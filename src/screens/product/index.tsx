import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Animated,
  StyleSheet,
  Share,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProductService } from '@/services';
import { Product, Products } from '@/types';
import ProductInfo from './ProductInfo';
import ProductSkeleton from './ProductSkeleton';
import ProductRelated from './ProductRelated';
import ProductAction from './ProductAction';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';

export const ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const productId = route.params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products>([]);
  const [isLoading, setIsLoading] = useState(false);

  const animation = new Animated.Value(0);
  const opacity = animation.interpolate({
    inputRange: [0, 1, 200],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  navigation.setOptions({
    title: product ? product.name : '',
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerTitleStyle: { opacity },
    headerBackground: () => (
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.headerView, { opacity }]}
      ></Animated.View>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => {
          Share.share({
            title: product?.name,
            message: product ? product.description : '',
          });
        }}
      >
        <Ionicons name="md-share" size={24} />
      </TouchableOpacity>
    ),
  });

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const results = await ProductService.getProduct(productId);
      setProduct(results.product);
      setRelatedProducts(results.relatedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  if (isLoading || !product) {
    return <ProductSkeleton />;
  }

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: animation } } }],
        { useNativeDriver: true }
      )}
    >
      <ProductInfo product={product} />
      <ProductAction />
      <ProductRelated products={relatedProducts} />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#fff',
  },
  headerRight: {
    paddingHorizontal: 15,
  },
});
