import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface ConfiguratorProgressProps {
  steps: string[];
  currentStep: number;
}

export const ConfiguratorProgress = ({ steps, currentStep }: ConfiguratorProgressProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      {steps.map((step, index) => (
        <Box
          key={step}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {/* Step Circle */}
          <Box
            component={motion.div}
            initial={false}
            animate={{
              scale: currentStep === index ? 1.1 : 1,
              backgroundColor:
                currentStep === index
                  ? theme.palette.primary.main
                  : currentStep > index
                  ? theme.palette.primary.light
                  : theme.palette.grey[300],
            }}
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: currentStep >= index ? 'white' : theme.palette.text.secondary,
                fontWeight: currentStep === index ? 600 : 400,
              }}
            >
              {index + 1}
            </Typography>
          </Box>

          {/* Step Label */}
          <Typography
            variant="body2"
            sx={{
              color: currentStep === index ? 'text.primary' : 'text.secondary',
              fontWeight: currentStep === index ? 600 : 400,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {step}
          </Typography>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <Box
              sx={{
                width: 40,
                height: 1,
                bgcolor: currentStep > index ? theme.palette.primary.light : theme.palette.grey[300],
                transition: 'background-color 0.3s ease',
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}; 