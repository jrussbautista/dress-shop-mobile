import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import colors from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Product', { id: product._id })}
      style={styles.list}
    >
      <View style={styles.imgWrapper}>
        <Image source={{ uri: product.imageURL }} style={styles.listImg} />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
        </View>
        <View>
          <Text style={styles.price}>P{product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductList = ({ products }) => {
  return (
    <View style={styles.container}>
      {products.map(product => (
        <ProductItem product={product} key={product._id} />
      ))}
    </View>
  );
};

export default ProductList;

let width = Dimensions.get('screen').width / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: 15
  },
  list: { width: width - 22, marginBottom: 15 },
  imgWrapper: {
    width: width - 22,
    height: width - 22
  },
  listImg: {
    width: width - 22,
    height: '100%'
  },
  info: {
    padding: 5
  },
  name: {
    fontSize: 15,
    height: 40
  },
  price: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700'
  }
});
