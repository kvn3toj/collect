import apiClient from './api';
import { ApiResponse, CatalogData, CustomizationConfig, PriceEstimate } from '../types';

/**
 * Servicio para el personalizador de joyas
 */
export const customizerService = {
  /**
   * Obtener datos de catálogo para el personalizador
   */
  getCatalogData: async (): Promise<ApiResponse<CatalogData>> => {
    const response = await apiClient.get('/catalog');
    return response.data;
  },
  
  /**
   * Obtener tipos de joyería
   */
  getJewelryTypes: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get('/catalog/jewelry-types');
    return response.data;
  },
  
  /**
   * Obtener metales disponibles
   */
  getMetals: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get('/catalog/metals');
    return response.data;
  },
  
  /**
   * Obtener cortes disponibles
   */
  getCuts: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get('/catalog/cuts');
    return response.data;
  },
  
  /**
   * Obtener calidades disponibles
   */
  getQualities: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get('/catalog/qualities');
    return response.data;
  },
  
  /**
   * Obtener orígenes disponibles
   */
  getOrigins: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get('/catalog/origins');
    return response.data;
  },
  
  /**
   * Obtener estimación de precio basado en la configuración de personalización
   */
  getPriceEstimate: async (config: CustomizationConfig): Promise<ApiResponse<PriceEstimate>> => {
    const response = await apiClient.post('/pricing/estimate', config);
    return response.data;
  },
  
  /**
   * Solicitar cotización personalizada
   */
  requestQuote: async (
    config: CustomizationConfig, 
    contactInfo: { name: string; email: string; phone: string; message?: string; }
  ): Promise<ApiResponse<{ requestId: string }>> => {
    const response = await apiClient.post('/quotes/request', {
      customization: config,
      contactInfo
    });
    return response.data;
  },
};

export default customizerService; 