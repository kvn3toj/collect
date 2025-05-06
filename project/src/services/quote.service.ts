import { api } from './api';

export interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  timezone: string;
  message?: string;
  customization: {
    type: string;
    metal: {
      type: string;
      weight: number;
    };
    emerald: {
      cut: string;
      quality: string;
      origin: string;
      carats: number;
    };
    setting: {
      style: string;
      accentStones: boolean;
      accentStoneType?: string;
    };
    engraving?: {
      text: string;
      font: string;
      position: string;
    };
  };
}

export interface QuoteResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed';
  estimatedPrice?: number;
  message: string;
}

export const quoteService = {
  /**
   * Solicita una cotización personalizada
   */
  async requestQuote(data: QuoteRequest): Promise<QuoteResponse> {
    try {
      const response = await api.post<QuoteResponse>('/api/quotes/request', data);
      return response.data;
    } catch (error) {
      console.error('Error requesting quote:', error);
      throw error;
    }
  },

  /**
   * Obtiene una cotización por su ID
   */
  async getQuoteById(quoteId: string): Promise<QuoteResponse> {
    try {
      const response = await api.get<QuoteResponse>(`/api/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quote ${quoteId}:`, error);
      throw error;
    }
  }
}; 