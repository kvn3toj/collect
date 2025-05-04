import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Popper, 
  Fade, 
  Paper, 
  ClickAwayListener,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  Grid, 
  ShoppingCart, 
  Settings 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../stores/cartStore';

// Definición de los tutoriales por sección
interface TutorialStep {
  title: string;
  description: string;
  targetId: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
}

// Hook personalizado para gestionar el tutorial
export const useHomeTutorial = () => {
  const [tutorialActive, setTutorialActive] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tutorialCompleted, setTutorialCompleted] = useState<boolean>(() => {
    return localStorage.getItem('aretrustHomeTutorialCompleted') === 'true';
  });
  const navigate = useNavigate();
  const { openCart } = useCartStore();

  // Definición de los pasos del tutorial
  const tutorialSteps: TutorialStep[] = [
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
  ];

  const startTutorial = () => {
    if (!tutorialCompleted) {
      setTutorialActive(true);
      setCurrentStep(0);
    }
  };

  const endTutorial = () => {
    setTutorialActive(false);
    localStorage.setItem('aretrustHomeTutorialCompleted', 'true');
    setTutorialCompleted(true);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetTutorial = () => {
    localStorage.removeItem('aretrustHomeTutorialCompleted');
    setTutorialCompleted(false);
  };

  const goToTarget = (targetId: string) => {
    // Navegar a la página correspondiente
    switch (targetId) {
      case 'catalog-nav':
        navigate('/products');
        break;
      case 'configurator-nav':
        navigate('/configurator');
        break;
      case 'cart-nav':
        openCart(); // Aquí deberíamos abrir el carrito en lugar de navegar
        break;
      default:
        navigate('/');
    }
    // Por seguridad, terminamos el tutorial después de la navegación
    endTutorial();
  };

  return {
    tutorialActive,
    currentStep,
    tutorialSteps,
    start: startTutorial,
    nextStep,
    prevStep,
    endTutorial,
    resetTutorial,
    tutorialCompleted,
    goToTarget
  };
};

// Componente principal del tutorial
const HomeTutorial: React.FC = () => {
  const {
    tutorialActive,
    currentStep,
    tutorialSteps,
    start,
    nextStep,
    prevStep,
    endTutorial,
    tutorialCompleted,
    goToTarget
  } = useHomeTutorial();
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  
  // Referencia para seguir el elemento objetivo
  useEffect(() => {
    if (tutorialActive && tutorialSteps[currentStep]) {
      const targetElement = document.getElementById(tutorialSteps[currentStep].targetId);
      if (targetElement) {
        setAnchorEl(targetElement);
        // Aseguramos que el elemento esté visible
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setAnchorEl(null);
    }
  }, [tutorialActive, currentStep, tutorialSteps]);

  // Iniciamos el tutorial al montar el componente si no se ha completado
  useEffect(() => {
    // Pequeño timeout para asegurar que se han renderizado los elementos
    const timer = setTimeout(() => {
      if (!tutorialCompleted) {
        start();
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [tutorialCompleted, start]);

  // Si no hay tutorial activo o ya se completó, no renderizamos nada
  if (!tutorialActive || !tutorialSteps[currentStep]) {
    return null;
  }

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement={currentTutorialStep.placement}
      transition
      disablePortal
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 15],
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              maxWidth: 320,
              borderRadius: 1,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              position: 'relative',
              zIndex: 1400,
            }}
          >
            <ClickAwayListener onClickAway={endTutorial}>
              <Box>
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <IconButton 
                    size="small" 
                    onClick={endTutorial} 
                    aria-label="cerrar tutorial"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    <X size={18} />
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      mr: 2, 
                      p: 1, 
                      backgroundColor: theme.palette.primary.main, 
                      borderRadius: '50%',
                      color: theme.palette.primary.contrastText,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {currentTutorialStep.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    fontFamily="'Playfair Display', serif"
                    fontWeight="500"
                    color="primary.main"
                  >
                    {currentTutorialStep.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 3,
                    fontFamily: "'Lato', sans-serif",
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6
                  }}
                >
                  {currentTutorialStep.description}
                </Typography>
                
                {/* Indicadores de progreso */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {tutorialSteps.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        mx: 0.5,
                        borderRadius: '50%',
                        backgroundColor: index === currentStep 
                          ? theme.palette.secondary.main 
                          : alpha(theme.palette.secondary.main, 0.3),
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Box>
                
                {/* Botones de navegación */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    startIcon={<ChevronLeft size={16} />}
                    disabled={currentStep === 0}
                    onClick={prevStep}
                    size="small"
                    sx={{ 
                      visibility: currentStep === 0 ? 'hidden' : 'visible',
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 500,
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      }
                    }}
                  >
                    Anterior
                  </Button>
                  
                  {currentStep === tutorialSteps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => goToTarget(currentTutorialStep.targetId)}
                      endIcon={<ChevronRight size={16} />}
                      size="small"
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 500,
                        px: 2,
                        py: 0.75,
                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(212, 175, 55, 0.3)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Explorar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={nextStep}
                      endIcon={<ChevronRight size={16} />}
                      size="small"
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      Siguiente
                    </Button>
                  )}
                </Box>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default HomeTutorial; 