import { useCart } from '@/contexts';
import { colors } from '@/theme';
import calculateCartTotal from '@/utils/cart';
import formatPrice from '@/utils/formatPrice';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartSubTotal = () => {
  const { cartItems } = useCart();
  const { cartTotal } = calculateCartTotal(cartItems);

  return (
    <View style={styles.subTotal}>
      <Text> Sub Total: </Text>
      <Text style={styles.price}>{formatPrice(cartTotal)} </Text>
    </View>
  );
};

export default CartSubTotal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  subTotal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontWeight: '700',
    color: colors.primary,
    fontSize: 16,
  },
});
