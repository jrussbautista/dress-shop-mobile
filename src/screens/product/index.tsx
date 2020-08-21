import React, { useState, useEffect } from 'react';
import {
  Animated,
  StyleSheet,
  Share,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { ProductService, CartService } from '@/services';
import { Product, Products } from '@/types';
import { ProductInfo, ProductRelated, ProductSkeleton } from './components';
import { Ionicons } from '@expo/vector-icons';
import { InputQuantity, Button } from '@/components';
import { useAuth, useCart } from '@/store';
import navigationNames from '@/navigation/navigationNames';

interface RouteParams {
  id: string;
}

export const ProductScreen = () => {
  const { isAuthenticated } = useAuth();
  const { addCart } = useCart();

  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const navigation = useNavigation();

  const productId = route.params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(1);

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

  useEffect(() => {
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
    fetchProduct();
  }, [productId]);

  const handleButtonClickQty = (method: string) => {
    if (method === 'add') {
      if (qty === 10) {
        // show error max 10 qty only
        console.log('10 qty max');
        return;
      }
      setQty((qty) => qty + 1);
    } else if (method === 'sub') {
      if (qty > 1) {
        setQty((qty) => qty - 1);
      }
    }
  };

  const handleChangeQty = (value: number) => {
    setQty(value);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigation.navigate(navigationNames.rootAuthScreen);
      return;
    }

    if (!product) return;

    try {
      const cart = {
        quantity: qty,
        product,
      };
      await CartService.addCart(qty, product._id);
      addCart(cart);
      Alert.alert('Success', 'Successfully added to your cart');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

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
      <View style={styles.productAction}>
        <InputQuantity
          value={qty}
          handleButtonPressed={handleButtonClickQty}
          onChangeText={handleChangeQty}
        />
        <Button
          title="Add to Cart"
          type="primary"
          style={styles.btnAddCart}
          onPress={handleAddToCart}
        />
      </View>
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
  productAction: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  btnAddCart: {
    marginHorizontal: 10,
    borderRadius: 50,
    width: 150,
  },
});
