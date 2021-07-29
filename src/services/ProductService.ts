import { Product } from '@/types';
import apiClient from '@/utils/apiClient';
import catchError from '@/utils/catchError';

interface ProductsData {
  products: Product[];
  total: number;
}

interface ProductData {
  product: Product;
  relatedProducts: Product[];
}

type ProductPayload = any;

const getProducts = async (params?: ProductPayload): Promise<ProductsData> => {
  try {
    const url = `/products`;
    const payload = { params };
    const { data } = await apiClient.get(url, payload);
    const productsData: ProductsData = {
      products: data.data.products,
      total: data.data.total,
    };
    return productsData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const getProduct = async (id: string): Promise<ProductData> => {
  try {
    const url = `/products/${id}`;
    const { data } = await apiClient.get(url);

    const productData: ProductData = {
      product: data.data.product,
      relatedProducts: data.data.relatedProducts,
    };

    return productData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const ProductService = {
  getProducts,
  getProduct,
};
