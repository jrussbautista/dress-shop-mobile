import { CartList, CartSubTotal } from '@/components/cart';
import { Button } from '@/components/ui';
import { useCart, useAuth } from '@/contexts';
import navigationNames from '@/navigation/navigationNames';
import { colors } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartScreen = () => {
  const { isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const navigation = useNavigation();

  if (!isAuthenticated) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.emptyText}> Please login to see your cart </Text>
        <Button
          title="Go to Login"
          style={styles.btn}
          onPress={() => navigation.navigate(navigationNames.rootAuthScreen)}
        />
      </View>
    );
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.emptyText}> Your Cart is empty :( </Text>
        <Button
          style={styles.btn}
          title="Go Shop Now"
          onPress={() => navigation.navigate(navigationNames.homeTab)}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cartList}>
        <CartList />
      </View>
      <View style={styles.bottomContainer}>
        <CartSubTotal />
        <Button title="Check Out" style={styles.btn} />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  cartList: {
    flex: 4,
  },
  bottomContainer: {
    alignItems: 'flex-end',
    flex: 0.6,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderColor: colors.lightGray,
    borderTopWidth: 1,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 200,
  },
});
