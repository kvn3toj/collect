import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, Clock, Calendar, MessageSquare } from 'lucide-react';
import { usePremiumStore } from '../../stores/premiumStore';
import { CareProgram as CareProgramType, CareServiceRequest } from '../../types/premium.types';

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

export const CareProgram: React.FC = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CareServiceRequest>();
  const { fetchCarePrograms, requestCareService, carePrograms, isLoading, error, resetError } = usePremiumStore();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCarePrograms();
  }, []);

  const onSubmit = async (data: CareServiceRequest) => {
    try {
      await requestCareService(data);
      setSuccess(true);
      reset();
    } catch (error) {
      // Error is handled by the store
    }
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

  if (success) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInUp}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)'
          }}
        >
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              Care Service Requested
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px'
              }}
            >
              Thank you for requesting our care service. We will contact you shortly to schedule your appointment.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setSuccess(false)}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontFamily: 'Inter',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              Request Another Service
            </Button>
          </Stack>
        </Paper>
      </motion.div>
    );
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
            Premium Care Program
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '800px'
            }}
          >
            Our comprehensive care program ensures your precious gems maintain their brilliance and value for generations to come.
          </Typography>
        </Box>

        <motion.div variants={staggerContainer}>
          <Grid container spacing={4}>
            {carePrograms.map((program) => (
              <Grid item xs={12} md={6} key={program.id}>
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
                          <Shield size={24} color={theme.palette.primary.main} />
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: 'Playfair Display',
                              fontWeight: 600,
                              color: theme.palette.text.primary
                            }}
                          >
                            {program.status}
                          </Typography>
                        </Box>

                        <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Calendar size={20} color={theme.palette.text.secondary} />
                            <Typography variant="body1" color="text.secondary">
                              Next Service: {new Date(program.nextServiceDate).toLocaleDateString()}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Clock size={20} color={theme.palette.text.secondary} />
                            <Typography variant="body1" color="text.secondary">
                              Last Service: {new Date(program.lastServiceDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack spacing={1}>
                          {program.services.map((service, index) => (
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
                              <Shield size={16} />
                              {service}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'Playfair Display',
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 2
                    }}
                  >
                    Request Care Service
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary
                    }}
                  >
                    Schedule a professional care service for your precious gem.
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Service Type</InputLabel>
                      <Select
                        {...register('serviceType', { required: 'Please select a service type' })}
                        error={!!errors.serviceType}
                        label="Service Type"
                      >
                        <MenuItem value="cleaning">Professional Cleaning</MenuItem>
                        <MenuItem value="inspection">Detailed Inspection</MenuItem>
                        <MenuItem value="repair">Minor Repairs</MenuItem>
                        <MenuItem value="restoration">Restoration</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Preferred Date"
                      type="date"
                      {...register('preferredDate', { required: 'Please select a preferred date' })}
                      error={!!errors.preferredDate}
                      helperText={errors.preferredDate?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Additional Notes"
                      {...register('notes')}
                      InputProps={{
                        startAdornment: <MessageSquare size={20} style={{ marginRight: 8, marginTop: 8 }} />
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4]
                      }
                    }}
                  >
                    Request Service
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </motion.div>
      </Stack>
    </motion.div>
  );
}; 