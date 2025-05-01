import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper, Stack, Alert, CircularProgress } from '@mui/material';
import { authService } from '../../services/authService';
import { RegisterData } from '../../types/user.types';
import useAuthStore from '../../stores/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterData>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuthStore();
  
  const password = watch("password", "");
  
  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await authService.register(data);
      // Store token and user data
      login(response.token, response.user);
      navigate('/account');
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Registration failed. Please try again.'
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
          Create Account
        </Typography>
        
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Join ARE Trüst to experience luxury jewelry
        </Typography>
        
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box display="flex" gap={2}>
              <TextField
                label="First Name"
                fullWidth
                {...register("firstName", { 
                  required: "First name is required" 
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              
              <TextField
                label="Last Name"
                fullWidth
                {...register("lastName", { 
                  required: "Last name is required" 
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Box>
            
            <TextField
              label="Email"
              type="email"
              fullWidth
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
            
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: value => 
                  value === password || "Passwords do not match"
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ 
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
                "Create Account"
              )}
            </Button>
          </Stack>
        </form>
        
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#876445', textDecoration: 'none' }}>
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage; 