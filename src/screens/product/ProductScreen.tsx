import CartButton from '@/components/cart/CartButton';
import {
  ProductInputQuantity,
  ProductInfo,
  ProductRelated,
  ProductSkeleton,
} from '@/components/product';
import { Button, ErrorMessage } from '@/components/ui';
import { WishlistButton } from '@/components/wishlist';
import { useAuth, useCart, useToast } from '@/contexts';
import navigationNames from '@/navigation/navigationNames';
import { ProductService } from '@/services';
import { Product, Products } from '@/types';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Animated, StyleSheet, View, StatusBar } from 'react-native';

interface RouteParams {
  id: string;
}

const ProductScreen = () => {
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const { addCartItem } = useCart();

  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const navigation = useNavigation();

  const productId = route.params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const animation = new Animated.Value(0);
  const opacity = animation.interpolate({
    inputRange: [0, 1, 200],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const results = await ProductService.getProduct(productId);
        setProduct(results.product);
        setRelatedProducts(results.relatedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product ? product.name : '',
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTitleStyle: { opacity },
      headerBackground: () => (
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.headerView, { opacity }]}
        />
      ),
      headerRight: () => <CartButton />,
    });
  }, [navigation, product, isLoading, relatedProducts]);

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
      showToast('error', 'Please login first');
      navigation.navigate(navigationNames.rootAuthScreen);
      return;
    }
    if (!product) return;
    try {
      await addCartItem(product, qty);
      showToast('success', 'Successfully added to your cart');
    } catch (error) {
      showToast('error', 'Error in adding cart. Please try again later');
    }
  };

  if (isLoading || !product) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <ErrorMessage message="The product may not exist or we've encounter an error. Please try again" />
    );
  }

  return (
    <>
      <StatusBar />
      <View style={styles.main}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animation } } }],
            { useNativeDriver: true }
          )}
        >
          <ProductInfo product={product} />
          <ProductRelated products={relatedProducts} />
        </Animated.ScrollView>
        <View style={styles.bottom}>
          <ProductInputQuantity
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
          <WishlistButton productId={product._id} />
        </View>
      </View>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#fff',
  },
  headerRight: {
    paddingHorizontal: 15,
  },

  btnAddCart: {
    marginHorizontal: 15,
    borderRadius: 50,
    width: 150,
  },
  main: {
    flex: 1,
  },
  bottom: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    paddingHorizontal: 15,
  },
});
