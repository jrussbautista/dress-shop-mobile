import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Cart } from '@/types';
import { Button, InputQuantity } from '@/components';
import navigationNames from '@/navigation/navigationNames';
import { useCart } from '@/store';
import { colors } from '@/theme';
import { CartService } from '@/services';

interface Props {
  cart: Cart;
}

const CartItem: React.FC<Props> = ({ cart }) => {
  const navigation = useNavigation();

  const { removeCart, updateCartQuantity } = useCart();

  const [qty, setQty] = useState(cart.quantity);
  const [updating, setUpdating] = useState(false);

  const handleNavigate = (id: string) => {
    navigation.navigate(navigationNames.productCartScreenTab, { id });
  };

  const handleRemoveCart = async (id: string) => {
    try {
      setUpdating(true);
      await CartService.removeCart(id);
      removeCart(id);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUpdating(false);
    }
  };

  const updateAsyncCartQty = async (quantity: number) => {
    try {
      await CartService.updateCart(cart._id, quantity);
      updateCartQuantity(cart._id, quantity);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleButtonClickQty = (method: string) => {
    if (method === 'add') {
      if (qty === 10) {
        // show error max 10 qty only
        Alert.alert('Error', 'Up to 10 max only');
        return;
      }
      setQty((qty) => qty + 1);
      updateAsyncCartQty(qty + 1);
    } else if (method === 'sub') {
      if (qty > 1) {
        setQty((qty) => qty - 1);
        updateAsyncCartQty(qty - 1);
      }
    }
  };

  const handleChangeQty = (value: number) => {
    setQty(value);
    updateAsyncCartQty(value);
  };

  return (
    <View key={cart._id} style={styles.cartItem}>
      <TouchableOpacity onPress={() => handleNavigate(cart.product._id)}>
        <Image source={{ uri: cart.product.imageURL }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <TouchableOpacity onPress={() => handleNavigate(cart.product._id)}>
          <Text style={styles.title}> {cart.product.name} </Text>
        </TouchableOpacity>
        <Text style={styles.price}> P{cart.product.price}</Text>
        <Text> x {cart.quantity}</Text>
        <View style={styles.inputQty}>
          <InputQuantity
            value={qty}
            handleButtonPressed={handleButtonClickQty}
            onChangeText={handleChangeQty}
            disabled={updating}
          />
        </View>
        <Button
          title="Remove"
          style={styles.btn}
          onPress={() => handleRemoveCart(cart._id)}
        />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  image: {
    width: 140,
    height: 140,
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
    width: 100,
    fontSize: 14,
    height: 40,
    marginVertical: 10,
  },
  inputQty: {
    marginTop: 10,
  },
});
