import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper, Alert, CircularProgress, Container, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import { UpdatePasswordData } from '../../types/user.types';
import { useTheme } from '@mui/material/styles';

const ResetPasswordPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<UpdatePasswordData>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const password = watch('password');
  
  const onSubmit = async (data: UpdatePasswordData) => {
    if (!token) {
      setErrorMessage('Invalid or missing reset token');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      await authService.updatePassword({ ...data, token });
      navigate('/login', { 
        state: { 
          message: 'Password has been reset successfully. Please login with your new password.' 
        } 
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Unable to reset password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!token) {
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
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 0,
                '& .MuiAlert-icon': {
                  color: theme.palette.error.main,
                },
              }}
            >
              Invalid or missing reset token. Please request a new password reset link.
            </Alert>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                onClick={() => navigate('/forgot-password')} 
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
                Request New Reset Link
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    );
  }
  
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
            Reset Your Password
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
            Please enter your new password below
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
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
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
            
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
                "Reset Password"
              )}
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ResetPasswordPage; 