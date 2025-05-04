import React, { useEffect, useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Paper,
  Popper,
  alpha,
  useTheme,
  Fade
} from '@mui/material';
import { 
  ChevronRight
} from 'lucide-react';
import { useTutorialContext } from './TutorialContext';

// Componente para tutorial con posicionamiento correcto
const HomeTutorial: React.FC = () => {
  const {
    tutorialActive,
    currentStep,
    tutorialSteps,
    nextStep
  } = useTutorialContext();
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  
  // Refs para rastrear intentos de búsqueda
  const searchAttemptsRef = useRef(0);
  
  console.log("[POSICIONAMIENTO] HomeTutorial renderizado - currentStep:", currentStep, "tutorialActive:", tutorialActive);
  
  // Función para encontrar específicamente los elementos de navegación
  const findNavElement = (targetId: string): HTMLElement | null => {
    console.log("[POSICIONAMIENTO] 🔍 Buscando elemento de navegación:", targetId);
    
    // Mapeo específico para elementos de navegación
    const specialSelectors: Record<string, string[]> = {
      "home-nav": ["#home-nav", "a[href='/']", "button:contains('Inicio')"],
      "catalog-nav": ["#catalog-nav", "a[href='/products']", "button:contains('Colección')"],
      "configurator-nav": ["#configurator-nav", "a[href='/configurator']", "button:contains('Configurador')"],
      "cart-nav": ["#cart-nav", "button[aria-label='shopping cart']", "[aria-label='shopping cart']"]
    };
    
    // Primero intentamos el ID directo para compatibilidad
    let element = document.getElementById(targetId);
    
    if (element) {
      console.log("[POSICIONAMIENTO] ✅ Elemento encontrado por ID:", targetId);
      return element;
    }
    
    // Si no se encuentra, usamos selectores específicos para cada elemento
    if (specialSelectors[targetId]) {
      for (const selector of specialSelectors[targetId]) {
        try {
          // Para selectores que contienen texto
          if (selector.includes(":contains(")) {
            const text = selector.match(/:contains\('(.+)'\)/)?.[1];
            if (text) {
              const elements = Array.from(document.querySelectorAll('button'));
              element = elements.find(el => el.textContent?.includes(text)) as HTMLElement || null;
            }
          } else {
            element = document.querySelector(selector) as HTMLElement;
          }
          
          if (element) {
            console.log("[POSICIONAMIENTO] ✅ Elemento encontrado con selector especial:", selector);
            const rect = element.getBoundingClientRect();
            console.log("[POSICIONAMIENTO] 📏 Dimensiones:", 
              `x:${rect.x.toFixed(0)}, y:${rect.y.toFixed(0)}, ` +
              `ancho:${rect.width.toFixed(0)}, alto:${rect.height.toFixed(0)}`);
            return element;
          }
        } catch (error) {
          console.log("[POSICIONAMIENTO] ❌ Error al buscar con selector:", selector, error);
        }
      }
    }
    
    // Última opción: buscar cualquier otro elemento con este ID o clase
    console.log("[POSICIONAMIENTO] ⚠️ Intentando selectores genéricos");
    return document.querySelector(`[data-testid="${targetId}"], .${targetId}`) as HTMLElement;
  };
  
  // Efecto para encontrar y posicionar el tutorial
  useEffect(() => {
    if (!tutorialActive || !tutorialSteps[currentStep]) {
      return;
    }
    
    const targetId = tutorialSteps[currentStep].targetId;
    
    const findAndScrollToElement = () => {
      const element = findNavElement(targetId);
      
      if (element) {
        // Aseguramos que sea visible
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Verificación de visibilidad
        const rect = element.getBoundingClientRect();
        const isInViewport = 
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth;
        
        console.log("[POSICIONAMIENTO] 👁️ Elemento completamente visible:", isInViewport);
        
        // Importante: usar setTimeout para asegurar que el scroll se complete antes de posicionar
        setTimeout(() => {
          setAnchorEl(element);
        }, 100);
        
        return true;
      }
      
      console.log("[POSICIONAMIENTO] ❌ No se encontró el elemento. Intento:", searchAttemptsRef.current);
      return false;
    };
    
    // Retrasamos la búsqueda para dar tiempo a que el DOM se actualice
    const searchTimer = setTimeout(() => {
      const found = findAndScrollToElement();
      
      if (!found && searchAttemptsRef.current < 5) {
        searchAttemptsRef.current += 1;
        console.log("[POSICIONAMIENTO] 🔄 Reintentando búsqueda en", 300 * searchAttemptsRef.current, "ms");
        
        const retryTimer = setTimeout(() => {
          findAndScrollToElement();
        }, 300 * searchAttemptsRef.current);
        
        return () => clearTimeout(retryTimer);
      }
    }, 300);
    
    return () => {
      clearTimeout(searchTimer);
      searchAttemptsRef.current = 0;
    };
  }, [tutorialActive, currentStep, tutorialSteps]);
  
  // Si no hay tutorial activo o ya se completó, no renderizamos nada
  if (!tutorialActive || !tutorialSteps[currentStep]) {
    return null;
  }

  const currentTutorialStep = tutorialSteps[currentStep];
  console.log("[POSICIONAMIENTO] 🚀 Renderizando paso:", currentStep, "- ID:", currentTutorialStep.targetId);

  // Versión con Popper para posicionamiento correcto
  return Boolean(anchorEl) ? (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement={currentTutorialStep.placement || 'auto'}
      transition
      style={{ zIndex: 1400 }}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 8,
            altAxis: true,
            rootBoundary: 'viewport',
          },
        },
        {
          name: 'flip',
          options: {
            padding: 8,
            altBoundary: true,
            rootBoundary: 'viewport',
          },
        },
      ]}
    >
      {({ TransitionProps, placement }) => (
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
              '&:before': {
                content: '""',
                position: 'absolute',
                width: 12,
                height: 12,
                background: theme.palette.background.paper,
                transform: 'rotate(45deg)',
                top: placement === 'bottom' ? -6 : 
                     placement === 'top' ? 'auto' : '50%',
                bottom: placement === 'top' ? -6 : 'auto',
                left: placement === 'right' ? -6 : 
                      (placement === 'bottom' || placement === 'top') ? '50%' : 'auto',
                right: placement === 'left' ? -6 : 'auto',
                marginLeft: -6,
                marginTop: (placement === 'left' || placement === 'right') ? -6 : 0,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderRight: placement === 'left' ? 'none' : undefined,
                borderBottom: placement === 'top' ? 'none' : undefined,
                borderLeft: placement === 'right' ? 'none' : undefined,
                borderTop: placement === 'bottom' ? 'none' : undefined,
                zIndex: 0,
              }
            }}
          >
            <Typography variant="h6" color="primary.main" gutterBottom>
              {currentTutorialStep.title}
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 3 }}>
              {currentTutorialStep.description}
            </Typography>
            
            {/* Indicadores de paso */}
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
                      : alpha(theme.palette.secondary.main, 0.3)
                  }}
                />
              ))}
            </Box>
            
            {/* Botón único de navegación */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                console.log("[POSICIONAMIENTO] 👆 Click en botón Siguiente - llamando a nextStep()");
                nextStep();
              }}
              endIcon={<ChevronRight size={16} />}
            >
              Siguiente
            </Button>
          </Paper>
        </Fade>
      )}
    </Popper>
  ) : null;
};

export default HomeTutorial; 