import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCart } from '../../store';
import colors from '../../utils/colors';
import calculateCartTotal from '../../utils/carts';

export const CartSubTotal = () => {
  const { carts } = useCart();
  const { cartTotal } = calculateCartTotal(carts);

  return (
    <View style={styles.subTotal}>
      <Text> Sub Total: </Text>
      <Text style={styles.price}> P{cartTotal} </Text>
    </View>
  );
};

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
