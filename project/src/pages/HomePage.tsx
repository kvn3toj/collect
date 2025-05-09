import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  alpha,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight } from '@mui/icons-material';
import logoLight from '/images/LOGO/logo-aretrust-light.png';
import ProductCard from '../components/products/ProductCard';
import Slider from 'react-slick';
import { productService } from '../services/productService';
import { Product } from '../types/product.types';

// IDs de los productos destacados (lotes más valiosos)
const FEATURED_PRODUCT_IDS = ['lote-003', 'lote-004', 'lote-006'];

const VideoBackground: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto play video when loaded and set playback rate
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Hace el video 25% más lento
      videoRef.current.play().catch(error => {
        console.error("Video autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45))',
          zIndex: 1,
        },
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

const HomePage: React.FC = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Usar el servicio de productos para obtener datos reales
        const response = await productService.getAllProducts();
        setProducts(response.products || []);
        
        // Comentado: Usando datos mock estáticos para visualización
        // setProducts([]);
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
      return '/images/products/lote-2.jpg';
    } else if (lower.includes('necklace') || lower.includes('collar')) {
      return '/images/products/lote-9.jpg';
    } else if (lower.includes('earring') || lower.includes('arete')) {
      return '/images/products/lote-3.jpg';
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
            zIndex: 1,
          },
        }}
      >
        <VideoBackground src="/images/Generated File May 04, 2025 - 5_58PM.mp4" />
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
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
            </motion.div>

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

      {/* Categories Section */}
      <Box sx={{ 
        py: { xs: 10, md: 16 }, 
        backgroundColor: '#fff', 
        mt: { xs: 8, md: 12 },
        borderTop: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.5),
      }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: '2.25rem', md: '3rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: { xs: 6, md: 8 },
              color: theme.palette.text.primary,
              letterSpacing: '-0.02em',
            }}
          >
            Explore Categories
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'Emerald Rings',
                link: '/products?category=rings',
                image: '/images/d673450f-66d5-4a71-80ba-ecfe1f359107.jpg',
                video: '/images/Generated File May 05, 2025 - 3_18AM.mp4',
                hasVideo: true,
              },
              {
                name: 'Emerald Necklaces',
                link: '/products?category=necklaces',
                image: '/images/3c495f60-1ad7-42c5-8f51-c3654b5ac2e8.jpg',
              },
              {
                name: 'Emerald Earrings',
                link: '/products?category=earrings',
                image: '/images/d3fa3cb8-c124-49d5-aac7-f4617eff184b.jpg',
                video: '/images/Generated File May 05, 2025 - 3_43AM.mp4',
                hasVideo: true,
              },
            ].map((category, index) => (
              <Grid item xs={12} md={4} key={category.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card
                    component={RouterLink}
                    to={category.link}
                    sx={{
                      height: '100%',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        '& .category-overlay': {
                          opacity: 1,
                        },
                        '& .category-image': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      {category.hasVideo ? (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                          }}
                        >
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="category-image"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.6s ease',
                            }}
                          >
                            <source src={category.video} type="video/mp4" />
                          </video>
                        </Box>
                      ) : (
                        <Box
                          className="category-image"
                          component="img"
                          src={category.image}
                          alt={category.name}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease',
                          }}
                        />
                      )}
                      <Box
                        className="category-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.4s ease',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            color: '#fff',
                            fontFamily: "'Playfair Display', serif",
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            fontWeight: 500,
                            textAlign: 'center',
                            px: 2,
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Collection Section */}
      <Box sx={{ mt: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg" sx={{ mb: { xs: 10, md: 16 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: '2.25rem', md: '3rem' },
                mb: 2.5,
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
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                lineHeight: 1.8,
                fontFamily: "'Lato', sans-serif",
                letterSpacing: '0.01em',
                mb: 2,
              }}
            >
              Our most cherished pieces, handcrafted with ethically sourced emeralds and precious metals.
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress size={40} />
            </Box>
          ) : featuredProducts.length > 0 ? (
            <Slider {...sliderSettings}>
              {featuredProducts.map((product) => (
                <Box key={product.id} px={3}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Slider>
          ) : (
            // Mostrar fallback para despliegue visual
            <Slider {...sliderSettings}>
              {[
                { id: 1, image: '/images/749e42ef-869e-49a8-a238-9e5725010f18.jpg' },
                { id: 2, image: '/images/254ef962-f015-4592-b93c-d4b41fa68779.jpg', hasVideo: true, video: '/images/Generated File May 04, 2025 - 5_58PM.mp4' },
                { id: 3, image: '/images/7da09dc3-f35d-4058-a143-feb868917677.jpg' }
              ].map((item) => (
                <Box key={item.id} px={3}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      borderRadius: '4px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: '#FFFFFF',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      }
                    }}
                  >
                    <Box sx={{ 
                      position: 'relative', 
                      paddingTop: '100%', 
                      bgcolor: '#f7f7f7' 
                    }}>
                      {item.hasVideo ? (
                        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              padding: '5%',
                            }}
                          >
                            <source src={item.video} type="video/mp4" />
                          </video>
                        </Box>
                      ) : (
                        <Box
                          component="img"
                          src={item.image}
                          alt={`Featured Product ${item.id}`}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            padding: '5%',
                          }}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '1.3rem',
                          fontWeight: 600,
                          mb: 1.5,
                          color: theme.palette.text.primary,
                        }}
                      >
                        Emerald Lot #{item.id}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha(theme.palette.text.primary, 0.7),
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '0.9rem',
                          mb: 2,
                          lineHeight: 1.5,
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
                          letterSpacing: '0.02em',
                        }}
                      >
                        {formatPrice(item.id * 1000000)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;