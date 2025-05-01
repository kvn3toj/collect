import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductImage from '../common/ProductImage';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  },
  position: 'relative',
  overflow: 'visible',
}));

const ProductTypeChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  zIndex: 2,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  fontSize: '0.75rem',
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontFamily: 'var(--font-catalog)',
  color: '#3A463C',
  fontWeight: 500,
  marginTop: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const DiscountPrice = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textDecoration: 'line-through',
  fontWeight: 400,
  fontSize: '0.85em',
}));

/**
 * Componente de tarjeta de producto para el catálogo
 */
const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };
  
  // Mapping para traducciones de tipos de producto
  const productTypeLabels: Record<string, string> = {
    'ANILLO': 'Anillo',
    'COLLAR': 'Collar',
    'PENDIENTES': 'Pendientes',
    'PULSERA': 'Pulsera',
    'GEMA_SUELTA': 'Gema',
  };

  // Formatear precio con separador de miles
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      {/* Chip de tipo de producto */}
      <ProductTypeChip 
        label={productTypeLabels[product.type] || product.type} 
        size="small" 
      />
      
      {/* Imagen del producto */}
      <ProductImage 
        src={product.mainImage} 
        alt={product.name}
        aspectRatio={featured ? '16/10' : '1/1'}
        objectFit="cover"
      />
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Nombre del producto - Usar la tipografía Times New Roman para catálogo */}
        <Typography 
          variant="h6" 
          component="h3" 
          className="catalog-text"
          sx={{ 
            fontWeight: 600,
            mb: 0.5,
            lineHeight: 1.2,
            fontFamily: 'var(--font-catalog)',
            color: '#3A463C',
          }}
        >
          {product.name}
        </Typography>
        
        {/* Características clave en función del tipo */}
        <Box mt={1} mb={1.5}>
          {product.quilates && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
              <b>Quilates:</b> {product.quilates}
            </Typography>
          )}
          
          {product.origin && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
              <b>Origen:</b> {product.origin}
            </Typography>
          )}
          
          {product.metal && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
              <b>Metal:</b> {product.metal}
            </Typography>
          )}
        </Box>
        
        {/* Precio */}
        <Box sx={{ mt: 'auto' }}>
          {product.price === null ? (
            <ProductPrice variant="subtitle1">
              Solicitar Precio
            </ProductPrice>
          ) : (
            <ProductPrice variant="subtitle1">
              {product.discountPrice ? (
                <>
                  {formatPrice(product.discountPrice)}
                  <DiscountPrice variant="body2">
                    {formatPrice(product.price)}
                  </DiscountPrice>
                </>
              ) : (
                formatPrice(product.price)
              )}
            </ProductPrice>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard; 