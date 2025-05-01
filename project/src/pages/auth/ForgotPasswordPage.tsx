import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper, Alert, CircularProgress } from '@mui/material';
import { authService } from '../../services/authService';
import { ResetPasswordData } from '../../types/user.types';

const ForgotPasswordPage = () => {
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
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      py: 5 
    }}>
      <Paper elevation={3} sx={{ 
        maxWidth: 500, 
        width: '100%', 
        p: 4, 
        borderRadius: 2 
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Reset Password
        </Typography>
        
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Enter your email and we'll send instructions to reset your password
        </Typography>
        
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        
        {success ? (
          <Box>
            <Alert severity="success" sx={{ mb: 3 }}>
              Password reset instructions have been sent to your email. Please check your inbox.
            </Alert>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                component={Link} 
                to="/login" 
                variant="contained"
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
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
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ 
                mt: 3,
                bgcolor: 'primary.main',
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
            
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Remember your password?{' '}
              <Link to="/login" style={{ color: '#876445', textDecoration: 'none' }}>
                Sign In
              </Link>
            </Typography>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage; 