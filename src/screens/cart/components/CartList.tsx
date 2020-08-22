import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CartItem from './CartItem';
import { useCart } from '@/store';

export const CartList: React.FC = () => {
  const { carts } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={carts}
        renderItem={(item) => <CartItem cart={item.item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});
