import { useAuth, useToast, useWishlist } from '@/contexts';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Props {
  productId: string;
}

const WishlistButton: React.FC<Props> = ({ productId }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const { wishlistItems, removeWishlistItem, addWishlistItem } = useWishlist();

  const isProductInWishlist = wishlistItems.some(
    (wishlistItem) => wishlistItem.product._id === productId
  );

  const handlePress = async (e: GestureResponderEvent) => {
    try {
      e.preventDefault();
      if (!isAuthenticated) {
        return showToast('error', 'Please log in first.');
      }

      if (isProductInWishlist) {
        await removeWishlistItem(productId);
      } else {
        await addWishlistItem(productId);
      }
    } catch (error) {
      showToast('error', 'Something error occurred. Please try again later.');
    }
  };

  return (
    <TouchableOpacity style={styles.wishlistButton} onPress={handlePress}>
      <Ionicons
        name={isProductInWishlist ? 'ios-heart-sharp' : 'ios-heart-outline'}
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
};

export default WishlistButton;

const styles = StyleSheet.create({
  wishlistButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
