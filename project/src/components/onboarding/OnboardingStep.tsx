import React from 'react';
import { Box, Typography, Button, useTheme, alpha } from '@mui/material';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { OnboardingStep as OnboardingStepType } from '../../hooks/useOnboarding';

interface OnboardingStepProps {
  step: OnboardingStepType;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isLastStep: boolean;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  isLastStep
}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: { xs: 3, md: 5 },
        maxWidth: 600,
        mx: 'auto',
        position: 'relative'
      }}
    >
      {/* Imagen */}
      <Box 
        sx={{ 
          mb: 4, 
          width: '100%', 
          height: { xs: 200, sm: 280, md: 320 }, 
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Box
          component="img"
          src={step.image}
          alt={step.title}
          sx={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.6s ease',
            '&:hover': {
              transform: 'scale(1.03)'
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
          }}
        />
      </Box>

      {/* Título */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 500,
          color: theme.palette.primary.main,
          mb: 2,
          textAlign: 'center',
        }}
      >
        {step.title}
      </Typography>

      {/* Descripción */}
      <Typography 
        variant="body1" 
        sx={{
          textAlign: 'center',
          mb: 4,
          color: theme.palette.text.secondary,
          fontFamily: "'Lato', sans-serif",
          lineHeight: 1.6,
          maxWidth: 520,
          mx: 'auto'
        }}
      >
        {step.description}
      </Typography>

      {/* Indicadores de progreso */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 4,
          gap: 1
        }}
      >
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: index === currentStep
                ? theme.palette.secondary.main
                : alpha(theme.palette.secondary.main, 0.3),
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>

      {/* Navegación */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%',
          mt: 2
        }}
      >
        <Button
          variant="text"
          onClick={onPrev}
          disabled={currentStep === 0}
          startIcon={<ArrowLeft size={16} />}
          sx={{
            visibility: currentStep === 0 ? 'hidden' : 'visible',
            color: theme.palette.text.secondary,
            fontFamily: "'Lato', sans-serif",
            fontWeight: 500,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            }
          }}
        >
          Previous
        </Button>
        
        <Button
          variant="text"
          onClick={onSkip}
          sx={{
            color: alpha(theme.palette.text.secondary, 0.7),
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            fontSize: '0.85rem',
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.palette.text.primary,
            }
          }}
        >
          Skip
        </Button>
        
        <Button
          variant={isLastStep ? "contained" : "text"}
          color={isLastStep ? "secondary" : "primary"}
          onClick={onNext}
          endIcon={<ArrowRight size={16} />}
          sx={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 500,
            ...(isLastStep && {
              px: 3,
              py: 1,
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(212, 175, 55, 0.3)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            })
          }}
        >
          {isLastStep ? 'Get Started' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingStep; 