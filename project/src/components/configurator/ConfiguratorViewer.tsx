import { Box, Typography, useTheme } from '@mui/material';
import { useConfiguratorStore } from '../../stores/configuratorStore';
import { motion } from 'framer-motion';

export const ConfiguratorViewer = () => {
  const theme = useTheme();
  const { config, isLoading } = useConfiguratorStore();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1,
          }}
        >
          <Box
            component={motion.div}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
            sx={{
              width: 40,
              height: 40,
              border: `2px solid ${theme.palette.primary.main}`,
              borderTopColor: 'transparent',
              borderRadius: '50%',
            }}
          />
        </Box>
      )}

      {/* Placeholder Content */}
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Visualización 3D
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          {config.jewelryType
            ? `Vista previa de ${config.jewelryType}`
            : 'Seleccione un tipo de joya para comenzar'}
        </Typography>
      </Box>

      {/* View Controls (Placeholder) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          display: 'flex',
          gap: 1,
        }}
      >
        {['rotate', 'zoom', 'reset'].map((action) => (
          <Box
            key={action}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
              {action}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}; 