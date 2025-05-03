import api from './api';
import { Product, ProductFilter, ProductReview, Category, Metal, JewelryType } from '../types/product.types';

interface ProductsResponse {
  products: Product[];
  total: number;
}

export const productService = {
  /**
   * Obtiene todos los productos con filtros opcionales
   */
  getAllProducts: async (filters?: ProductFilter): Promise<ProductsResponse> => {
    const response = await api.get<Product[] | ProductsResponse>('products', { params: filters });
    if (Array.isArray(response.data)) {
      return {
        products: response.data,
        total: response.data.length
      };
    }
    return response.data as ProductsResponse;
  },
  
  /**
   * Obtiene un producto por su ID
   */
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`products/${id}`);
    return response.data;
  },
  
  /**
   * Obtiene productos relacionados a un producto específico
   */
  getRelatedProducts: async (id: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`products/${id}/related`);
    return response.data;
  },
  
  /**
   * Crea un nuevo producto
   */
  createProduct: async (productData: FormData): Promise<Product> => {
    const response = await api.post<Product>('products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  /**
   * Actualiza un producto existente
   */
  updateProduct: async (id: string, productData: FormData): Promise<Product> => {
    const response = await api.put<Product>(`products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  /**
   * Elimina un producto
   */
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`products/${id}`);
  },
  
  /**
   * Obtiene todas las categorías de productos
   */
  getProductCategories: async (): Promise<string[]> => {
    const response = await api.get<Category[]>('categories');
    return response.data.map((category: Category) => category.id);
  },
  
  /**
   * Obtiene todos los tipos de metales disponibles
   */
  getProductMetals: async (): Promise<string[]> => {
    const response = await api.get<Metal[]>('metals');
    return response.data.map((metal: Metal) => metal.id);
  },

  /**
   * Obtiene todos los tipos de joyería
   */
  getJewelryTypes: async (): Promise<string[]> => {
    const response = await api.get<JewelryType[]>('jewelry_types');
    return response.data.map((type: JewelryType) => type.id);
  },
  
  /**
   * Obtiene las reseñas de un producto
   */
  getProductReviews: async (productId: string): Promise<ProductReview[]> => {
    const response = await api.get<ProductReview[]>(`products/${productId}/reviews`);
    return response.data;
  },
  
  /**
   * Añade una reseña a un producto
   */
  addProductReview: async (
    productId: string, 
    review: Omit<ProductReview, 'id' | 'productId' | 'userId' | 'userName' | 'createdAt'>
  ): Promise<ProductReview> => {
    const response = await api.post<ProductReview>(`products/${productId}/reviews`, review);
    return response.data;
  },
};