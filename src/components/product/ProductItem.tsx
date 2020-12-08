import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Product } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme';

interface Props {
  product: Product;
  routeName: string;
}

const ProductItem: React.FC<Props> = ({ product, routeName }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate(routeName, {
      id: product._id,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.list}>
      <Image source={{ uri: product.imageURL }} style={styles.listImg} />
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

export default ProductItem;

let width = Dimensions.get('screen').width / 2 - 22;

const styles = StyleSheet.create({
  list: {
    width: width,
    marginBottom: 15,
  },
  listImg: {
    width: width,
    height: width,
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
});
