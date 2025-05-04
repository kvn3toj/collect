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
      if (onboardingElement) {
        console.log('Onboarding detectado, pausando tutoriales automáticos');
        setPauseAutoTutorials(true);
      } else {
        setPauseAutoTutorials(false);
      }
    };
    
    // Comprobar inmediatamente y luego cada segundo
    checkForActiveOnboarding();
    const interval = setInterval(checkForActiveOnboarding, 1000);
    
    return () => clearInterval(interval);
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
            <TutorialManager>
              <AppRoutes />
            </TutorialManager>
          </MicroTutorialProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;