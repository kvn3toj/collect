import { api } from './api';

export interface Design {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  customization: {
    type: string;
    metal: {
      type: string;
      weight: number;
    };
    emerald: {
      quality: string;
      origin: string;
      carats: number;
    };
    setting: {
      style: string;
      accentStones?: boolean;
      accentStoneType?: string;
    };
    engraving?: {
      text: string;
      font: string;
    };
  };
  previewUrl?: string;
}

export interface UpdateDesignPayload {
  name?: string;
  customization?: Design['customization'];
}

const atelierService = {
  /**
   * Obtiene todos los diseños propios del usuario autenticado
   */
  async getMyDesigns(): Promise<Design[]> {
    try {
      const { data } = await api.get('/api/designs/mine');
      return data;
    } catch (error) {
      console.error('Error fetching user designs:', error);
      throw error;
    }
  },

  updateDesign: async (designId: string, payload: UpdateDesignPayload): Promise<Design> => {
    const { data } = await api.patch(`/api/designs/${designId}`, payload);
    return data;
  },

  /**
   * Elimina un diseño personalizado
   */
  async deleteDesign(designId: string): Promise<void> {
    try {
      await api.delete(`/api/designs/${designId}`);
    } catch (error) {
      console.error(`Error deleting design ${designId}:`, error);
      throw error;
    }
  }
};

export default atelierService; 