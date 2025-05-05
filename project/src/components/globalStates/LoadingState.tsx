import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Cargando...',
  fullScreen = false,
  size = 'medium'
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { spinner: 24, text: 'body2' };
      case 'large':
        return { spinner: 48, text: 'h6' };
      default:
        return { spinner: 32, text: 'body1' };
    }
  };

  const { spinner, text } = getSize();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          minHeight: fullScreen ? '100vh' : '200px',
          width: '100%',
          bgcolor: fullScreen ? 'background.default' : 'transparent',
          position: fullScreen ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          zIndex: fullScreen ? 9999 : 'auto'
        }}
      >
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <CircularProgress
            size={spinner}
            sx={{
              color: 'gold.main',
              opacity: 0.8
            }}
          />
        </motion.div>
        <Typography
          variant={text as any}
          color="text.secondary"
          sx={{
            fontFamily: 'Lato',
            fontWeight: 300,
            letterSpacing: 0.5,
            textAlign: 'center'
          }}
        >
          {message}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default LoadingState; 