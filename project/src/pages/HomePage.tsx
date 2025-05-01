import React from 'react';
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
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import ProductImage from '../components/products/ProductImage';

// Hero section background image
const HERO_IMAGE = "https://images.pexels.com/photos/6766260/pexels-photo-6766260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Featured collection
  const featuredCollection = [
    {
      id: '1',
      name: 'Colombian Emerald Ring',
      price: 2499,
      image: 'https://images.pexels.com/photos/10961577/pexels-photo-10961577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      name: 'Emerald Teardrop Necklace',
      price: 3299,
      image: 'https://images.pexels.com/photos/12351222/pexels-photo-12351222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      name: 'Raw Emerald Bracelet',
      price: 1899,
      image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '4',
      name: 'Emerald Stud Earrings',
      price: 1499,
      image: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  // Categories 
  const categories = [
    {
      name: 'Emerald Rings',
      image: 'https://images.pexels.com/photos/10961577/pexels-photo-10961577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products?category=rings',
    },
    {
      name: 'Emerald Necklaces',
      image: 'https://images.pexels.com/photos/12351222/pexels-photo-12351222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products?category=necklaces',
    },
    {
      name: 'Emerald Earrings',
      image: 'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products?category=earrings',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 6, md: 10 },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={HERO_IMAGE}
          alt="Luxury emerald jewelry"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)',
            zIndex: -1,
          }}
        />
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box 
              sx={{ 
                maxWidth: { xs: '100%', md: '60%' },
                color: 'white',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Timeless Elegance in Every Emerald
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  opacity: 0.9,
                  fontFamily: "'Lato', sans-serif",
                  letterSpacing: '0.01em',
                }}
              >
                Discover our collection of ethically sourced emeralds and bespoke jewelry pieces, crafted with exceptional quality and attention to detail.
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <Button
                  component={RouterLink}
                  to="/products"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  Explore Collection
                </Button>
                <Button
                  component={RouterLink}
                  to="/customize"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Custom Design
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Products Section */}
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

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {featuredCollection.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card
                  component={RouterLink}
                  to={`/products/${product.id}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    borderRadius: 0,
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      '& .product-image': {
                        transform: 'scale(1.05)',
                      }
                    },
                  }}
                >
                  <Box sx={{ 
                    height: { xs: 240, md: 280 }, 
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <ProductImage 
                      src={product.image}
                      alt={product.name}
                      height={280}
                      className="product-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    textAlign: 'center',
                    p: { xs: 2, md: 3 },
                  }}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ 
                        mb: 1, 
                        color: 'text.primary',
                        fontFamily: "'Playfair Display', serif",
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        fontWeight: 500,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                      }}
                    >
                      ${product.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
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
              Shop by Category
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
              Explore our curated collections of emerald jewelry, each piece telling its own unique story.
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {categories.map((category) => (
              <Grid item xs={12} md={4} key={category.name}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <Card
                    component={RouterLink}
                    to={category.link}
                    sx={{
                      height: { xs: 240, md: 320 },
                      position: 'relative',
                      borderRadius: 0,
                      overflow: 'hidden',
                      boxShadow: 'none',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                        '& .category-image': {
                          transform: 'scale(1.05)',
                        },
                        '& .category-overlay': {
                          backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        }
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <Box
                      className="category-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        transition: 'background-color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: 'white',
                          fontFamily: "'Playfair Display', serif",
                          fontSize: { xs: '1.5rem', md: '2rem' },
                          fontWeight: 600,
                          letterSpacing: '0.02em',
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Custom Design Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
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
            Design Your Dream Piece
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ 
              mb: 4,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              fontFamily: "'Lato', sans-serif",
              letterSpacing: '0.01em',
            }}
          >
            Create a unique piece of jewelry that reflects your personal style. Our expert craftsmen will bring your vision to life with the finest materials and exceptional attention to detail.
          </Typography>
          <Button
            component={RouterLink}
            to="/customize"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }
            }}
          >
            Start Designing
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;