import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Grid, Typography, Button, Divider, Skeleton, Stack, Rating, Chip, Alert } from '@mui/material';
import { Heart, ShoppingCart, Truck, Shield, ArrowLeft } from 'lucide-react';
import ProductImage from '../components/products/ProductImage';

// Simulamos la función de servicio para obtener un producto
const getProductById = async (id: string) => {
  // Datos estáticos para el despliegue inicial
  const staticProducts = {
    '1': {
      id: '1',
      name: 'Colombian Emerald Ring',
      price: 2499,
      description: 'A stunning Colombian emerald ring set in 18K gold. The emerald features excellent clarity and a rich green color that is characteristic of the finest Colombian emeralds.',
      images: ['https://images.pexels.com/photos/10961577/pexels-photo-10961577.jpeg'],
      rating: 4.8,
      reviewCount: 124,
      inStock: true,
      categories: ['Rings', 'Emeralds'],
      options: {
        colors: ['Yellow Gold', 'White Gold', 'Rose Gold'],
        sizes: ['5', '6', '7', '8', '9']
      }
    },
    '2': {
      id: '2',
      name: 'Emerald Teardrop Necklace',
      price: 3299,
      description: 'An elegant teardrop emerald pendant necklace. The emerald is suspended from a delicate chain, creating a timeless piece that can be worn for any occasion.',
      images: ['https://images.pexels.com/photos/12351222/pexels-photo-12351222.jpeg'],
      rating: 4.9,
      reviewCount: 89,
      inStock: true,
      categories: ['Necklaces', 'Emeralds'],
      options: {
        colors: ['Yellow Gold', 'White Gold'],
        sizes: ['16"', '18"', '20"']
      }
    },
    '3': {
      id: '3',
      name: 'Raw Emerald Bracelet',
      price: 1899,
      description: 'A unique bracelet featuring raw emerald stones. The natural, uncut emeralds showcase their organic beauty while being set in a modern, wearable design.',
      images: ['https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg'],
      rating: 4.7,
      reviewCount: 56,
      inStock: true,
      categories: ['Bracelets', 'Emeralds'],
      options: {
        colors: ['Yellow Gold', 'Rose Gold'],
        sizes: ['Small', 'Medium', 'Large']
      }
    },
    '4': {
      id: '4',
      name: 'Emerald Stud Earrings',
      price: 1499,
      description: 'Classic emerald stud earrings that add a touch of elegance to any outfit. The emeralds are perfectly cut and set in precious metal settings.',
      images: ['https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg'],
      rating: 4.6,
      reviewCount: 112,
      inStock: true,
      categories: ['Earrings', 'Emeralds'],
      options: {
        colors: ['Yellow Gold', 'White Gold', 'Platinum'],
        sizes: ['Small', 'Medium']
      }
    }
  };

  // Retornamos el producto estático o un producto por defecto
  return staticProducts[id as keyof typeof staticProducts] || {
    id,
    name: 'Product Not Found',
    price: 0,
    description: 'This product is not available.',
    images: ['/placeholder.jpg'],
    rating: 0,
    reviewCount: 0,
    inStock: false,
    categories: ['Unavailable'],
    options: {
      colors: [],
      sizes: []
    }
  };
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id || ''),
    enabled: !!id
  });

  useEffect(() => {
    if (product?.options?.colors?.length) {
      setSelectedColor(product.options.colors[0]);
    }
    if (product?.options?.sizes?.length) {
      setSelectedSize(product.options.sizes[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="text" width="60%" height={24} sx={{ mt: 2 }} />
            <Skeleton variant="text" width="100%" height={100} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ mt: 4 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error loading product. Please try again later.</Alert>
        <Button startIcon={<ArrowLeft />} onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Added to cart:', {
      product,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  const handleAddToWishlist = () => {
    // Implement add to wishlist functionality
    console.log('Added to wishlist:', product);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowLeft />} 
        sx={{ mb: 3 }} 
        onClick={() => navigate('/products')}
      >
        Back to Products
      </Button>
      
      <Grid container spacing={6}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <ProductImage
            src={product.images[0] || ''}
            alt={product.name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          />
        </Grid>
        
        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.reviewCount} reviews)
            </Typography>
          </Box>
          
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', my: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            {product.categories.map(category => (
              <Chip key={category} label={category} size="small" sx={{ mr: 1 }} />
            ))}
          </Box>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Product Options */}
          {product.options?.colors?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Color</Typography>
              <Stack direction="row" spacing={1}>
                {product.options.colors.map(color => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "contained" : "outlined"}
                    onClick={() => setSelectedColor(color)}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    {color}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}
          
          {product.options?.sizes?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Size</Typography>
              <Stack direction="row" spacing={1}>
                {product.options.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                    sx={{ minWidth: 'auto', px: 2 }}
                  >
                    {size}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}
          
          {/* Quantity */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Quantity</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                sx={{ minWidth: '40px' }}
              >
                -
              </Button>
              <Typography sx={{ mx: 2 }}>{quantity}</Typography>
              <Button 
                variant="outlined" 
                onClick={() => setQuantity(prev => prev + 1)}
                sx={{ minWidth: '40px' }}
              >
                +
              </Button>
            </Box>
          </Box>
          
          {/* Add to Cart Button */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              sx={{ flex: 1 }}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={handleAddToWishlist}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <Heart size={20} />
            </Button>
          </Box>
          
          {/* Delivery Information */}
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Truck size={20} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Free delivery on orders over $100
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Shield size={20} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                2 year warranty included
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage; 