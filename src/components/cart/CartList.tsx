import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CartItem from './CartItem';
import { useCart } from '@/contexts';

const CartList: React.FC = () => {
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

export default CartList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});
