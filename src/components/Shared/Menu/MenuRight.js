import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth, useCart } from '../../../store';

const MenuRight = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { carts } = useCart();

  const handleNavigate = type => {
    if (user) {
      navigation.navigate(type);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconList}>
        <Ionicons name="ios-search" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconList}
        onPress={handleNavigate.bind(this, 'Cart')}
      >
        <Ionicons name="md-cart" size={30} />
        {carts.length > 0 && (
          <View style={styles.cartContainer}>
            <Text style={styles.cartNum}>{carts.length}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconList}
        onPress={handleNavigate.bind(this, 'Account')}
      >
        <MaterialCommunityIcons name="account" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default MenuRight;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row'
  },
  iconList: {
    paddingHorizontal: 10
  },
  cartContainer: {
    position: 'absolute',
    top: -6,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartNum: {
    color: '#fff',
    fontSize: 13
  }
});
