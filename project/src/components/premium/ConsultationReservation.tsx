import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import { usePremiumStore } from '../../stores/premiumStore';
import { ConsultationReservationRequest } from '../../types/premium.types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const ConsultationReservation: React.FC = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ConsultationReservationRequest>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [success, setSuccess] = useState(false);

  const { reserveConsultation, isLoading, error, resetError } = usePremiumStore();

  const onSubmit = async (data: ConsultationReservationRequest) => {
    if (!selectedDate || !selectedTime) return;

    try {
      await reserveConsultation({
        ...data,
        date: selectedDate,
        time: selectedTime
      });
      setSuccess(true);
      reset();
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      // Error is handled by the store
    }
  };

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
              Consultation Reserved
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px'
              }}
            >
              Thank you for scheduling a consultation. We will contact you shortly to confirm your appointment.
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
              Schedule Another Consultation
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
              Schedule a Consultation
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary
              }}
            >
              Book a personalized consultation with our gem experts to discuss your needs and preferences.
            </Typography>
          </Box>

          {error && (
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
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        startAdornment: <Calendar size={20} style={{ marginRight: 8 }} />
                      }
                    }
                  }}
                />

                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        startAdornment: <Clock size={20} style={{ marginRight: 8 }} />
                      }
                    }
                  }}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                label="Consultation Type"
                {...register('type', { required: 'Please select a consultation type' })}
                error={!!errors.type}
                helperText={errors.type?.message}
                InputProps={{
                  startAdornment: <MessageSquare size={20} style={{ marginRight: 8 }} />
                }}
              />

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

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !selectedDate || !selectedTime}
                sx={{
                  mt: 2,
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
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Schedule Consultation'
                )}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </motion.div>
  );
}; 