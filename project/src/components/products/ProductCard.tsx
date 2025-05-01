import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  Skeleton,
  IconButton,
  useTheme,
} from '@mui/material';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types/product.types';
import useCartStore from '../../stores/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> & { Skeleton: React.FC } = ({ product }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0, 77, 64, 0.1)',
          transform: 'translateY(-5px)',
        },
      }}
    >
      <Box 
        sx={{ 
          position: 'relative', 
          paddingTop: '100%',
          bgcolor: '#f5f5f5',
          overflow: 'hidden',
        }}
      >
        <ProductImage
          src={product.imagenesPrincipales?.[0] || product.images?.[0]}
          alt={product.nombre || product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '10%',
            transition: 'transform 0.5s ease',
            ...(isHovered && {
              transform: 'scale(1.05)',
            }),
          }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(11, 93, 76, 0.5), rgba(11, 93, 76, 0.2))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <IconButton
                component={RouterLink}
                to={`/products/${product.id}`}
                aria-label="View details"
                sx={{
                  bgcolor: 'white',
                  color: '#3A463C',
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    bgcolor: 'white', 
                    opacity: 0.95,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <Eye size={22} />
              </IconButton>
              <IconButton
                onClick={handleAddToCart}
                aria-label="Add to cart"
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: 'white',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    bgcolor: theme.palette.secondary.dark,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ShoppingBag size={22} />
              </IconButton>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          pb: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: '#FFFFFF',
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            component={RouterLink}
            to={`/products/${product.id}`}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textDecoration: 'none',
              color: '#3A463C',
              fontFamily: "'Times New Roman', serif",
              fontSize: '1.2rem',
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: '0.01em',
              mb: 1,
              transition: 'color 0.2s ease',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {product.nombre || product.name}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#555555',
              fontFamily: "'Lato', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 400,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {product.descripcionCorta || product.shortDescription}
          </Typography>
        </Box>

        <Box>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1 
            }}
          >
            <Rating 
              value={4.5} 
              precision={0.5} 
              size="small" 
              readOnly 
              sx={{ 
                color: theme.palette.secondary.main,
                mr: 1,
              }}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666666',
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.75rem',
              }}
            >
              (24 reviews)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Times New Roman', serif",
                fontSize: '1.3rem',
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.precio || product.price || 0)}
            </Typography>
            {(product.discountPrice || product.precio) && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: '#999',
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.9rem',
                }}
              >
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(product.discountPrice || 0)}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Skeleton loader component
ProductCard.Skeleton = function ProductCardSkeleton() {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '100%', bgcolor: '#f8f8f8' }}>
        <Skeleton
          variant="rectangular"
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Skeleton variant="text" sx={{ fontSize: '1.2rem', mb: 1, width: '85%' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.85rem', mb: 0.5, width: '100%' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.85rem', mb: 2, width: '70%' }} />
        <Skeleton variant="rectangular" sx={{ height: 20, width: 120, mb: 1.5, borderRadius: 0.5 }} />
        <Skeleton variant="text" sx={{ fontSize: '1.3rem', width: '50%' }} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;