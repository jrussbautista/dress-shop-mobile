import React from 'react';
import { Heading, ProductList } from '@/components';
import { Product } from '@/types';

interface Props {
  products: Product[];
}

export const HomeProducts = ({ products }: Props) => {
  return (
    <>
      <Heading title="Product Overview" />
      <ProductList products={products} />
    </>
  );
};
