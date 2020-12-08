import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { OrderService } from '@/services';
import { Order } from '@/types';
import { OrderList, OrderListSkeleton } from '@/components/orders';
import { ErrorMessage } from '@/components/ui';

const OrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const results = await OrderService.getOrders();
        setOrders(results.orders);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <OrderListSkeleton />;
  }

  return (
    <View style={styles.container}>
      <OrderList orders={orders} />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
