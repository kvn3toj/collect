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
  requestQuote: async (data: QuoteRequest): Promise<QuoteResponse> => {
    const response = await api.post<QuoteResponse>('/api/quotes/request', data);
    return response.data;
  },

  getQuoteStatus: async (quoteId: string): Promise<QuoteResponse> => {
    const response = await api.get<QuoteResponse>(`/api/quotes/${quoteId}`);
    return response.data;
  }
}; 