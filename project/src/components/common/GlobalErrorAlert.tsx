import React from 'react';
import { Alert, AlertTitle, Box, useTheme } from '@mui/material';
import { AlertCircle } from 'lucide-react';

interface GlobalErrorAlertProps {
  title?: string;
  message: string;
  fullWidth?: boolean;
  onClose?: () => void;
}

const GlobalErrorAlert: React.FC<GlobalErrorAlertProps> = ({
  title,
  message,
  fullWidth = false,
  onClose
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: fullWidth ? '100%' : 'auto',
        maxWidth: 600,
        mx: 'auto',
        my: 2
      }}
    >
      <Alert
        severity="error"
        onClose={onClose}
        icon={<AlertCircle size={20} />}
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'error.light',
          borderRadius: 1,
          '& .MuiAlert-icon': {
            color: 'error.main',
            opacity: 0.8
          },
          '& .MuiAlert-message': {
            fontFamily: 'Lato',
            color: 'text.primary'
          },
          '& .MuiAlertTitle-root': {
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            mb: 0.5
          }
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  );
};

export default GlobalErrorAlert; 