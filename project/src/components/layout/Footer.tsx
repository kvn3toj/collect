import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import logoLight from '/images/LOGO/logo-aretrust-light.png';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? 3 : 2,
          }}
        >
          {/* Logo/Brand Name */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={logoLight}
              alt="ARE Trüst Logo"
              sx={{
                height: 40,
                width: 'auto',
              }}
            />
          </Box>

          {/* Copyright */}
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.8rem',
              color: alpha('#fff', 0.7),
              textAlign: isMobile ? 'center' : 'right',
            }}
          >
            © {new Date().getFullYear()} ARE Trüst. All rights reserved.
          </Typography>

          {/* Legal Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-end',
            }}
          >
            <Typography
              component={Link}
              to="/privacy"
              variant="caption"
              sx={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.8rem',
                color: alpha('#fff', 0.7),
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.secondary.main,
                  textDecoration: 'underline',
                },
                transition: 'color 0.2s',
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component={Link}
              to="/terms"
              variant="caption"
              sx={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.8rem',
                color: alpha('#fff', 0.7),
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.secondary.main,
                  textDecoration: 'underline',
                },
                transition: 'color 0.2s',
              }}
            >
              Terms & Conditions
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;