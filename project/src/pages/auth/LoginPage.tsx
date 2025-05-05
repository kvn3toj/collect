import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  alpha,
} from '@mui/material';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../../stores/authStore';
import { authService } from '../../services/authService';
import { useTheme } from '@mui/material/styles';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      await login({ email, password });
      const user = useAuthStore.getState().user;
      
      if (user?.role === 'ADMIN' || user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
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
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            borderRadius: 0,
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: alpha(theme.palette.divider, 0.5),
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: theme.palette.text.primary,
              }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.01em',
              }}
            >
              Sign in to your account to continue
            </Typography>
          </Box>
          
          {error && (
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
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
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
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 3 }}>
              <Link 
                component={RouterLink} 
                to="/forgot-password"
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LogIn />}
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
          
          <Divider sx={{ my: 4 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontFamily: "'Lato', sans-serif",
                px: 2,
              }}
            >
              OR
            </Typography>
          </Divider>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body2"
              sx={{
                fontFamily: "'Lato', sans-serif",
                color: theme.palette.text.secondary,
              }}
            >
              Don't have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/register"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.dark,
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default LoginPage; 