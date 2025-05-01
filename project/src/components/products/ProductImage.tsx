import React, { useState } from 'react';
import { Box, SxProps } from '@mui/material';

interface ProductImageProps {
  src: string | null;
  alt: string;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  style?: SxProps;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  fallback = '/images/placeholder-product.jpg',
  style = {},
}) => {
  const [imageError, setImageError] = useState(!src || src === '');

  return (
    <Box
      component="img"
      src={imageError ? fallback : src}
      alt={alt}
      onError={() => setImageError(true)}
      sx={{
        width,
        height,
        objectFit: 'cover',
        transition: 'all 0.3s ease',
        ...style,
      }}
    />
  );
};

export default ProductImage; 