import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
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
  certificationId?: string;
  originId?: string;
}

const ProductCard = ({ product, certificationId, originId }: ProductCardProps): JSX.Element => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (): void => {
    addItem(product, 1);
  };

  // Formatear precio con Intl.NumberFormat
  const formatPrice = (price: number | null | undefined): string => {
    if (price == null) return "";
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
          alt={product.nombre || product.name || ''}
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
            }}
          >
            {product.descripcionCorta || product.shortDescription || 'Handcrafted emerald piece made with the finest materials'}
          </Typography>
        </Box>
        
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box 
              id={certificationId}
              component="span"
              sx={{ 
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                backgroundColor: '#F0F7F4',
                color: theme.palette.primary.main,
                px: 1,
                py: 0.4,
                borderRadius: 0.5,
                letterSpacing: '0.05em',
                display: 'inline-block',
                mr: 1,
              }}
            >
              Certificado GIA
            </Box>
            <Box 
              id={originId}
              component="span"
              sx={{ 
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                backgroundColor: '#F5F5F5',
                color: '#666666',
                px: 1,
                py: 0.4,
                borderRadius: 0.5,
                letterSpacing: '0.05em',
                display: 'inline-block',
              }}
            >
              Procedencia Ética
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Box>
              {product.discountPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#777777',
                    textDecoration: 'line-through',
                    fontSize: '0.8rem',
                    mr: 1,
                    fontFamily: "'Lato', sans-serif",
                  }}
                  component="span"
                >
                  {formatPrice(product.price)}
                </Typography>
              )}
              <Typography
                variant="h6"
                component="span"
                sx={{
                  color: product.discountPrice ? theme.palette.secondary.main : theme.palette.text.primary,
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                {formatPrice(product.discountPrice || product.price)}
              </Typography>
            </Box>
            
            <Rating 
              value={product.rating || 5} 
              precision={0.5} 
              size="small" 
              readOnly
              sx={{
                fontSize: '0.9rem',
                '& .MuiRating-iconFilled': {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Función de componente para el skeleton loader
const ProductCardSkeleton = (): JSX.Element => {
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

// Asignar el componente Skeleton a ProductCard
ProductCard.Skeleton = ProductCardSkeleton;

// Especificar tipado explícito para el export
export default ProductCard as React.FC<ProductCardProps> & { Skeleton: React.FC };