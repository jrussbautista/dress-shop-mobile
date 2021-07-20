import { useCart } from '@/contexts';
import navigationNames from '@/navigation/navigationNames';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const CartButton = () => {
  const { cartItems } = useCart();

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(navigationNames.cartScreen)}
    >
      <Ionicons name="ios-cart" size={24} color="black" />
      {cartItems.length > 0 && (
        <View style={styles.cartItemCount}>
          <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    position: 'relative',
  },
  cartItemCount: {
    height: 22,
    width: 22,
    backgroundColor: colors.red,
    borderRadius: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -8,
    right: 4,
  },
  cartItemCountText: {
    color: '#fff',
    fontSize: 12,
  },
});
