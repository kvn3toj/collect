import React, { useState, useEffect, useCallback, useContext } from 'react';
import { 
  Box,
  Typography,
  Button,
  Paper,
  Fade,
  IconButton,
  useTheme,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  alpha
} from '@mui/material';
import { 
  X, 
  HelpCircle, 
  CheckCircle,
  ChevronRight,
  Settings
} from 'lucide-react';
import { MicroTutorialContext } from './MicroTutorialContext';

// Tipos para los microtutoriales
export interface MicroTutorialStep {
  title: string;
  description: string;
  element?: string; // ID del elemento a resaltar (opcional)
  image?: string;   // URL de imagen para ilustrar (opcional)
  action?: string;  // Texto para botón de acción (opcional)
}

export interface MicroTutorialConfig {
  id: string;
  title: string;
  description: string;
  steps: MicroTutorialStep[];
  trigger: 'auto' | 'manual'; // auto = mostrar automáticamente, manual = mostrar con botón de ayuda
  showOnce: boolean; // Si es true, se muestra solo una vez (usando localStorage)
  priority?: number; // Prioridad del tutorial (mayor número = mayor prioridad)
}

// Hook para gestionar los microtutoriales
export const useMicroTutorial = (config: MicroTutorialConfig) => {
  const [active, setActive] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(() => {
    return localStorage.getItem(`aretrustMicroTutorial_${config.id}`) === 'true';
  });
  
  // Usar el contexto para la gestión de tutoriales
  const { activeTutorial, activeTutorialPriority, setActiveTutorial, pauseAutoTutorials } = useContext(MicroTutorialContext);

  // Comprueba si debe mostrarse automáticamente
  useEffect(() => {
    if (config.trigger === 'auto' && !completed && !pauseAutoTutorials) {
      // Si ya hay un tutorial activo con mayor o igual prioridad, no hacemos nada
      if (activeTutorial && activeTutorial !== config.id) {
        return;
      }
      
      // Calculamos el retraso según la prioridad (mayor prioridad = menor retraso)
      // Si no se especifica prioridad, asumimos la más baja (0)
      const priority = config.priority || 0;
      const baseDelay = 1500; // Retraso base en ms
      const delayByPriority = baseDelay - (priority * 300); // A mayor prioridad, menor retraso
      const delay = Math.max(500, delayByPriority); // Mínimo 500ms de retraso
      
      console.log(`Iniciando tutorial ${config.id} con prioridad ${priority} en ${delay}ms`);
      
      // Pequeño retraso para asegurar que la página se ha cargado completamente
      const timer = setTimeout(() => {
        setActiveTutorial(config.id, priority);
        setActive(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [config.trigger, completed, activeTutorial, config.id, setActiveTutorial, config.priority, pauseAutoTutorials]);

  // Efecto adicional para limpiar cuando el componente se desmonta
  useEffect(() => {
    return () => {
      // Si este tutorial está activo cuando se desmonta, liberamos el contexto
      if (activeTutorial === config.id) {
        console.log(`Desmontando tutorial activo: ${config.id}`);
        setActiveTutorial(null);
      }
    };
  }, [activeTutorial, config.id, setActiveTutorial]);
  
  // Evitar que tutoriales completados se inicien automáticamente
  useEffect(() => {
    if (completed && activeTutorial === config.id) {
      // Si este tutorial ya estaba completado, liberamos el contexto
      console.log(`Tutorial completado, desactivando: ${config.id}`);
      setActiveTutorial(null);
    }
  }, [completed, activeTutorial, config.id, setActiveTutorial]);
  
  // Debug: Monitorear cambios en el estado del tutorial
  useEffect(() => {
    console.log(`Estado tutorial ${config.id}: activo=${active}, activeTutorial=${activeTutorial}, completed=${completed}`);
  }, [active, activeTutorial, completed, config.id]);

  // Gestión de pasos
  const start = useCallback(() => {
    // Al iniciar manualmente, usamos la prioridad especificada
    const priority = config.priority || 0;
    setActiveTutorial(config.id, priority);
    setActive(true);
    setCurrentStep(0);
  }, [config.id, config.priority, setActiveTutorial]);

  const next = useCallback(() => {
    if (currentStep < config.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Último paso completado
      if (config.showOnce) {
        localStorage.setItem(`aretrustMicroTutorial_${config.id}`, 'true');
      }
      setCompleted(true);
      setActive(false);
      setActiveTutorial(null);
    }
  }, [currentStep, config.steps.length, config.id, config.showOnce, setActiveTutorial]);

  const prev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const close = useCallback(() => {
    setActive(false);
    setActiveTutorial(null);
  }, [setActiveTutorial]);

  const reset = useCallback(() => {
    localStorage.removeItem(`aretrustMicroTutorial_${config.id}`);
    setCompleted(false);
  }, [config.id]);

  // Solo mostramos el tutorial si realmente está activo y es el tutorial seleccionado en el contexto
  const isReallyActive = active && (activeTutorial === config.id || activeTutorial === null);

  return {
    active: isReallyActive,
    currentStep,
    steps: config.steps,
    title: config.title,
    description: config.description,
    completed,
    start,
    next,
    prev,
    close,
    reset,
    tutorialId: config.id
  };
};

// Componente para el botón de ayuda que activa un microtutorial manual
export const MicroTutorialTrigger: React.FC<{
  tutorialId: string;
  start: () => void;
  size?: 'small' | 'medium' | 'large';
  tooltip?: string;
}> = ({ tutorialId, start, size = 'small', tooltip = 'Ver ayuda' }) => {
  const theme = useTheme();
  
  return (
    <Tooltip title={tooltip}>
      <IconButton
        onClick={start}
        size={size}
        aria-label="ver tutorial"
        data-tutorial-trigger={tutorialId}
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
          }
        }}
      >
        <HelpCircle size={size === 'large' ? 24 : size === 'medium' ? 20 : 16} />
      </IconButton>
    </Tooltip>
  );
};

// Componente para mostrar un microtutorial
const MicroTutorial: React.FC<{
  tutorial: ReturnType<typeof useMicroTutorial>;
  variant?: 'overlay' | 'tooltip' | 'dialog';
}> = ({ tutorial, variant = 'overlay' }) => {
  const theme = useTheme();
  
  // Si no está activo, no renderizamos nada
  if (!tutorial.active || !tutorial.steps[tutorial.currentStep]) {
    return null;
  }
  
  const currentStep = tutorial.steps[tutorial.currentStep];

  // Para variante de tooltip, necesitamos anclarnos a un elemento
  if (variant === 'tooltip' && currentStep.element) {
    const targetElement = document.getElementById(currentStep.element);
    
    // Si no encontramos el elemento, fallback a overlay
    if (!targetElement) {
      variant = 'overlay';
    }
  }

  // Renderizado según la variante
  const renderContent = () => (
    <Box sx={{ width: '100%' }}>
      {/* Imagen del paso (si existe) */}
      {currentStep.image && (
        <Box 
          sx={{ 
            mb: 2, 
            width: '100%', 
            borderRadius: 1, 
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <img
            src={currentStep.image}
            alt={currentStep.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Box>
      )}
      
      {/* Título del paso */}
      <Typography
        variant="h6"
        fontFamily="'Playfair Display', serif"
        fontWeight="500"
        color="primary.main"
        sx={{ mb: 1 }}
      >
        {currentStep.title}
      </Typography>
      
      {/* Descripción del paso */}
      <Typography 
        variant="body2" 
        sx={{ 
          mb: 3,
          fontFamily: "'Lato', sans-serif",
          color: theme.palette.text.secondary,
          lineHeight: 1.6
        }}
      >
        {currentStep.description}
      </Typography>
      
      {/* Indicadores de progreso */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {tutorial.steps.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              mx: 0.5,
              borderRadius: '50%',
              backgroundColor: index === tutorial.currentStep
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
          disabled={tutorial.currentStep === 0}
          onClick={tutorial.prev}
          size="small"
          sx={{ 
            visibility: tutorial.currentStep === 0 ? 'hidden' : 'visible',
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
        
        {tutorial.currentStep === tutorial.steps.length - 1 ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={tutorial.next}
            endIcon={<CheckCircle size={16} />}
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
            {currentStep.action || "Entendido"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={tutorial.next}
            endIcon={<ChevronRight size={16} />}
            size="small"
            sx={{
              fontFamily: "'Lato', sans-serif",
              fontWeight: 500
            }}
          >
            {currentStep.action || "Siguiente"}
          </Button>
        )}
      </Box>
    </Box>
  );

  // Renderizado según variante
  switch (variant) {
    case 'dialog':
      return (
        <Dialog
          open={tutorial.active}
          onClose={tutorial.close}
          aria-labelledby={`microtutorial-${tutorial.tutorialId}-title`}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 1,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }
          }}
        >
          <DialogTitle
            id={`microtutorial-${tutorial.tutorialId}-title`}
            sx={{ 
              pb: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h6"
              fontFamily="'Playfair Display', serif"
              fontWeight="500"
              color="primary.main"
            >
              {tutorial.title}
            </Typography>
            <IconButton 
              aria-label="cerrar" 
              onClick={tutorial.close} 
              size="small"
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                }
              }}
            >
              <X size={18} />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {renderContent()}
          </DialogContent>
        </Dialog>
      );

    case 'tooltip':
      // Implementación de tooltip anclado a un elemento
      const targetElement = document.getElementById(currentStep.element || '');
      if (!targetElement) {
        return null;
      }

      // Calculamos la posición relativa al elemento
      const rect = targetElement.getBoundingClientRect();
      const position = {
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX
      };

      return (
        <div style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          zIndex: 1500
        }}>
          <Fade in={true}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                maxWidth: 300,
                borderRadius: 1,
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -10,
                  left: 20,
                  width: 0,
                  height: 0,
                  borderStyle: 'solid',
                  borderWidth: '0 10px 10px 10px',
                  borderColor: `transparent transparent ${theme.palette.background.paper} transparent`
                }
              }}
            >
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton 
                  size="small" 
                  onClick={tutorial.close}
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
              {renderContent()}
            </Paper>
          </Fade>
        </div>
      );

    case 'overlay':
    default:
      return (
        <Fade in={true}>
          <Paper
            elevation={6}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 1200,
              p: 3,
              maxWidth: 350,
              borderRadius: 1,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <IconButton 
                size="small" 
                onClick={tutorial.close}
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
            {renderContent()}
          </Paper>
        </Fade>
      );
  }
};

export default MicroTutorial; 