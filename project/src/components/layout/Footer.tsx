import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#F8F8F8',
        pt: 8,
        pb: 4,
        mt: 8,
        borderTop: '1px solid #E0E0E0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand & Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                mb: 2, 
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              ARETrust
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, maxWidth: 300 }}>
              Discover the finest luxury emeralds and bespoke jewelry pieces, crafted with exceptional quality and ethical sourcing.
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Subscribe to our newsletter
            </Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              >
                Subscribe
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                aria-label="instagram" 
                size="small"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                <Instagram size={20} />
              </IconButton>
              <IconButton 
                aria-label="facebook" 
                size="small"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                <Facebook size={20} />
              </IconButton>
              <IconButton 
                aria-label="twitter" 
                size="small"
                sx={{ 
                  color: theme.palette.text.secondary,
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                <Twitter size={20} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              component="h6" 
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography 
                component={Link} 
                to="/products?category=emeralds"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Emeralds
              </Typography>
              <Typography 
                component={Link} 
                to="/products?category=rings"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Rings
              </Typography>
              <Typography 
                component={Link} 
                to="/products?category=necklaces"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Necklaces
              </Typography>
              <Typography 
                component={Link} 
                to="/products?category=earrings"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Earrings
              </Typography>
              <Typography 
                component={Link} 
                to="/products?category=bracelets"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Bracelets
              </Typography>
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              component="h6" 
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography 
                component={Link} 
                to="/about"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                About Us
              </Typography>
              <Typography 
                component={Link} 
                to="/our-story"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Our Story
              </Typography>
              <Typography 
                component={Link} 
                to="/sustainability"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Sustainability
              </Typography>
              <Typography 
                component={Link} 
                to="/blog"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Journal
              </Typography>
              <Typography 
                component={Link} 
                to="/careers"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Careers
              </Typography>
            </Box>
          </Grid>

          {/* Customer Service Links */}
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              component="h6" 
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography 
                component={Link} 
                to="/faq"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                FAQ
              </Typography>
              <Typography 
                component={Link} 
                to="/shipping"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Shipping
              </Typography>
              <Typography 
                component={Link} 
                to="/returns"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Returns
              </Typography>
              <Typography 
                component={Link} 
                to="/care"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Jewelry Care
              </Typography>
              <Typography 
                component={Link} 
                to="/contact"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                  transition: 'color 0.2s',
                }}
              >
                Contact Us
              </Typography>
            </Box>
          </Grid>

          {/* Contact info */}
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              component="h6" 
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              1234 Luxury Lane
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              New York, NY 10001
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              United States
            </Typography>
            <Typography 
              variant="body2" 
              component="a" 
              href="mailto:contact@aretrust.store"
              sx={{ 
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': { color: theme.palette.primary.main },
                display: 'block',
                mb: 1,
              }}
            >
              contact@aretrust.store
            </Typography>
            <Typography 
              variant="body2" 
              component="a" 
              href="tel:+12125551234"
              sx={{ 
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              +1 (212) 555-1234
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 4 }} />
        
        {/* Bottom footer */}
        <Grid 
          container 
          justifyContent="space-between" 
          alignItems="center"
          direction={isMobile ? 'column' : 'row'}
          spacing={isMobile ? 2 : 0}
        >
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} ARETrust. All rights reserved.
            </Typography>
          </Grid>
          <Grid item>
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
                to="/terms"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Terms
              </Typography>
              <Typography 
                component={Link} 
                to="/privacy"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Privacy
              </Typography>
              <Typography 
                component={Link} 
                to="/accessibility"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Accessibility
              </Typography>
              <Typography 
                component={Link} 
                to="/legal"
                variant="body2"
                sx={{ 
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  '&:hover': { color: theme.palette.primary.main },
                }}
              >
                Legal
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;