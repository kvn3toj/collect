import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme,
  useMediaQuery,
  alpha,
  Grid,
  Link
} from '@mui/material';
import logoLight from '/images/LOGO/logo-aretrust-light.png';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1A472A', // Verde oscuro
        color: 'grey.400',
        py: 4,
        borderTop: '1px solid',
        borderColor: alpha('#fff', 0.1),
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 4 : 3}>
          {/* Logo Column */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                mb: isMobile ? 2 : 0,
              }}
            >
              <Box
                component="img"
                src={logoLight}
                alt="ARE Trüst Logo"
                sx={{
                  height: 40,
                  width: 'auto',
                  mb: 2,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.8rem',
                  color: alpha('#fff', 0.7),
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                © {new Date().getFullYear()} ARE Trüst. All rights reserved.
              </Typography>
            </Box>
          </Grid>

          {/* Shop Column */}
          <Grid item xs={6} sm={6} md={2} lg={2} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: "'Lato', sans-serif", 
                fontWeight: 600, 
                color: theme.palette.common.white,
                mb: 2,
                fontSize: '1rem'
              }}
            >
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link 
                component={RouterLink} 
                to="/collections"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Collections
              </Link>
              <Link 
                component={RouterLink} 
                to="/new-arrivals"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                New Arrivals
              </Link>
            </Box>
          </Grid>

          {/* Company Column */}
          <Grid item xs={6} sm={6} md={2} lg={2} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: "'Lato', sans-serif", 
                fontWeight: 600, 
                color: theme.palette.common.white,
                mb: 2,
                fontSize: '1rem'
              }}
            >
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link 
                component={RouterLink} 
                to="/about"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Sobre Nosotros
              </Link>
              <Link 
                component={RouterLink} 
                to="/approach"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Nuestro Enfoque
              </Link>
              <Link 
                component={RouterLink} 
                to="/certifications"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Certificaciones
              </Link>
            </Box>
          </Grid>

          {/* Learn More Column */}
          <Grid item xs={6} sm={6} md={2} lg={2} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: "'Lato', sans-serif", 
                fontWeight: 600, 
                color: theme.palette.common.white,
                mb: 2,
                fontSize: '1rem'
              }}
            >
              Learn More
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link 
                component={RouterLink} 
                to="/process"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Proceso Artesanal
              </Link>
              <Link 
                component={RouterLink} 
                to="/origin"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Origen de las Esmeraldas
              </Link>
              <Link 
                component={RouterLink} 
                to="/jewelry-care"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Cuidado de Joyas
              </Link>
            </Box>
          </Grid>

          {/* Support Column */}
          <Grid item xs={6} sm={6} md={2} lg={2} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: "'Lato', sans-serif", 
                fontWeight: 600, 
                color: theme.palette.common.white,
                mb: 2,
                fontSize: '1rem'
              }}
            >
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link 
                component={RouterLink} 
                to="/contact"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Contact Us
              </Link>
              <Link 
                component={RouterLink} 
                to="/privacy"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Privacy Policy
              </Link>
              <Link 
                component={RouterLink} 
                to="/terms"
                sx={{ 
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: 'grey.400',
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                  transition: 'color 0.2s'
                }}
              >
                Terms & Conditions
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;