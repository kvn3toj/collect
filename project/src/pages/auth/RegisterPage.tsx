import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Box, TextField, Button, Paper, Stack, Alert, CircularProgress, Container, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import { RegisterData, LoginCredentials } from '../../types/user.types';
import useAuthStore from '../../stores/authStore';
import { useTheme } from '@mui/material/styles';

interface ExtendedRegisterData extends RegisterData {
  confirmPassword: string;
}

const RegisterPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ExtendedRegisterData>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuthStore();
  
  const password = watch("password", "");
  
  const onSubmit = async (data: ExtendedRegisterData) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const { confirmPassword, ...registerData } = data;
      const response = await authService.register(registerData);
      await login({ email: data.email, password: data.password });
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
            Create Account
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
            Join ARE Trüst to experience luxury jewelry
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
                  label="Last Name"
                  fullWidth
                  {...register("lastName", { 
                    required: "Last name is required" 
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
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
                  "Create Account"
                )}
              </Button>
            </Stack>
          </form>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mt: 4,
              fontFamily: "'Lato', sans-serif",
              color: theme.palette.text.secondary,
            }}
          >
            Already have an account?{' '}
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
        </Paper>
      </motion.div>
    </Container>
  );
};

export default RegisterPage; 