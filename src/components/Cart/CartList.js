import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';
import { useCart } from '../../store';
import { useNavigation } from '@react-navigation/native';

export const CartList = ({ carts }) => {
  const navigation = useNavigation();
  const { removeCart } = useCart();

  const handleNavigate = (id) => {
    navigation.navigate('Product', { id });
  };

  return (
    <View style={styles.container}>
      {carts.map((cart) => (
        <View key={cart._id} style={styles.cartItem}>
          <TouchableOpacity onPress={() => handleNavigate(cart.product._id)}>
            <Image
              source={{ uri: cart.product.imageURL }}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.info}>
            <TouchableOpacity onPress={() => handleNavigate(cart.product._id)}>
              <Text style={styles.title}> {cart.product.name} </Text>
            </TouchableOpacity>
            <Text style={styles.price}> P{cart.product.price}</Text>
            <Text> x {cart.quantity}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => removeCart(cart._id)}
            >
              <Text style={styles.btnText}> Remove </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  image: {
    width: 120,
    height: 120,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  price: {
    color: colors.primary,
    fontWeight: '700',
  },
  btn: {
    backgroundColor: '#3d3d3d',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: '#fff',
  },
});
