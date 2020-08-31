import { Order } from '@/types';
import apiClient from '@/utils/apiClient';
import catchError from '@/utils/catchError';

interface OrdersData {
  orders: Order[];
}
const getOrders = async (): Promise<OrdersData> => {
  try {
    const { data } = await apiClient.get('/orders');
    const ordersData: OrdersData = {
      orders: data.data.orders,
    };
    return ordersData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};
export const OrderService = {
  getOrders,
};
