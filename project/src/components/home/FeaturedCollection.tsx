import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProductImage from '../products/ProductImage';

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Colombian Emerald Ring',
    price: 2500,
    image: '/images/products/emerald-ring-1.jpg',
    category: 'emeralds'
  },
  {
    id: 2,
    name: 'Emerald Pendant',
    price: 1800,
    image: '/images/products/emerald-pendant-1.jpg',
    category: 'emeralds'
  },
  {
    id: 3,
    name: 'Diamond Earrings',
    price: 3200,
    image: '/images/products/diamond-earrings-1.jpg',
    category: 'jewelry'
  },
  {
    id: 4,
    name: 'Sapphire Necklace',
    price: 2800,
    image: '/images/products/sapphire-necklace-1.jpg',
    category: 'jewelry'
  }
];

const FeaturedCollection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={3}>
      {featuredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Card
            component={RouterLink}
            to={`/products/${product.id}`}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                paddingTop: '100%', // 1:1 Aspect Ratio
                overflow: 'hidden',
              }}
            >
              <ProductImage
                src={product.image}
                alt={product.name}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.text.primary,
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '1rem',
                  color: theme.palette.text.secondary,
                }}
              >
                ${product.price.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedCollection; 