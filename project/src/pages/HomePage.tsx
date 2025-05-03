import React, { useState, useEffect, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Divider,
  TextField,
  alpha,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward, ArrowRight } from '@mui/icons-material';
import ProductImage from '../components/products/ProductImage';
import logoLight from '/images/LOGO/logo-aretrust-light.png';
import ProductCard from '../components/products/ProductCard';
import Slider from 'react-slick';
import { productService } from '../services/productService';
import { Product } from '../types/product.types';

// Hero section background image
const HERO_IMAGE = "/images/fondo.png";

// IDs de los productos destacados (lotes más valiosos)
const FEATURED_PRODUCT_IDS = ['lote-003', 'lote-004', 'lote-006'];

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Comentado para despliegue visual estático en Vercel
        // const response = await productService.getAllProducts();
        // setProducts(response.products || []);
        
        // Usando datos mock estáticos para visualización
        setProducts([]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos destacados (lotes específicos de alto valor)
  const featuredProducts = useMemo(() => {
    return products.filter(product => 
      FEATURED_PRODUCT_IDS.includes(product.id) ||
      FEATURED_PRODUCT_IDS.includes(product.codigo)
    );
  }, [products]);

  // Settings para el carrusel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 900, settings: { slidesToShow: 1 } },
    ],
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Helper para formatear precio USD
  const formatPrice = (value: number | null | undefined): string => {
    if (value == null) return "";
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper para asignar imagen real de producto a cada categoría
  const getCategoryImage = (categoryName: string): string => {
    const lower = categoryName.toLowerCase();
    if (lower.includes('ring') || lower.includes('anillo')) {
      return '/images/products/anillo-cabujon-circones.jpg';
    } else if (lower.includes('necklace') || lower.includes('collar')) {
      return '/images/products/lote-9.jpg';
    } else if (lower.includes('earring') || lower.includes('arete')) {
      return '/images/products/par-aretes-plata.jpg';
    }
    return '/images/placeholder-category.jpg';
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '80vh', md: '92vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(/images/fondo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { xs: '80vh', md: '92vh' },
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src={logoLight}
              alt="ARE Trüst Logo"
              sx={{
                height: { xs: 50, md: 70 },
                width: 'auto',
                mb: { xs: 4, md: 6 },
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))',
              }}
            />

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: '2.75rem', sm: '3.75rem', md: '5rem' },
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  mb: 2,
                  textShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                Timeless Elegance
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: '1.5rem', md: '2.25rem' },
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  mb: 3,
                  fontStyle: 'italic',
                }}
              >
                Crafted with Passion
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 300,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.95)',
                  maxWidth: '700px',
                  mx: 'auto',
                  mb: 5,
                  letterSpacing: '0.015em',
                }}
              >
                Discover our collection of exquisite Colombian emeralds and fine jewelry pieces
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <Button
                component={RouterLink}
                to="/products"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  px: 4,
                  py: 1.75,
                  fontSize: '1.125rem',
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'none',
                  borderRadius: 0,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  backgroundColor: alpha(theme.palette.primary.main, 0.9),
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.25)',
                    backgroundColor: theme.palette.primary.main,
                  },
                  transition: 'all 0.4s ease',
                }}
              >
                Explore Collection
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Featured Products Section (Carrusel con lotes específicos) */}
      <Box sx={{ mt: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 12 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: '2rem', md: '2.75rem' },
                mb: 2,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: theme.palette.text.primary,
              }}
            >
              Featured Collection
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ 
                maxWidth: '700px', 
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                fontFamily: "'Lato', sans-serif",
                letterSpacing: '0.01em',
              }}
            >
              Our most cherished pieces, handcrafted with ethically sourced emeralds and precious metals.
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={40} />
            </Box>
          ) : featuredProducts.length > 0 ? (
            <Slider {...sliderSettings}>
              {featuredProducts.map((product) => (
                <Box key={product.id} px={2}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Slider>
          ) : (
            // Mostrar fallback para despliegue visual
            <Slider {...sliderSettings}>
              {[1, 2, 3].map((i) => (
                <Box key={i} px={2}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      borderRadius: 0,
                      boxShadow: 'none',
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: '#FFFFFF',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '100%', bgcolor: '#f5f5f5' }}>
                      <Box
                        component="img"
                        src={`/images/products/lote-${i}.jpg`}
                        alt={`Featured Product ${i}`}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '10%',
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "'Times New Roman', serif",
                          fontSize: '1.2rem',
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        Emerald Lot #{i}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#555555',
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '0.85rem',
                          mb: 2,
                        }}
                      >
                        Premium quality emerald collection
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Lato', sans-serif",
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {formatPrice(i * 1000000)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          )}
        </Container>
      </Box>

      {/* Categories Section refinada */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fff', mt: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 6,
              color: theme.palette.text.primary,
            }}
          >
            Explore Categories
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                name: 'Emerald Rings',
                link: '/products?category=rings',
              },
              {
                name: 'Emerald Necklaces',
                link: '/products?category=necklaces',
              },
              {
                name: 'Emerald Earrings',
                link: '/products?category=earrings',
              },
            ].map((category, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box
                  component={RouterLink}
                  to={category.link || `/products?category=placeholder`}
                  sx={{
                    position: 'relative',
                    display: 'block',
                    height: { xs: 200, md: 300 },
                    overflow: 'hidden',
                    borderRadius: 3,
                    textDecoration: 'none',
                    boxShadow: 'none',
                    background: `url(${getCategoryImage(category.name)}) no-repeat center center`,
                    backgroundSize: 'cover',
                    backgroundColor: '#f8f9fa',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '80%',
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)',
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      '&::after': {
                        opacity: 0.85,
                      },
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      position: 'absolute',
                      bottom: { xs: 16, md: 24 },
                      left: { xs: 16, md: 24 },
                      right: { xs: 16, md: 24 },
                      color: '#FFFFFF',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      fontWeight: 700,
                      textShadow: '0 4px 16px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.5)',
                      zIndex: 1,
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;