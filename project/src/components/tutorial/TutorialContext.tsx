import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../stores/cartStore';
import { useOnboarding } from '../../hooks/useOnboarding';
import { Home, Grid, ShoppingCart, Settings } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  targetId: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
}

interface TutorialContextType {
  tutorialActive: boolean;
  currentStep: number;
  tutorialSteps: TutorialStep[];
  start: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTutorial: () => void;
  resetTutorial: () => void;
  tutorialCompleted: boolean;
  goToTarget: (targetId: string) => void;
  isOnboardingCompleted: boolean;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  // Ref para debugging y seguimiento de actualizaciones de estado
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  
  console.log(`[DIAGNÓSTICO] 🔄 TutorialProvider renderizado #${renderCountRef.current}`);
  
  // Estados básicos del tutorial
  const [tutorialActive, setTutorialActive] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tutorialCompleted, setTutorialCompleted] = useState<boolean>(() => {
    return localStorage.getItem('aretrustHomeTutorialCompleted') === 'true';
  });
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  // Hooks externos
  const navigate = useNavigate();
  const { openCart } = useCartStore();
  const { isCompleted: isOnboardingCompleted } = useOnboarding();

  // Pasos del tutorial - memoizados para evitar recreaciones
  const tutorialSteps = useMemo<TutorialStep[]>(() => [
    {
      title: "Página Principal",
      description: "Aquí encontrarás nuestra historia, valores y compromiso con la sostenibilidad de las esmeraldas colombianas.",
      targetId: "home-nav",
      placement: "bottom",
      icon: <Home size={20} />
    },
    {
      title: "Catálogo de Joyas",
      description: "Explora nuestra colección de joyas con esmeraldas éticas. Cada pieza cuenta con certificación y trazabilidad completa.",
      targetId: "catalog-nav",
      placement: "bottom",
      icon: <Grid size={20} />
    },
    {
      title: "Configurador de Joyas",
      description: "Diseña tu propia joya personalizada. Elige la esmeralda, el metal y el estilo que refleje tu personalidad.",
      targetId: "configurator-nav",
      placement: "bottom",
      icon: <Settings size={20} />
    },
    {
      title: "Carrito de Compras",
      description: "Revisa los artículos seleccionados, gestiona cantidades y procede al proceso de pago seguro.",
      targetId: "cart-nav",
      placement: "left",
      icon: <ShoppingCart size={20} />
    }
  ], []);

  // Iniciar automáticamente el tutorial si el onboarding se completó
  useEffect(() => {
    if (!tutorialCompleted && isOnboardingCompleted && !tutorialActive && !hasStarted) {
      console.log('[DIAGNÓSTICO] 🚀 Iniciando tutorial automáticamente después del onboarding');
      setHasStarted(true);
      const timer = setTimeout(() => {
        setTutorialActive(true);
        setCurrentStep(0);
        console.log("[DIAGNÓSTICO] Tutorial iniciado automáticamente");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [tutorialCompleted, isOnboardingCompleted, tutorialActive, hasStarted]);

  // Escuchar el evento de onboarding completado
  useEffect(() => {
    const handleOnboardingCompleted = () => {
      console.log("[DIAGNÓSTICO] Evento onboardingCompleted recibido");
      if (!tutorialCompleted && !tutorialActive && !hasStarted) {
        setHasStarted(true);
        setTimeout(() => {
          setTutorialActive(true);
          setCurrentStep(0);
          console.log("[DIAGNÓSTICO] Tutorial iniciado por evento onboardingCompleted");
        }, 500);
      }
    };
    window.addEventListener('onboardingCompleted', handleOnboardingCompleted);
    return () => {
      window.removeEventListener('onboardingCompleted', handleOnboardingCompleted);
    };
  }, [tutorialCompleted, tutorialActive, hasStarted]);

  // Funciones para interactuar con el tutorial - todas memoizadas
  const start = useCallback(() => {
    console.log('[DIAGNÓSTICO] Función start llamada manualmente');
    if (!tutorialCompleted && isOnboardingCompleted) {
      setCurrentStep(0);
      setTutorialActive(true);
    }
  }, [tutorialCompleted, isOnboardingCompleted]);

  const endTutorial = useCallback(() => {
    console.log('[DIAGNÓSTICO] Función endTutorial llamada');
    // Simplificado para diagnóstico
    setTutorialActive(false);
    localStorage.setItem('aretrustHomeTutorialCompleted', 'true');
    setTutorialCompleted(true);
    setHasStarted(false);
  }, []);

  // Función auxiliar para verificar si un elemento existe en el DOM
  const elementExists = useCallback((targetId: string): boolean => {
    const element = document.getElementById(targetId);
    const exists = !!element;
    console.log(`[DIAGNÓSTICO] Verificando si existe el elemento #${targetId}: ${exists}`);
    return exists;
  }, []);

  // Función para encontrar el siguiente paso válido
  const findNextValidStep = useCallback((currentIndex: number): number => {
    let nextIndex = currentIndex + 1;
    
    // Si ya estamos en el último paso o más allá, terminamos
    if (nextIndex >= tutorialSteps.length) {
      return -1; // Indicamos que no hay más pasos válidos
    }
    
    // Verificamos si el elemento del siguiente paso existe
    if (elementExists(tutorialSteps[nextIndex].targetId)) {
      return nextIndex;
    }
    
    // Si no existe, buscamos recursivamente el siguiente
    console.log(`[DIAGNÓSTICO] Elemento para paso ${nextIndex} (${tutorialSteps[nextIndex].targetId}) no encontrado, buscando siguiente...`);
    return findNextValidStep(nextIndex);
  }, [tutorialSteps, elementExists]);

  // Función para encontrar el paso anterior válido
  const findPrevValidStep = useCallback((currentIndex: number): number => {
    let prevIndex = currentIndex - 1;
    
    // Si estamos en el primer paso o antes, no hay anterior
    if (prevIndex < 0) {
      return -1;
    }
    
    // Verificamos si el elemento del paso anterior existe
    if (elementExists(tutorialSteps[prevIndex].targetId)) {
      return prevIndex;
    }
    
    // Si no existe, buscamos recursivamente el anterior
    console.log(`[DIAGNÓSTICO] Elemento para paso ${prevIndex} (${tutorialSteps[prevIndex].targetId}) no encontrado, buscando anterior...`);
    return findPrevValidStep(prevIndex);
  }, [tutorialSteps, elementExists]);

  const nextStep = useCallback(() => {
    console.log('[DIAGNÓSTICO] Función nextStep llamada, currentStep actual:', currentStep);
    
    // Encontrar el siguiente paso válido
    const nextValidStep = findNextValidStep(currentStep);
    
    if (nextValidStep === -1) {
      // No hay más pasos válidos, terminar el tutorial
      console.log('[DIAGNÓSTICO] No hay más pasos válidos, finalizando tutorial');
      setTimeout(() => endTutorial(), 0);
      return;
    }
    
    // Actualizar al siguiente paso válido
    console.log(`[DIAGNÓSTICO] Actualizando paso de ${currentStep} a ${nextValidStep}`);
    setCurrentStep(nextValidStep);
    
  }, [currentStep, findNextValidStep, endTutorial, tutorialSteps]);

  const prevStep = useCallback(() => {
    console.log('[DIAGNÓSTICO] Función prevStep llamada, currentStep actual:', currentStep);
    
    // Encontrar el paso anterior válido
    const prevValidStep = findPrevValidStep(currentStep);
    
    if (prevValidStep === -1) {
      // No hay pasos válidos anteriores
      console.log('[DIAGNÓSTICO] No hay pasos válidos anteriores');
      return;
    }
    
    // Actualizar al paso anterior válido
    console.log(`[DIAGNÓSTICO] Retrocediendo de paso ${currentStep} a ${prevValidStep}`);
    setCurrentStep(prevValidStep);
    
  }, [currentStep, findPrevValidStep, tutorialSteps]);

  const resetTutorial = useCallback(() => {
    console.log('[DIAGNÓSTICO] Función resetTutorial llamada');
    localStorage.removeItem('aretrustHomeTutorialCompleted');
    setTutorialCompleted(false);
    setCurrentStep(0);
    setHasStarted(false);
  }, []);

  const goToTarget = useCallback((targetId: string) => {
    console.log('[DIAGNÓSTICO] Función goToTarget llamada con targetId:', targetId);
    
    // Simplificado para diagnóstico - solo navegar y terminar
    switch (targetId) {
      case 'catalog-nav':
        navigate('/products');
        break;
      case 'configurator-nav':
        navigate('/configurator');
        break;
      case 'cart-nav':
        openCart();
        break;
      default:
        navigate('/');
    }
    
    // Programamos el fin del tutorial para después de la navegación
    setTimeout(() => endTutorial(), 0);
  }, [navigate, openCart, endTutorial]);

  // Valor del contexto memoizado
  const contextValue = useMemo<TutorialContextType>(() => ({
    tutorialActive,
    currentStep,
    tutorialSteps,
    start,
    nextStep,
    prevStep,
    endTutorial,
    resetTutorial,
    tutorialCompleted,
    goToTarget,
    isOnboardingCompleted
  }), [
    tutorialActive,
    currentStep,
    tutorialSteps,
    start,
    nextStep,
    prevStep,
    endTutorial,
    resetTutorial,
    tutorialCompleted,
    goToTarget,
    isOnboardingCompleted
  ]);

  // Log para confirmar actualizaciones de estado
  useEffect(() => {
    console.log(`[DIAGNÓSTICO] TutorialContext - Estado actualizado: currentStep=${currentStep}, tutorialActive=${tutorialActive}`);
  }, [currentStep, tutorialActive]);

  return (
    <TutorialContext.Provider value={contextValue}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorialContext = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorialContext debe usarse dentro de un <TutorialProvider>');
  }
  return context;
}; 