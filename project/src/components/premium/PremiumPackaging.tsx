import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  alpha,
  useTheme,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField
} from '@mui/material';
import { motion } from 'framer-motion';
import { Gift, MessageSquare } from 'lucide-react';
import { usePremiumStore } from '../../stores/premiumStore';
import { PackagingOption } from '../../types/premium.types';

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

interface PremiumPackagingProps {
  onSelect: (packagingId: string, giftMessage?: string) => void;
  selectedPackagingId?: string;
}

export const PremiumPackaging: React.FC<PremiumPackagingProps> = ({
  onSelect,
  selectedPackagingId
}) => {
  const theme = useTheme();
  const { fetchPackagingOptions, isLoading, error, resetError } = usePremiumStore();
  const [packagingOptions, setPackagingOptions] = useState<PackagingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedPackagingId || '');
  const [giftMessage, setGiftMessage] = useState('');

  useEffect(() => {
    fetchPackagingOptions().then(setPackagingOptions);
  }, []);

  const handleSelect = (packagingId: string) => {
    setSelectedOption(packagingId);
    onSelect(packagingId, giftMessage);
  };

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

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
    >
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Playfair Display',
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            Premium Packaging
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary
            }}
          >
            Choose from our selection of premium packaging options to enhance your gift-giving experience.
          </Typography>
        </Box>

        <RadioGroup
          value={selectedOption}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <motion.div variants={staggerContainer}>
            <Grid container spacing={3}>
              {packagingOptions.map((option) => (
                <Grid item xs={12} md={6} key={option.id}>
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
                        height="200"
                        image={option.imageUrl}
                        alt={option.name}
                        sx={{
                          objectFit: 'cover',
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16
                        }}
                      />
                      <CardContent>
                        <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <FormControlLabel
                              value={option.id}
                              control={<Radio />}
                              label={
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontFamily: 'Playfair Display',
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                  }}
                                >
                                  {option.name}
                                </Typography>
                              }
                            />
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.text.secondary
                            }}
                          >
                            {option.description}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.primary.main,
                              fontFamily: 'Inter',
                              fontWeight: 500
                            }}
                          >
                            ${option.price.toFixed(2)}
                          </Typography>
                          <Stack spacing={1}>
                            {option.features.map((feature, index) => (
                              <Typography
                                key={index}
                                variant="body2"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1
                                }}
                              >
                                <Gift size={16} />
                                {feature}
                              </Typography>
                            ))}
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </RadioGroup>

        {selectedOption && (
          <motion.div variants={fadeInUp}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5)
              }}
            >
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MessageSquare size={24} color={theme.palette.primary.main} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      color: theme.palette.text.primary
                    }}
                  >
                    Gift Message (Optional)
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={giftMessage}
                  onChange={(e) => {
                    setGiftMessage(e.target.value);
                    onSelect(selectedOption, e.target.value);
                  }}
                  placeholder="Add a personal message to your gift..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Stack>
            </Paper>
          </motion.div>
        )}
      </Stack>
    </motion.div>
  );
}; 