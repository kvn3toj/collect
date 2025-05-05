import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link, Divider } from '@mui/material';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import logoDark from '/images/LOGO/logo-aretrust-dark.png';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 6, md: 8 },
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo y Descripción */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ mb: 3 }}>
                <img
                  src={logoDark}
                  alt="ARETrust"
                  style={{ height: 40, marginBottom: 16 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: 'Lato',
                    lineHeight: 1.6,
                    maxWidth: 300
                  }}
                >
                  Joyería artesanal de alta gama, donde cada pieza cuenta una historia única de elegancia y sofisticación.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Enlaces Rápidos */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: 'Lato',
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                Colección
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link
                  href="/products/rings"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Anillos
                </Link>
                <Link
                  href="/products/necklaces"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Collares
                </Link>
                <Link
                  href="/products/earrings"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Pendientes
                </Link>
              </Box>
            </motion.div>
          </Grid>

          {/* Información */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: 'Lato',
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                Información
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link
                  href="/about"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Sobre Nosotros
                </Link>
                <Link
                  href="/contact"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Contacto
                </Link>
                <Link
                  href="/craftsmanship"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Nuestra Artesanía
                </Link>
                <Link
                  href="/care-program"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Programa de Cuidado
                </Link>
                <Link
                  href="/privacy"
                  color="text.secondary"
                  sx={{
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': { color: 'gold.main' },
                    fontFamily: 'Lato'
                  }}
                >
                  Privacidad
                </Link>
              </Box>
            </motion.div>
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: 'Lato',
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                Contacto
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: 'Lato' }}
                >
                  Calle Principal 123
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: 'Lato' }}
                >
                  Madrid, España
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: 'Lato' }}
                >
                  +34 900 123 456
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: 'Lato' }}
                >
                  info@aretrust.com
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Redes Sociales y Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: 'Lato' }}
            >
              © {new Date().getFullYear()} ARETrust. Todos los derechos reservados.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': { color: 'gold.main' }
                }}
              >
                <Facebook size={20} />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': { color: 'gold.main' }
                }}
              >
                <Instagram size={20} />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': { color: 'gold.main' }
                }}
              >
                <Twitter size={20} />
              </IconButton>
              <IconButton
                href="mailto:info@aretrust.com"
                sx={{
                  color: 'text.secondary',
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': { color: 'gold.main' }
                }}
              >
                <Mail size={20} />
              </IconButton>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;