import { Button } from '@/components/ui';
import navigationNames from '@/navigation/navigationNames';
import { Order } from '@/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import OrderItem from './OrderItem';

interface Props {
  orders: Order[];
}

const OrderList = ({ orders }: Props) => {
  const navigation = useNavigation();

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}> You have no orders yet.</Text>
        <Button
          title="Go Shop Now"
          style={styles.btnGo}
          onPress={() => navigation.navigate(navigationNames.homeTab)}
        />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={(item) => <OrderItem order={item.item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
  },
  btnGo: {
    marginTop: 20,
  },
  container: {
    paddingVertical: 20,
  },
});
