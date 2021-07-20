import { useWishlist } from '@/contexts';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import WishlistItem from './WishlistItem';

const WishlistItems = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Wishlist is empty. :(</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={wishlistItems}
      renderItem={(item) => <WishlistItem wishlistItem={item.item} />}
      keyExtractor={(item) => item._id}
    />
  );
};

export default WishlistItems;

const styles = StyleSheet.create({
  emptyContainer: {
    paddingVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: '700',
  },
});
