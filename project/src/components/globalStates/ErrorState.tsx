import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Ha ocurrido un error inesperado',
  onRetry,
  fullScreen = false,
  size = 'medium'
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { icon: 32, title: 'subtitle1', message: 'body2' };
      case 'large':
        return { icon: 64, title: 'h5', message: 'h6' };
      default:
        return { icon: 48, title: 'h6', message: 'body1' };
    }
  };

  const { icon, title, message: messageVariant } = getSize();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          minHeight: fullScreen ? '100vh' : '200px',
          width: '100%',
          bgcolor: fullScreen ? 'background.default' : 'transparent',
          position: fullScreen ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          zIndex: fullScreen ? 9999 : 'auto',
          p: 3,
          textAlign: 'center'
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <AlertCircle
            size={icon}
            color="#B71C1C"
            style={{ opacity: 0.8 }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Typography
            variant={title as any}
            color="error.main"
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 500,
              letterSpacing: 0.5,
              mb: 1
            }}
          >
            Error
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Typography
            variant={messageVariant as any}
            color="text.secondary"
            sx={{
              fontFamily: 'Lato',
              fontWeight: 300,
              letterSpacing: 0.5,
              maxWidth: 400,
              mb: 2
            }}
          >
            {message}
          </Typography>
        </motion.div>
        {onRetry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={onRetry}
              startIcon={<RefreshCw size={20} />}
              sx={{
                textTransform: 'none',
                fontFamily: 'Lato',
                fontWeight: 500,
                letterSpacing: 0.5,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(183, 28, 28, 0.1)'
                }
              }}
            >
              Intentar nuevamente
            </Button>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default ErrorState; 