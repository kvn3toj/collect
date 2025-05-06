import { api } from './api';
import { CartItem, Product } from '../types/product.types';

class CartService {
  /**
   * Obtiene los items del carrito del usuario
   */
  async getCart(): Promise<CartItem[]> {
    try {
      const response = await api.get('/api/cart');
      
      // Validar y transformar datos para asegurar consistencia
      const validatedCartItems = (response.data || []).map((item: any): CartItem => {
        // Asegurar que item.product existe
        if (!item.product) {
          console.warn(`⚠️ CartItem sin producto (id: ${item.productId}). Creando objeto seguro.`);
          
          // Crear un objeto producto seguro con valores predeterminados
          const safeProduct: Product = {
            id: item.productId || 'unknown-id',
            name: 'Producto no disponible',
            price: item.totalPrice / (item.quantity || 1) || 0,
            images: ['/assets/placeholder-product.svg'],
            // Campos obligatorios con valores predeterminados
            codigo: '',
            nombre: 'Producto no disponible',
            description: '',
            descripcion: '',
            shortDescription: '',
            descripcionCorta: '',
            precio: 0,
            imagenesPrincipales: [],
            imagenesDetalle: [],
            category: '',
            tipoJoya: '',
            tipoMetal: null,
            stock: 0,
            enStock: false,
            destacado: false,
            tags: [],
            slug: '',
            specifications: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          // Devolver un objeto CartItem seguro
          return {
            productId: item.productId || 'unknown-id',
            product: safeProduct,
            quantity: item.quantity || 1,
            customizations: item.customizations || {},
            totalPrice: item.totalPrice || (safeProduct.price * (item.quantity || 1)),
          };
        }
        
        // Si el producto existe pero tiene campos faltantes, los completamos
        const product = { ...item.product };
        const isIncomplete = !product.images || !product.price || 
                            !product.stock || !product.createdAt || !product.updatedAt;
        
        if (isIncomplete) {
          console.warn(`⚠️ Producto incompleto en el carrito (id: ${product.id || item.productId}). Completando campos faltantes.`);
          
          // Completar campos faltantes con valores predeterminados
          product.images = product.images || product.imagenesPrincipales || ['/assets/placeholder-product.svg'];
          product.price = product.price || product.precio || (item.totalPrice / (item.quantity || 1)) || 0;
          product.stock = typeof product.stock === 'number' ? product.stock : (product.enStock ? 10 : 0);
          product.createdAt = product.createdAt || new Date().toISOString();
          product.updatedAt = product.updatedAt || new Date().toISOString();
        }
        
        // Devolver el item con el producto normalizado
        return {
          productId: item.productId,
          product,
          quantity: item.quantity,
          customizations: item.customizations || {},
          totalPrice: item.totalPrice || (product.price * item.quantity),
        };
      });
      
      return validatedCartItems;
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
      const response = await api.post('/api/cart', {
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