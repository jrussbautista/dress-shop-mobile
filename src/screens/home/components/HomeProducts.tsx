import { Heading, ProductList } from '@/components';
import navigationNames from '@/navigation/navigationNames';
import { Product } from '@/types';
import React from 'react';

interface Props {
  products: Product[];
}

export const HomeProducts = ({ products }: Props) => {
  return (
    <>
      <Heading title="Product Overview" />
      <ProductList
        routeName={navigationNames.productHomeScreenTab}
        products={products}
      />
    </>
  );
};
