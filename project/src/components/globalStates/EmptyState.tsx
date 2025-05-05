import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Inbox } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No hay elementos',
  message = 'No se encontraron elementos para mostrar',
  actionLabel,
  onAction,
  fullScreen = false,
  size = 'medium',
  icon
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

  const { icon: iconSize, title: titleVariant, message: messageVariant } = getSize();

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
          {icon || (
            <Inbox
              size={iconSize}
              color="#757575"
              style={{ opacity: 0.5 }}
            />
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Typography
            variant={titleVariant as any}
            color="text.primary"
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 500,
              letterSpacing: 0.5,
              mb: 1
            }}
          >
            {title}
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
        {actionLabel && onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={onAction}
              sx={{
                textTransform: 'none',
                fontFamily: 'Lato',
                fontWeight: 500,
                letterSpacing: 0.5,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(11, 93, 76, 0.1)'
                }
              }}
            >
              {actionLabel}
            </Button>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default EmptyState; 