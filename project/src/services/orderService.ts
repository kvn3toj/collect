import { api } from './api';
import { Order, OrderSummary, CreateOrderData } from '../types/order.types';
import { PackagingOption, InsuranceOption } from '../types/premium.types';

class OrderService {
  /**
   * Crea un nuevo pedido
   */
  async createOrder(data: CreateOrderData): Promise<Order> {
    try {
      const response = await api.post('/api/orders/create', data);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Obtiene la lista de pedidos del usuario
   */
  async getMyOrders(): Promise<OrderSummary[]> {
    try {
      const response = await api.get('/api/orders/mine');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  /**
   * Obtiene un pedido específico por su ID
   */
  async getOrderById(orderId: string): Promise<Order> {
    try {
      const response = await api.get(`/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene las opciones de packaging disponibles
   */
  async getPackagingOptions(): Promise<PackagingOption[]> {
    try {
      const response = await api.get('/api/orders/packaging-options');
      return response.data;
    } catch (error) {
      console.error('Error fetching packaging options:', error);
      throw error;
    }
  }

  /**
   * Obtiene las opciones de seguro disponibles
   */
  async getInsuranceOptions(): Promise<InsuranceOption[]> {
    try {
      const response = await api.get('/api/orders/insurance-options');
      return response.data;
    } catch (error) {
      console.error('Error fetching insurance options:', error);
      throw error;
    }
  }
}

export const orderService = new OrderService();
export default orderService; 