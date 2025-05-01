import apiClient from './api';
import { ApiResponse, FilterOptions, Product, ProductFormData, SortOptions } from '../types';

/**
 * Servicio para gestionar productos
 */
export const productService = {
  /**
   * Obtener todos los productos con posibilidad de filtros y ordenación
   */
  getProducts: async (
    filters?: FilterOptions, 
    sort?: SortOptions, 
    page = 1, 
    limit = 12
  ): Promise<ApiResponse<{ items: Product[]; total: number; page: number; limit: number }>> => {
    // Construir los parámetros de la consulta
    const params = new URLSearchParams();
    
    // Agregar filtros si existen
    if (filters) {
      if (filters.type) params.append('type', filters.type);
      if (filters.priceMin) params.append('priceMin', filters.priceMin.toString());
      if (filters.priceMax) params.append('priceMax', filters.priceMax.toString());
      if (filters.featured !== undefined) params.append('featured', filters.featured.toString());
    }
    
    // Agregar ordenación si existe
    if (sort) {
      params.append('sortBy', sort.field);
      params.append('sortDirection', sort.direction);
    }
    
    // Agregar paginación
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await apiClient.get(`/products?${params.toString()}`);
    return response.data;
  },
  
  /**
   * Obtener productos destacados
   */
  getFeaturedProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await apiClient.get('/products/featured');
    return response.data;
  },
  
  /**
   * Obtener un producto por ID
   */
  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  
  /**
   * Obtener un producto por slug
   */
  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get(`/products/slug/${slug}`);
    return response.data;
  },
  
  /**
   * Crear un nuevo producto
   */
  createProduct: async (product: ProductFormData): Promise<ApiResponse<Product>> => {
    // Crear un FormData para enviar archivos
    const formData = new FormData();
    
    // Agregar los campos de texto
    formData.append('name', product.name);
    formData.append('codigo', product.codigo);
    formData.append('description', product.description);
    
    if (product.price !== null) {
      formData.append('price', product.price.toString());
    }
    
    if (product.discountPrice) {
      formData.append('discountPrice', product.discountPrice.toString());
    }
    
    formData.append('type', product.type);
    formData.append('featured', product.featured.toString());
    
    // Agregar campos opcionales si existen
    if (product.quilates) formData.append('quilates', product.quilates.toString());
    if (product.metal) formData.append('metal', product.metal);
    if (product.cut) formData.append('cut', product.cut);
    if (product.quality) formData.append('quality', product.quality);
    if (product.origin) formData.append('origin', product.origin);
    
    // Agregar imagen principal
    if (product.mainImage) {
      formData.append('mainImage', product.mainImage);
    }
    
    // Agregar imágenes de galería
    product.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    
    const response = await apiClient.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  /**
   * Actualizar un producto existente
   */
  updateProduct: async (id: string, product: ProductFormData): Promise<ApiResponse<Product>> => {
    // Crear un FormData para enviar archivos
    const formData = new FormData();
    
    // Agregar los campos de texto
    formData.append('name', product.name);
    formData.append('codigo', product.codigo);
    formData.append('description', product.description);
    
    if (product.price !== null) {
      formData.append('price', product.price.toString());
    }
    
    if (product.discountPrice) {
      formData.append('discountPrice', product.discountPrice.toString());
    }
    
    formData.append('type', product.type);
    formData.append('featured', product.featured.toString());
    
    // Agregar campos opcionales si existen
    if (product.quilates) formData.append('quilates', product.quilates.toString());
    if (product.metal) formData.append('metal', product.metal);
    if (product.cut) formData.append('cut', product.cut);
    if (product.quality) formData.append('quality', product.quality);
    if (product.origin) formData.append('origin', product.origin);
    
    // Agregar imagen principal si existe
    if (product.mainImage) {
      formData.append('mainImage', product.mainImage);
    }
    
    // Agregar imágenes de galería si existen
    product.images.forEach((image) => {
      formData.append('images', image);
    });
    
    const response = await apiClient.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  /**
   * Eliminar un producto
   */
  deleteProduct: async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService; 