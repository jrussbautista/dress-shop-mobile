import navigationNames from '@/navigation/navigationNames';
import { colors } from '@/theme';
import { Order } from '@/types';
import formatPrice from '@/utils/formatPrice';
import { formatDate } from '@/utils/helpers';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Props {
  order: Order;
}

const OrderItem = ({ order }: Props) => {
  const navigation = useNavigation();

  const formattedDate = formatDate(order.createdAt);

  const renderOrderProducts = () => {
    return order.products.map((order) => (
      <TouchableOpacity
        style={styles.productInfo}
        key={order.product._id}
        onPress={() =>
          navigation.navigate(navigationNames.productScreen, {
            id: order.product._id,
          })
        }
      >
        <Image style={styles.image} source={{ uri: order.product.imageURL }} />
        <View style={styles.main}>
          <Text style={styles.name}>{order.product.name}</Text>
          <Text style={styles.qty}>X{order.quantity}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(order.product.price)}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.itemList}>
      <Text style={styles.date}> Date Ordered: {formattedDate}</Text>
      <View>{renderOrderProducts()}</View>
      <View style={styles.bottom}>
        <Text>Total:</Text>
        <Text style={styles.total}> {order.total} </Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  itemList: {
    paddingVertical: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  date: {
    color: colors.gray,
  },
  image: {
    width: 100,
    height: 100,
  },
  main: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 15,
  },
  qty: {
    color: colors.gray,
    fontSize: 13,
  },
  productInfo: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  total: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  price: {
    color: colors.primary,
  },
});
