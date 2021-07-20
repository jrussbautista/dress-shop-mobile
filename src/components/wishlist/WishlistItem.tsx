import { useToast, useWishlist } from '@/contexts';
import navigationNames from '@/navigation/navigationNames';
import { colors } from '@/theme';
import { WishlistItem as Item } from '@/types/Wishlist';
import formatPrice from '@/utils/formatPrice';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface Props {
  wishlistItem: Item;
}

const WishlistItem: React.FC<Props> = ({ wishlistItem }) => {
  const { removeWishlistItem } = useWishlist();
  const { showToast } = useToast();

  const navigation = useNavigation();

  const handleRemoveWishlistItem = async () => {
    try {
      await removeWishlistItem(wishlistItem.product._id);
    } catch (error) {
      showToast(
        'error',
        "Sorry! We were'nt able to remove your wishlist item right now. Please try again later."
      );
    }
  };

  const handleNavigate = () => {
    navigation.navigate(navigationNames.productScreen, {
      id: wishlistItem.product._id,
    });
  };

  return (
    <View style={styles.wishlistItem}>
      <TouchableOpacity onPress={handleNavigate}>
        <Image
          source={{ uri: wishlistItem.product.imageURL }}
          style={styles.image}
        />
      </TouchableOpacity>

      <View style={styles.info}>
        <TouchableOpacity onPress={handleNavigate}>
          <Text style={styles.name}>{wishlistItem.product.name}</Text>
          <Text style={styles.price}>
            {formatPrice(wishlistItem.product.price)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={handleRemoveWishlistItem}>
          <Feather name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistItem;

const styles = StyleSheet.create({
  wishlistItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  info: {
    marginRight: 15,
    flex: 1,
    padding: 10,
  },
  price: {
    color: colors.red,
    fontWeight: '700',
  },
  name: {
    marginBottom: 5,
  },
  actionContainer: {
    padding: 10,
  },
});
