import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper, Alert, CircularProgress, Container, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import { ResetPasswordData } from '../../types/user.types';
import { useTheme } from '@mui/material/styles';

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordData>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const onSubmit = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      await authService.resetPassword(data);
      setSuccess(true);
    } catch (error: any) {
      console.error('Reset password request error:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Unable to process reset request. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            maxWidth: 500, 
            width: '100%', 
            p: { xs: 3, sm: 4 }, 
            borderRadius: 0,
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.5),
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Reset Password
          </Typography>
          
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              mb: 4,
              fontFamily: "'Lato', sans-serif",
              color: theme.palette.text.secondary,
              fontSize: '1rem',
              letterSpacing: '0.01em',
            }}
          >
            Enter your email and we'll send instructions to reset your password
          </Typography>
          
          {errorMessage && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 0,
                '& .MuiAlert-icon': {
                  color: theme.palette.error.main,
                },
              }}
            >
              {errorMessage}
            </Alert>
          )}
          
          {success ? (
            <Box>
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  borderRadius: 0,
                  '& .MuiAlert-icon': {
                    color: theme.palette.success.main,
                  },
                }}
              >
                Password reset instructions have been sent to your email. Please check your inbox.
              </Alert>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="contained"
                  sx={{ 
                    py: 1.5,
                    borderRadius: 0,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Return to Login
                </Button>
              </Box>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                sx={{ 
                  mt: 3,
                  py: 1.5,
                  borderRadius: 0,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send Reset Instructions"
                )}
              </Button>
              
              <Typography 
                variant="body2" 
                align="center" 
                sx={{ 
                  mt: 4,
                  fontFamily: "'Lato', sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: theme.palette.primary.main, 
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      color: theme.palette.primary.dark,
                    },
                    transition: 'color 0.2s ease',
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </form>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ForgotPasswordPage; 