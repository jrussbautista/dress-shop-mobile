import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductService } from '@/services';
import { Product, Products } from '@/types';
import ProductInfo from './ProductInfo';
import ProductSkeleton from './ProductSkeleton';

export const ProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const productId = route.params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <ScrollView>
      <ProductInfo product={product} />
    </ScrollView>
  );
};
