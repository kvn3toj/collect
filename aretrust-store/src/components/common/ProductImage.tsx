import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ProductImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  borderRadius?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill';
  onClick?: () => void;
  className?: string;
}

const ImageContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'borderRadius' && 
    prop !== 'aspectRatio' && 
    prop !== 'isLoaded'
})<{
  borderRadius?: string | number;
  aspectRatio?: string;
  isLoaded: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
}>(({ 
  theme, 
  borderRadius = theme.shape.borderRadius, 
  aspectRatio = '1/1',
  isLoaded,
  objectFit = 'cover'
}) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius,
  aspectRatio,
  backgroundColor: isLoaded ? 'transparent' : theme.palette.background.paper,
  transition: 'all 0.3s ease',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit,
    transition: 'transform 0.5s ease',
  },
  '&:hover img': {
    transform: 'scale(1.03)',
  },
  cursor: 'pointer',
}));

/**
 * Componente para mostrar imágenes de productos con estado de carga
 */
const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  aspectRatio = '1/1',
  borderRadius,
  objectFit = 'cover',
  onClick,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Reset estado cuando cambia la src
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true); // Consideramos que ha terminado de cargar aunque sea con error
  };

  return (
    <ImageContainer 
      width={width} 
      height={height}
      borderRadius={borderRadius}
      aspectRatio={aspectRatio}
      isLoaded={isLoaded}
      objectFit={objectFit}
      onClick={onClick}
      className={className}
    >
      {!isLoaded && (
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave" 
        />
      )}
      
      {error ? (
        // Imagen de error/placeholder
        <Box 
          component="div" 
          sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.200',
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          Imagen no disponible
        </Box>
      ) : (
        <img
          src={src}
          alt={alt}
          style={{ 
            opacity: isLoaded ? 1 : 0,
            position: isLoaded ? 'relative' : 'absolute',
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </ImageContainer>
  );
};

export default ProductImage; 