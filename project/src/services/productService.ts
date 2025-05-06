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
    const response = await api.get<Product[] | ProductsResponse>('/api/products', { params: filters });
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
    const response = await api.get<Product>(`/api/products/${id}`);
    return response.data;
  },
  
  /**
   * Obtiene productos relacionados a un producto específico
   */
  getRelatedProducts: async (id: string): Promise<Product[]> => {
    // Para desarrollo con json-server, retorna algunos productos aleatorios
    const allProducts = await productService.getAllProducts();
    return allProducts.products.slice(0, 4);
    
    // Código original para producción
    // const response = await api.get<Product[]>(`/api/products/${id}/related`);
    // return response.data;
  },
  
  /**
   * Crea un nuevo producto
   */
  createProduct: async (productData: FormData): Promise<Product> => {
    const response = await api.post<Product>('/api/products', productData, {
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
    const response = await api.put<Product>(`/api/products/${id}`, productData, {
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
    await api.delete(`/api/products/${id}`);
  },
  
  /**
   * Obtiene todas las categorías de productos
   */
  getProductCategories: async (): Promise<string[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data.map((category: Category) => category.id);
  },
  
  /**
   * Obtiene todos los tipos de metales disponibles
   */
  getProductMetals: async (): Promise<string[]> => {
    // Para desarrollo con json-server, retornamos hardcoded
    return ["ORO_18K", "ORO_BLANCO_18K", "PLATA", "PLATINO"];
    
    // Código original para producción
    // const response = await api.get<Metal[]>('/api/metals');
    // return response.data.map((metal: Metal) => metal.id);
  },

  /**
   * Obtiene todos los tipos de joyería
   */
  getJewelryTypes: async (): Promise<string[]> => {
    // Para desarrollo con json-server, retornamos hardcoded
    return ["LOTE_GEMAS", "ANILLO", "COLLAR", "PULSERA", "ARETES", "COLGANTE"];
    
    // Código original para producción
    // const response = await api.get<JewelryType[]>('/api/jewelry_types');
    // return response.data.map((type: JewelryType) => type.id);
  },
  
  /**
   * Obtiene las reseñas de un producto
   */
  getProductReviews: async (productId: string): Promise<ProductReview[]> => {
    // Para desarrollo con json-server, retornamos un array vacío
    return [];
    
    // Código original para producción
    // const response = await api.get<ProductReview[]>(`/api/products/${productId}/reviews`);
    // return response.data;
  },
  
  /**
   * Añade una reseña a un producto
   */
  addProductReview: async (
    productId: string, 
    review: Omit<ProductReview, 'id' | 'productId' | 'userId' | 'userName' | 'createdAt'>
  ): Promise<ProductReview> => {
    // Para desarrollo con json-server, creamos una respuesta mock
    const mockReview: ProductReview = {
      id: 'review-' + Date.now(),
      productId,
      userId: 'user-1',
      userName: 'Usuario de Prueba',
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      createdAt: new Date().toISOString()
    };
    return mockReview;
    
    // Código original para producción
    // const response = await api.post<ProductReview>(`/api/products/${productId}/reviews`, review);
    // return response.data;
  },
};