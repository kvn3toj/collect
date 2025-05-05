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
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { usePremiumStore } from '../../stores/premiumStore';
import { InsuranceOption } from '../../types/premium.types';

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

interface InsuranceOptionsProps {
  onSelect: (insuranceId: string) => void;
  selectedInsuranceId?: string;
}

export const InsuranceOptions: React.FC<InsuranceOptionsProps> = ({
  onSelect,
  selectedInsuranceId
}) => {
  const theme = useTheme();
  const { fetchInsuranceOptions, isLoading, error, resetError } = usePremiumStore();
  const [insuranceOptions, setInsuranceOptions] = useState<InsuranceOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(selectedInsuranceId || '');

  useEffect(() => {
    fetchInsuranceOptions().then(setInsuranceOptions);
  }, []);

  const handleSelect = (insuranceId: string) => {
    setSelectedOption(insuranceId);
    onSelect(insuranceId);
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
            Insurance Options
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary
            }}
          >
            Protect your investment with our comprehensive insurance options.
          </Typography>
        </Box>

        <RadioGroup
          value={selectedOption}
          onChange={(e) => handleSelect(e.target.value)}
        >
          <motion.div variants={staggerContainer}>
            <Grid container spacing={3}>
              {insuranceOptions.map((option) => (
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
                      <CardContent>
                        <Stack spacing={3}>
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
                            ${option.price.toFixed(2)} / year
                          </Typography>

                          <Stack spacing={2}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: theme.palette.text.primary,
                                fontFamily: 'Inter',
                                fontWeight: 500
                              }}
                            >
                              Coverage Details:
                            </Typography>
                            <Stack spacing={1}>
                              {option.coverageDetails.map((detail, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                  }}
                                >
                                  <CheckCircle size={16} color={theme.palette.success.main} />
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: theme.palette.text.secondary
                                    }}
                                  >
                                    {detail}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Stack>

                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {option.features.map((feature, index) => (
                              <Chip
                                key={index}
                                label={feature}
                                size="small"
                                icon={<Shield size={16} />}
                                sx={{
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  '& .MuiChip-icon': {
                                    color: theme.palette.primary.main
                                  }
                                }}
                              />
                            ))}
                          </Stack>

                          {option.limitations && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                                p: 2,
                                borderRadius: 1,
                                bgcolor: alpha(theme.palette.warning.main, 0.1)
                              }}
                            >
                              <AlertCircle size={20} color={theme.palette.warning.main} />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.palette.warning.main
                                }}
                              >
                                {option.limitations}
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </RadioGroup>
      </Stack>
    </motion.div>
  );
}; 