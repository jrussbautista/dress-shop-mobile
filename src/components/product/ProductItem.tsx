import { WishlistButton } from '@/components/wishlist';
import navigationNames from '@/navigation/navigationNames';
import { colors } from '@/theme';
import { Product } from '@/types';
import formatPrice from '@/utils/formatPrice';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate(navigationNames.productScreen, {
      id: product._id,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.list}>
      <View style={styles.listContent}>
        <Image source={{ uri: product.imageURL }} style={styles.listImg} />
        <View style={styles.wishlistButtonContainer}>
          <WishlistButton productId={product._id} />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>
          </View>
          <View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  list: {
    width: '50%',
    marginBottom: 15,
  },
  listContent: {
    marginHorizontal: 5,
  },
  listImg: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 5,
  },
  name: {
    fontSize: 14,
    height: 40,
  },
  price: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '700',
  },
  wishlistButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
