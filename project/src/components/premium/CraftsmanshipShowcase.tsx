import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  alpha,
  useTheme,
  Grid,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import { usePremiumStore } from '../../stores/premiumStore';
import { CraftsmanshipShowcase as CraftsmanshipShowcaseType } from '../../types/premium.types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const CraftsmanshipShowcase: React.FC = () => {
  const theme = useTheme();
  const { fetchCraftsmanshipShowcase, craftsmanshipShowcase, isLoading, error, resetError } = usePremiumStore();

  useEffect(() => {
    fetchCraftsmanshipShowcase();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert
          severity="error"
          onClose={resetError}
          sx={{
            borderRadius: 2,
            bgcolor: alpha(theme.palette.error.main, 0.1),
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!craftsmanshipShowcase) {
    return null;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
    >
      <Stack spacing={6}>
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 2
            }}
          >
            {craftsmanshipShowcase.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '800px'
            }}
          >
            {craftsmanshipShowcase.description}
          </Typography>
        </Box>

        <motion.div variants={staggerContainer}>
          <Grid container spacing={4}>
            {craftsmanshipShowcase.steps.map((step, index) => (
              <Grid item xs={12} md={6} key={step.id}>
                <motion.div variants={fadeInUp}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[4]
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={step.media.url}
                      alt={step.title}
                      sx={{
                        objectFit: 'cover',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16
                      }}
                    />
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: 'Playfair Display',
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                        >
                          {index + 1}. {step.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.secondary
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {craftsmanshipShowcase.artisanQuote && (
          <motion.div variants={fadeInUp}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5)
              }}
            >
              <Stack spacing={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    fontStyle: 'italic'
                  }}
                >
                  "{craftsmanshipShowcase.artisanQuote.quote}"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontFamily: 'Inter'
                  }}
                >
                  - {craftsmanshipShowcase.artisanQuote.artisanName}
                </Typography>
              </Stack>
            </Paper>
          </motion.div>
        )}
      </Stack>
    </motion.div>
  );
}; 