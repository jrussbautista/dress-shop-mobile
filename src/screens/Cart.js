import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '~/store';
import { CartList } from '~/components/Cart/CartList';
import { CartSubTotal, CartCheckOut } from '~/components/Cart';

const Cart = ({ navigation }) => {
  const { carts } = useCart();

  if (carts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}> Your Cart is empty :( </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.btnText}> Go Shop Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Your Cart </Text>
      <CartList carts={carts} />
      <View style={styles.bottomContainer}>
        <CartSubTotal />
        <CartCheckOut />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
  },
  btn: {
    backgroundColor: '#3d3d3d',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: '#fff',
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  bottomContainer: {
    alignItems: 'flex-end',
  },
});
