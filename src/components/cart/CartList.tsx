import { useCart } from '@/contexts';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import CartItem from './CartItem';

const CartList: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={(item) => <CartItem cartItem={item.item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default CartList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});
