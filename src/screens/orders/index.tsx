import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { OrderService } from '@/services';
import { Order } from '@/types';
import { OrderList, OrderListSkeleton } from './components';
import { ErrorMessage } from '@/components';

export const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchOrders = async () => {
    try {
      setIsFetching(true);
      const results = await OrderService.getOrders();
      setOrders(results.orders);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isFetching) {
    return <OrderListSkeleton />;
  }

  return (
    <View style={styles.container}>
      <OrderList orders={orders} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
