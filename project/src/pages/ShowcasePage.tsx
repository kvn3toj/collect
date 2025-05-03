import { useEffect, useState, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Link as MuiLink,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProductImage from '../components/products/ProductImage';
import api from '../services/api';
import { Product } from '../types/product.types';

const formatPrice = (value: number | null | undefined): string =>
  typeof value === 'number'
    ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : 'Consultar';

interface ProductSpecificationProps {
  label: string;
  value: string | number;
}

const ProductSpecification = ({ label, value }: ProductSpecificationProps): JSX.Element => (
  <Typography sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#1A472A' }}>
    <Typography component="span" sx={{ fontWeight: 600, display: 'inline' }}>{label}:</Typography>{' '}
    <Typography component="span" sx={{ fontWeight: 400, display: 'inline' }}>
      {typeof value === 'string' ? value.replace('_', ' ') : value}
    </Typography>
  </Typography>
);

const ShowcasePage = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const [isWatermarkVisible, setIsWatermarkVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        // Comentado para despliegue visual estático en Vercel
        // const { data } = await api.get<Product[]>('/products');
        // setProducts(data);
        
        // Usando array vacío para visualización estática
        setProducts([]);
      } catch (err) {
        setError('No se pudieron cargar los productos.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsWatermarkVisible(true);
      },
      { threshold: 0.1 }
    );

    if (watermarkRef.current) {
      observer.observe(watermarkRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderProductSpecifications = (product: Product): JSX.Element[] => {
    const specifications: Array<{ label: string; value: string | number | undefined }> = [
      { label: 'LOTE', value: product.codigo },
      { label: 'QUILATES', value: product.quilatesEsmeralda ? `${product.quilatesEsmeralda} ct` : undefined },
      { label: 'PIEDRAS', value: product.piedras },
      { label: 'CALIDAD', value: product.calidadEsmeralda },
      { label: 'ORIGEN', value: product.origenEsmeralda },
    ];

    return specifications
      .filter(spec => spec.value !== undefined)
      .map(spec => (
        <ProductSpecification
          key={spec.label}
          label={spec.label}
          value={spec.value as string | number}
        />
      ));
  };

  const renderProductCard = (product: Product): JSX.Element => (
    <MuiLink
      key={product.id}
      component={RouterLink}
      to={`/products/${product.id}`}
      underline="none"
      sx={{ 
        display: 'block', 
        mb: { xs: 8, md: 10 }, 
        transition: 'opacity 0.2s', 
        '&:hover': { opacity: 0.92 } 
      }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        {/* Imagen principal */}
        <Grid item xs={12} md={4}>
          <Box sx={{ width: '100%' }}>
            <ProductImage
              src={product.imagenesPrincipales?.[0] || product.images?.[0] || null}
              alt={product.nombre || product.name || ''}
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(26,71,42,0.08)',
                border: '1px solid #EEE',
                background: '#f8f9fa',
              }}
            />
          </Box>
        </Grid>
        {/* Especificaciones y datos */}
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: 'left', pl: { md: 2 }, width: '100%' }}>
            <Typography
              variant="h4"
              sx={{ 
                fontFamily: "'Playfair Display', serif", 
                fontWeight: 700, 
                color: '#1A472A', 
                mb: 1 
              }}
            >
              {product.nombre || product.name}
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 2 }}>
              {renderProductSpecifications(product)}
            </Stack>
            <Typography
              variant="h5"
              sx={{ 
                fontFamily: "'Lato', sans-serif", 
                fontWeight: 700, 
                color: '#1A472A', 
                mb: 1 
              }}
            >
              {formatPrice(product.precio ?? product.price)}
            </Typography>
            {(product.descripcionCorta || product.shortDescription) && (
              <Typography
                variant="body2"
                sx={{ 
                  fontFamily: "'Lato', sans-serif", 
                  color: 'text.secondary', 
                  mt: 1, 
                  lineHeight: 1.6 
                }}
              >
                {product.descripcionCorta || product.shortDescription}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </MuiLink>
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      {/* Marca de agua isotipo ARE Trüst */}
      <Box
        ref={watermarkRef}
        component="img"
        src="/images/LOGO/isotipo-aretrust-light.svg"
        alt=""
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: isWatermarkVisible
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -45%) scale(0.95)',
          width: { xs: '80%', sm: '60%', md: '50%' },
          maxWidth: '550px',
          height: 'auto',
          opacity: isWatermarkVisible ? 0.1 : 0,
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          userSelect: 'none',
        }}
      />
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
          mb: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Nuestra Colección
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : products.length > 0 ? (
        products.map(renderProductCard)
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          position: 'relative',
          zIndex: 1 
        }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2,
              fontFamily: "'Playfair Display', serif",
              color: '#1A472A' 
            }}
          >
            Colección en actualización
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: "'Lato', sans-serif",
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Nuestra colección está siendo actualizada. Vuelva pronto para descubrir nuestras exquisitas piezas de esmeraldas colombianas.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ShowcasePage; 