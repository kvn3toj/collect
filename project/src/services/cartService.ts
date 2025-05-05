import { api } from './api';
import { CartItem, Product } from '../types/product.types';

class CartService {
  /**
   * Obtiene los items del carrito del usuario
   */
  async getCart(): Promise<CartItem[]> {
    try {
      const response = await api.get('/api/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  }

  /**
   * Añade un item al carrito
   */
  async addToCart(productId: string, quantity: number, customizations?: Record<string, string>): Promise<CartItem> {
    try {
      const response = await api.post('/api/cart/add', {
        productId,
        quantity,
        customizations
      });
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   */
  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    try {
      const response = await api.patch(`/api/cart/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  /**
   * Elimina un item del carrito
   */
  async removeCartItem(itemId: string): Promise<void> {
    try {
      await api.delete(`/api/cart/${itemId}`);
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  }

  /**
   * Vacía el carrito
   */
  async clearCart(): Promise<void> {
    try {
      const cart = await this.getCart();
      const removePromises = cart.map(item => this.removeCartItem(item.productId));
      await Promise.all(removePromises);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}

export const cartService = new CartService();
export default cartService; 