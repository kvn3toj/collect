import { useState, CSSProperties } from 'react';
import { Box } from '@mui/material';

interface ProductImageProps {
  src: string | null;
  alt: string;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  style?: CSSProperties;
}

const ProductImage = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  fallback = '/images/placeholder-product.jpg',
  style = {},
}: ProductImageProps): JSX.Element => {
  const [imageError, setImageError] = useState<boolean>(!src || src === '');

  const handleImageError = (): void => {
    setImageError(true);
  };

  return (
    <Box
      component="img"
      src={imageError ? fallback : src || fallback}
      alt={alt}
      onError={handleImageError}
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