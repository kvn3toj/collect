import { Box, Button, Typography, useTheme } from '@mui/material';
import { useConfiguratorStore } from '../../stores/configuratorStore';
import { motion } from 'framer-motion';

export const ConfiguratorPrice = () => {
  const theme = useTheme();
  const { estimatedPrice, config } = useConfiguratorStore();

  const formatPrice = (price: number | null) => {
    if (!price) return '--';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      {/* Price Display */}
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 0.5,
          }}
        >
          Precio Estimado
        </Typography>
        <Typography
          variant="h5"
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          {formatPrice(estimatedPrice)}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              bgcolor: 'rgba(212, 175, 55, 0.04)',
            },
            height: 48,
            px: 3,
            borderRadius: 1,
            textTransform: 'none',
            fontFamily: 'Lato',
            fontWeight: 500,
          }}
        >
          Guardar en Mi Atelier
        </Button>
        <Button
          variant="contained"
          disabled={!config.jewelryType}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            height: 48,
            px: 3,
            borderRadius: 1,
            textTransform: 'none',
            fontFamily: 'Lato',
            fontWeight: 500,
          }}
        >
          Solicitar Cotización
        </Button>
      </Box>
    </Box>
  );
}; 