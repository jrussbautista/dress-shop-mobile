import { PAGE_LIMIT } from '@/constants';
import { ProductService } from '@/services';
import { Products } from '@/types';
import { useState, useEffect } from 'react';

interface ProductsPayload {
  page?: number;
  keyword?: string;
}

export const useProducts = (productsPayload?: ProductsPayload) => {
  const [products, setProducts] = useState<Products>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadProducts({ page, ...productsPayload });
  }, []);

  const loadProducts = async (productPayload: ProductsPayload) => {
    try {
      setLoading(true);
      const payload = {
        ...productPayload,
        limit: PAGE_LIMIT,
      };
      const {
        products: fetchProducts,
        total,
      } = await ProductService.getProducts(payload);
      setProducts(fetchProducts);
      setTotal(total);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      if (!hasLoadMore) {
        return;
      }
      setIsLoadingMore(true);
      setPage((page) => page + 1);
      const payload = { page: page + 1, limit: PAGE_LIMIT };
      const { total, products: newProducts } = await ProductService.getProducts(
        payload
      );
      const isLoadMore = total <= newProducts.length;
      setProducts([...products, ...newProducts]);
      setHasLoadMore(isLoadMore);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const refresh = async () => {
    setPage(1);
    setHasLoadMore(true);
    setRefreshing(true);
    await loadProducts({ ...productsPayload, page: 1 });
    setRefreshing(false);
  };

  return {
    products,
    loading,
    refreshing,
    isLoadingMore,
    hasLoadMore,
    total,
    loadMore,
    refresh,
    loadProducts,
  };
};
