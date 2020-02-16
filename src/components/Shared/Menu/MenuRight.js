import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../store';

const MenuRight = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleNavigate = type => {
    // if (user) {
    //   navigation.navigate(type);
    // } else {
    navigation.navigate('Login');
    // }
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
  }
});
