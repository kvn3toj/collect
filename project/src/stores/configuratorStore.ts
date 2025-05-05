import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface JewelryConfig {
  jewelryType: string | null;
  metal: {
    type: string | null;
    color: string | null;
    weight: number | null;
  };
  emerald: {
    cut: string | null;
    quality: string | null;
    origin: string | null;
    carats: number | null;
  };
  setting: {
    type: string | null;
    accentStones: {
      type: string | null;
      color: string | null;
      quantity: number | null;
    } | null;
  };
  engraving: string | null;
}

interface ConfiguratorState {
  currentStep: number;
  config: JewelryConfig;
  isLoading: boolean;
  estimatedPrice: number | null;
  error: string | null;
  setCurrentStep: (step: number) => void;
  updateConfig: (updates: Partial<JewelryConfig>) => void;
  setLoading: (loading: boolean) => void;
  setEstimatedPrice: (price: number | null) => void;
  setError: (error: string | null) => void;
  resetConfig: () => void;
}

const initialConfig: JewelryConfig = {
  jewelryType: null,
  metal: {
    type: null,
    color: null,
    weight: null,
  },
  emerald: {
    cut: null,
    quality: null,
    origin: null,
    carats: null,
  },
  setting: {
    type: null,
    accentStones: null,
  },
  engraving: null,
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  devtools(
    (set) => ({
      currentStep: 0,
      config: initialConfig,
      isLoading: false,
      estimatedPrice: null,
      error: null,
      setCurrentStep: (step) => set({ currentStep: step }),
      updateConfig: (updates) =>
        set((state) => ({
          config: { ...state.config, ...updates },
        })),
      setLoading: (loading) => set({ isLoading: loading }),
      setEstimatedPrice: (price) => set({ estimatedPrice: price }),
      setError: (error) => set({ error }),
      resetConfig: () => set({ config: initialConfig, currentStep: 0 }),
    }),
    { name: 'configurator-store' }
  )
); 