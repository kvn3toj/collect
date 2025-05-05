import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  icon: Icon,
  actionLabel,
  onAction
}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 8, sm: 12 },
        px: 3
      }}
    >
      {Icon && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3
          }}
        >
          <Icon
            size={48}
            color="#D4AF37"
            style={{ opacity: 0.8 }}
          />
        </Box>
      )}
      <Typography
        variant="h5"
        fontFamily="Playfair Display"
        color="text.secondary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mb: 4,
          fontFamily: 'Lato',
          maxWidth: 400,
          mx: 'auto'
        }}
      >
        {message}
      </Typography>
      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            bgcolor: '#D4AF37',
            color: 'white',
            '&:hover': {
              bgcolor: '#B8960C'
            },
            height: 48,
            borderRadius: 1,
            textTransform: 'none',
            fontFamily: 'Lato',
            fontWeight: 500,
            px: 4
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState; 