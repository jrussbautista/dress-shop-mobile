import { ProductInputQuantity } from '@/components/product';
import { Button } from '@/components/ui';
import { useCart } from '@/contexts';
import navigationNames from '@/navigation/navigationNames';
import { colors } from '@/theme';
import { CartItem as CartItemType } from '@/types';
import formatPrice from '@/utils/formatPrice';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

interface Props {
  cartItem: CartItemType;
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const navigation = useNavigation();

  const { removeCartItem, updateCartItemQty } = useCart();

  const [qty, setQty] = useState(cartItem.quantity);
  const [updating, setUpdating] = useState(false);

  const handleNavigate = (id: string) => {
    navigation.navigate(navigationNames.productScreen, { id });
  };

  const handleRemoveCart = async (id: string) => {
    try {
      setUpdating(true);
      await removeCartItem(cartItem);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const updateAsyncCartQty = async (quantity: number) => {
    try {
      await updateCartItemQty(cartItem, quantity);
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
    <View key={cartItem._id} style={styles.cartItem}>
      <TouchableOpacity onPress={() => handleNavigate(cartItem.product._id)}>
        <Image
          source={{ uri: cartItem.product.imageURL }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <TouchableOpacity onPress={() => handleNavigate(cartItem.product._id)}>
          <Text style={styles.title}> {cartItem.product.name} </Text>
        </TouchableOpacity>
        <Text style={styles.price}>{formatPrice(cartItem.product.price)}</Text>
        <Text> x {cartItem.quantity}</Text>
        <View style={styles.inputQty}>
          <ProductInputQuantity
            value={qty}
            handleButtonPressed={handleButtonClickQty}
            onChangeText={handleChangeQty}
            disabled={updating}
          />
        </View>
        <Button
          title="Remove"
          style={styles.btn}
          onPress={() => handleRemoveCart(cartItem._id)}
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
