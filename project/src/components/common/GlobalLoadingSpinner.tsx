import React from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';

interface GlobalLoadingSpinnerProps {
  size?: number;
  thickness?: number;
  fullScreen?: boolean;
}

const GlobalLoadingSpinner: React.FC<GlobalLoadingSpinnerProps> = ({
  size = 40,
  thickness = 4,
  fullScreen = false
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(fullScreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.default',
          zIndex: theme.zIndex.modal + 1
        })
      }}
    >
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{
          color: '#D4AF37',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round'
          }
        }}
      />
    </Box>
  );
};

export default GlobalLoadingSpinner; 