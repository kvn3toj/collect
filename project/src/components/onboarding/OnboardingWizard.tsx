import React, { useEffect } from 'react';
import { Dialog, DialogContent, Box, useTheme, alpha, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import useOnboardingHook from '../../hooks/useOnboarding';
import OnboardingStep from './OnboardingStep';
import { X } from 'lucide-react';

// Reexportar el hook useOnboarding para que TutorialManager pueda importarlo desde aquí
export { default as useOnboarding } from '../../hooks/useOnboarding';

// Transición deslizante para la entrada del Dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OnboardingWizard: React.FC = () => {
  const theme = useTheme();
  const {
    isOpen,
    isCompleted,
    currentStep,
    totalSteps,
    currentStepData,
    nextStep,
    prevStep,
    skipOnboarding,
    closeOnboarding
  } = useOnboardingHook();

  // Escucha de teclas (para accesibilidad)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          closeOnboarding();
          break;
        case 'ArrowRight':
          nextStep();
          break;
        case 'ArrowLeft':
          prevStep();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, nextStep, prevStep, closeOnboarding]);

  // Esto asegura que si el onboarding cambia a completado,
  // se cerrará correctamente y permitirá la transición a otros tutoriales
  useEffect(() => {
    if (isCompleted && isOpen) {
      // Cerrar el diálogo cuando se marca como completado
      closeOnboarding();
    }
  }, [isCompleted, isOpen, closeOnboarding]);

  // Si el onboarding está completado, no mostrar nada
  if (isCompleted && !isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="md"
      aria-describedby="onboarding-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 1,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          overflow: 'hidden',
        },
        '& .MuiBackdrop-root': {
          backgroundColor: alpha('#000', 0.85),
          backdropFilter: 'blur(2px)',
        }
      }}
    >
      {/* Botón de cierre */}
      <Box
        onClick={closeOnboarding}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: alpha(theme.palette.common.white, 0.1),
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.2),
            transform: 'rotate(90deg)',
          }
        }}
      >
        <X size={20} />
      </Box>

      <DialogContent
        sx={{
          p: 0,
          m: 0,
          overflowX: 'hidden',
          minHeight: { xs: 520, md: 600 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <OnboardingStep
          step={currentStepData}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={nextStep}
          onPrev={prevStep}
          onSkip={skipOnboarding}
          isLastStep={currentStep === totalSteps - 1}
        />
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWizard; 