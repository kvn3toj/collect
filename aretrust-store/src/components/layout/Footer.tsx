import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Divider,
  useTheme
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

/**
 * Componente de pie de página
 */
const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        pt: 6,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                display: 'block',
                mb: 2,
              }}
            >
              ARETRUST
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Esmeraldas colombianas de la más alta calidad. Joyas exclusivas con certificado de origen y autenticidad.
            </Typography>
            
            {/* Redes sociales */}
            <Box sx={{ mt: 2 }}>
              <IconButton 
                aria-label="Instagram" 
                component="a" 
                href="https://instagram.com/aretrust" 
                target="_blank"
                sx={{ color: 'white', mr: 1 }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                aria-label="Facebook" 
                component="a" 
                href="https://facebook.com/aretrust" 
                target="_blank"
                sx={{ color: 'white', mr: 1 }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                aria-label="WhatsApp" 
                component="a" 
                href="https://wa.me/1234567890" 
                target="_blank"
                sx={{ color: 'white' }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>
          
          {/* Enlaces rápidos */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'var(--font-display)' }}>
              Enlaces
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Inicio
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/collection" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Colección
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/customize" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Personalizar
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/login" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Mi Cuenta
                </Link>
              </Box>
            </Box>
          </Grid>
          
          {/* Páginas legales */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'var(--font-display)' }}>
              Legal
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/terms" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Términos y Condiciones
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/privacy" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Política de Privacidad
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/shipping" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Envíos y Devoluciones
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link 
                  component={RouterLink} 
                  to="/legal" 
                  sx={{ color: 'white', textDecoration: 'none', opacity: 0.9, '&:hover': { opacity: 1 } }}
                >
                  Aviso Legal
                </Link>
              </Box>
            </Box>
          </Grid>
          
          {/* Contacto */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'var(--font-display)' }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20, opacity: 0.9 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Calle Principal 123, Madrid, España
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20, opacity: 0.9 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +34 91 123 45 67
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20, opacity: 0.9 }} />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                info@aretrust.store
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 5, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} ARETRUST, S.L. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 