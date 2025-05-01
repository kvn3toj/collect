import api from './api';
import { Product, ProductFilter, ProductReview } from '../types/product.types';

export const productService = {
  getAllProducts: async (filters?: ProductFilter): Promise<{ products: Product[]; total: number }> => {
    const response = await api.get('products', { params: filters });
    if (Array.isArray(response.data)) {
      return {
        products: response.data,
        total: response.data.length
      };
    }
    return response.data;
  },
  
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`products/${id}`);
    return response.data;
  },
  
  getRelatedProducts: async (id: string): Promise<Product[]> => {
    const response = await api.get(`products/${id}/related`);
    return response.data;
  },
  
  createProduct: async (productData: FormData): Promise<Product> => {
    const response = await api.post('products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  updateProduct: async (id: string, productData: FormData): Promise<Product> => {
    const response = await api.put(`products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`products/${id}`);
  },
  
  getProductCategories: async (): Promise<string[]> => {
    const response = await api.get('categories');
    return response.data.map((cat: any) => cat.id);
  },
  
  getProductMetals: async (): Promise<string[]> => {
    const response = await api.get('metals');
    return response.data.map((metal: any) => metal.id);
  },

  getJewelryTypes: async (): Promise<string[]> => {
    const response = await api.get('jewelry_types');
    return response.data.map((type: any) => type.id);
  },
  
  getProductReviews: async (productId: string): Promise<ProductReview[]> => {
    const response = await api.get(`products/${productId}/reviews`);
    return response.data;
  },
  
  addProductReview: async (productId: string, review: Omit<ProductReview, 'id' | 'productId' | 'userId' | 'userName' | 'createdAt'>): Promise<ProductReview> => {
    const response = await api.post(`products/${productId}/reviews`, review);
    return response.data;
  },
};