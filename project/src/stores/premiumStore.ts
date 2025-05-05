import { create } from 'zustand';
import { premiumService } from '../services/premiumService';
import {
  PremiumFeaturesState,
  ConsultationReservation,
  Certification,
  PackagingOption,
  CareProgram,
  InsuranceOption,
  CraftsmanshipShowcase,
  ConsultationReservationRequest,
  CareServiceRequest,
  InsuranceSelectionRequest
} from '../types/premium.types';

export const usePremiumStore = create<PremiumFeaturesState>((set, get) => ({
  // State
  consultations: [],
  certifications: {},
  carePrograms: [],
  selectedPackaging: null,
  selectedInsurance: null,
  craftsmanshipShowcase: null,
  isLoading: false,
  error: null,

  // Actions
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),

  // Consultation Actions
  fetchConsultations: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.getConsultations();
      set({ consultations: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch consultations' });
    } finally {
      set({ isLoading: false });
    }
  },

  reserveConsultation: async (data: ConsultationReservationRequest) => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.reserveConsultation(data);
      set(state => ({
        consultations: [...state.consultations, response.data]
      }));
      return response.data;
    } catch (error) {
      set({ error: 'Failed to reserve consultation' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  cancelConsultation: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await premiumService.cancelConsultation(id);
      set(state => ({
        consultations: state.consultations.filter(c => c.id !== id)
      }));
    } catch (error) {
      set({ error: 'Failed to cancel consultation' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Certification Actions
  fetchCertification: async (productId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.getCertification(productId);
      set(state => ({
        certifications: {
          ...state.certifications,
          [productId]: response.data
        }
      }));
      return response.data;
    } catch (error) {
      set({ error: 'Failed to fetch certification' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Packaging Actions
  fetchPackagingOptions: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.getPackagingOptions();
      return response.data;
    } catch (error) {
      set({ error: 'Failed to fetch packaging options' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  selectPackaging: async (data: { packagingId: string; giftMessage?: string }) => {
    try {
      set({ isLoading: true, error: null });
      await premiumService.selectPackaging(data);
      set({ selectedPackaging: data.packagingId });
    } catch (error) {
      set({ error: 'Failed to select packaging' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Care Program Actions
  fetchCarePrograms: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.getCarePrograms();
      set({ carePrograms: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch care programs' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  requestCareService: async (data: CareServiceRequest) => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.requestCareService(data);
      set(state => ({
        carePrograms: [...state.carePrograms, response.data]
      }));
      return response.data;
    } catch (error) {
      set({ error: 'Failed to request care service' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Insurance Actions
  fetchInsuranceOptions: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.getInsuranceOptions();
      return response.data;
    } catch (error) {
      set({ error: 'Failed to fetch insurance options' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  selectInsurance: async (data: InsuranceSelectionRequest) => {
    try {
      set({ isLoading: true, error: null });
      await premiumService.selectInsurance(data);
      set({ selectedInsurance: data.insuranceId });
    } catch (error) {
      set({ error: 'Failed to select insurance' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Craftsmanship Showcase Actions
  fetchCraftsmanshipShowcase: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await premiumService.getCraftsmanshipShowcase();
      set({ craftsmanshipShowcase: response.data });
    } catch (error) {
      set({ error: 'Failed to fetch craftsmanship showcase' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Reset Actions
  resetSelectedPackaging: () => set({ selectedPackaging: null }),
  resetSelectedInsurance: () => set({ selectedInsurance: null }),
  resetError: () => set({ error: null })
})); 