import { useState, useCallback, useEffect } from 'react';

export interface OnboardingStep {
  title: string;
  description: string;
  image: string;
}

// Configuración de los pasos del onboarding
export const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Ethical Luxury",
    description: "ARE Trüst represents a new standard in emerald jewelry. Our commitment to ethical sourcing ensures every gem comes with a clear conscience and supports Colombian communities.",
    image: "/images/products/lote-10-4-piedras-muzo.jpg"
  },
  {
    title: "Discover Rare Beauty",
    description: "Explore our curated collection of extraordinary emeralds. Each stone is carefully selected for its unique character, vivid color, and exceptional clarity.",
    image: "/images/products/lote-2-7-piedras.jpg"
  },
  {
    title: "Design Your Vision",
    description: "Our interactive jewelry configurator lets you create pieces as unique as you are. Select your emerald, setting style, and precious metal to bring your dream to life.",
    image: "/images/products/lote-5-4-piedras.jpg"
  },
  {
    title: "Certified Excellence",
    description: "Every ARE Trüst emerald comes with GIA certification and complete traceability. Our gems aren't just beautiful - they're authentic investments with documented provenance.",
    image: "/images/products/lote-3-6-piedras.jpg"
  },
  {
    title: "Begin Your Journey",
    description: "The perfect piece awaits you. Explore our collections or create your custom design through our configurator. Experience the extraordinary world of fine emeralds.",
    image: "/images/products/lote-1-187-piedras.jpg"
  }
];

const STORAGE_KEY = 'aretrustOnboardingCompleted';

export const useOnboarding = () => {
  // Estado para controlar si el onboarding está completado
  const [isCompleted, setIsCompleted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  // Estado para controlar el paso actual
  const [currentStep, setCurrentStep] = useState(0);
  
  // Estado para controlar si el modal está abierto
  const [isOpen, setIsOpen] = useState(false);

  // Verificar localStorage al cargar para determinar si se debe mostrar el onboarding
  useEffect(() => {
    // Solo muestra el onboarding si no está completado y es la primera carga de la página
    if (!isCompleted) {
      setIsOpen(true);
    }
  }, [isCompleted]);

  // Función para marcar el onboarding como completado
  const completeOnboarding = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsCompleted(true);
    setIsOpen(false);
  }, []);

  // Función para resetear el onboarding (útil para testing)
  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsCompleted(false);
    setCurrentStep(0);
  }, []);

  // Funciones para navegar entre pasos
  const nextStep = useCallback(() => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  }, [currentStep, completeOnboarding]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const skipOnboarding = useCallback(() => {
    completeOnboarding();
  }, [completeOnboarding]);

  // Abrir el onboarding manualmente (útil si hay un botón "Ver Introducción" en algún lado)
  const openOnboarding = useCallback(() => {
    setCurrentStep(0);
    setIsOpen(true);
  }, []);
  
  // Cerrar el onboarding sin marcarlo como completado
  const closeOnboarding = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isCompleted,
    isOpen,
    currentStep,
    totalSteps: onboardingSteps.length,
    currentStepData: onboardingSteps[currentStep],
    allSteps: onboardingSteps,
    nextStep,
    prevStep,
    skipOnboarding,
    completeOnboarding,
    resetOnboarding,
    openOnboarding,
    closeOnboarding
  };
};

export default useOnboarding; 