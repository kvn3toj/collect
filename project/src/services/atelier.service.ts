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
  getMyDesigns: async (): Promise<Design[]> => {
    const { data } = await api.get('/api/designs/mine');
    return data;
  },

  updateDesign: async (designId: string, payload: UpdateDesignPayload): Promise<Design> => {
    const { data } = await api.patch(`/api/designs/${designId}`, payload);
    return data;
  },

  deleteDesign: async (designId: string): Promise<void> => {
    await api.delete(`/api/designs/${designId}`);
  }
};

export default atelierService; 