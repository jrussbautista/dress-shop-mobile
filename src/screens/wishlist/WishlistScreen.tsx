import { CartButton } from '@/components/cart';
import { WishlistItems } from '@/components/wishlist';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const WishlistScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartButton />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <WishlistItems />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
