import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useContext } from 'react';
import luxuryTheme from './theme/theme';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './stores/authStore';
import TutorialManager from './components/tutorial/TutorialManager';
import { MicroTutorialProvider, MicroTutorialContext } from './components/tutorial/MicroTutorial';
import { TutorialProvider } from './components/tutorial/TutorialContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Componente para controlar la pausa de tutorials si hay onboarding activo
const OnboardingController = () => {
  const { setPauseAutoTutorials } = useContext(MicroTutorialContext);
  
  useEffect(() => {
    // Verificar si hay un modal de onboarding activo
    const checkForActiveOnboarding = () => {
      const onboardingElement = document.querySelector('[role="presentation"]');
      
      // Verificamos si el elemento encontrado es realmente el onboarding
      // y no el tutorial de navegación básica (HomeTutorial)
      let isOnboarding = false;
      if (onboardingElement) {
        // Si el elemento tiene un contenedor con texto que contenga "ARE Trüst"
        // o algún título del onboarding, entonces es el onboarding
        const onboardingText = onboardingElement.textContent || '';
        isOnboarding = onboardingText.includes('ARE Trüst') || 
                       onboardingText.includes('Welcome to Ethical Luxury') ||
                       onboardingText.includes('Discover Rare Beauty');
                       
        if (isOnboarding) {
          console.log('Onboarding detectado, pausando tutoriales automáticos');
          setPauseAutoTutorials(true);
        } else {
          // Esto probablemente es el HomeTutorial, no pausamos
          setPauseAutoTutorials(false);
        }
      } else {
        setPauseAutoTutorials(false);
      }
    };
    
    // Comprobar inmediatamente y luego cada segundo
    checkForActiveOnboarding();
    const interval = setInterval(checkForActiveOnboarding, 1000);
    
    return () => clearInterval(interval);
  }, [setPauseAutoTutorials]);
  
  // Detectar cuando se completa el onboarding
  useEffect(() => {
    const handleOnboardingCompleted = () => {
      console.log('Evento onboardingCompleted detectado en App, desactivando pausa de tutoriales');
      setPauseAutoTutorials(false);
    };
    
    window.addEventListener('onboardingCompleted', handleOnboardingCompleted);
    
    return () => {
      window.removeEventListener('onboardingCompleted', handleOnboardingCompleted);
    };
  }, [setPauseAutoTutorials]);
  
  return null;
};

const App = (): JSX.Element => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Verify auth state on app start
    checkAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={luxuryTheme}>
        <CssBaseline />
        <Router>
          <MicroTutorialProvider>
            <OnboardingController />
            <TutorialProvider>
              <TutorialManager>
                <AppRoutes />
              </TutorialManager>
            </TutorialProvider>
          </MicroTutorialProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;