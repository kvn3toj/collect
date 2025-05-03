import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, Divider, CircularProgress, Alert, Stack } from '@mui/material';
import ProductImage from '../components/products/ProductImage';
import api from '../services/api';
import { Product } from '../types/product.types';

const formatPrice = (value?: number, currency: string = 'USD') =>
  typeof value === 'number' && value > 0
    ? value.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits: 0 })
    : 'Consultar';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    
    // Comentado para despliegue visual estático en Vercel
    /*
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(res.data.imagenesPrincipales?.[0] || res.data.images?.[0]);
      })
      .catch(() => setError('No se pudo cargar el producto.'))
      .finally(() => setIsLoading(false));
    */
    
    // Simulamos carga y establecemos producto como null para visualización estática
    setTimeout(() => {
      setIsLoading(false);
      // No establecemos ningún producto - mostrará mensaje de producto no disponible
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color="secondary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        <Button variant="outlined" onClick={() => navigate('/products')}>Volver a productos</Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Producto temporalmente no disponible. Estamos actualizando nuestro catálogo.
        </Alert>
        <Button variant="outlined" onClick={() => navigate('/products')}>
          Volver a productos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Button onClick={() => navigate('/products')} sx={{ mb: 4 }}>
        ← Volver a productos
      </Button>
      <Grid container spacing={6}>
        {/* Columna Izquierda: Imagen principal y galería */}
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: 3 }}>
            <ProductImage
              src={mainImage || '/placeholder.jpg'}
              alt={product.nombre || product.name || 'Producto'}
              style={{
                width: '100%',
                height: 420,
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(26,71,42,0.08)',
                background: '#fff',
              }}
            />
          </Box>
          {product.imagenesDetalle && product.imagenesDetalle.length > 0 && (
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {product.imagenesDetalle.map((img, idx) => (
                <Box
                  key={img + idx}
                  sx={{
                    border: mainImage === img ? '2px solid #1A472A' : '2px solid transparent',
                    borderRadius: 2,
                    cursor: 'pointer',
                    p: 0.5,
                    transition: 'border 0.2s',
                  }}
                  onClick={() => setMainImage(img)}
                >
                  <ProductImage
                    src={img}
                    alt={`Detalle ${idx + 1}`}
                    sx={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 1 }}
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Grid>
        {/* Columna Derecha: Detalles y especificaciones */}
        <Grid item xs={12} md={5}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, mb: 1 }}
          >
            {product.nombre || product.name}
          </Typography>
          {product.descripcionCorta || product.shortDescription ? (
            <Typography
              variant="body1"
              sx={{ fontFamily: "'Lato', sans-serif", mb: 2, color: 'text.secondary' }}
            >
              {product.descripcionCorta || product.shortDescription}
            </Typography>
          ) : null}
          <Typography
            variant="h5"
            sx={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: '#1A472A', mb: 3 }}
          >
            {formatPrice(product.precio ?? product.price, 'USD')}
          </Typography>
          {/* Especificaciones */}
          <Box sx={{ mb: 2 }}>
            <Stack spacing={1.5}>
              {product.codigo && (
                <Typography sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#1A472A' }}>
                  <Typography component="span" sx={{ fontWeight: 600, display: 'inline' }}>LOTE:</Typography> <Typography component="span" sx={{ fontWeight: 400, display: 'inline' }}>{product.codigo}</Typography>
                </Typography>
              )}
              {product.quilatesEsmeralda && (
                <Typography sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#1A472A' }}>
                  <Typography component="span" sx={{ fontWeight: 600, display: 'inline' }}>QUILATES:</Typography> <Typography component="span" sx={{ fontWeight: 400, display: 'inline' }}>{product.quilatesEsmeralda} ct</Typography>
                </Typography>
              )}
              {product.piedras && (
                <Typography sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#1A472A' }}>
                  <Typography component="span" sx={{ fontWeight: 600, display: 'inline' }}>PIEDRAS:</Typography> <Typography component="span" sx={{ fontWeight: 400, display: 'inline' }}>{product.piedras}</Typography>
                </Typography>
              )}
              {product.calidadEsmeralda && (
                <Typography sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#1A472A' }}>
                  <Typography component="span" sx={{ fontWeight: 600, display: 'inline' }}>CALIDAD:</Typography> <Typography component="span" sx={{ fontWeight: 400, display: 'inline' }}>{product.calidadEsmeralda.replace('_',' ')}</Typography>
                </Typography>
              )}
              {product.origenEsmeralda && (
                <Typography sx={{ fontFamily: "'Lato', sans-serif", fontSize: '0.95rem', color: '#1A472A' }}>
                  <Typography component="span" sx={{ fontWeight: 600, display: 'inline' }}>ORIGEN:</Typography> <Typography component="span" sx={{ fontWeight: 400, display: 'inline' }}>{product.origenEsmeralda.replace('_',' ')}</Typography>
                </Typography>
              )}
            </Stack>
          </Box>
          {product.descripcion && (
            <Typography
              variant="body2"
              sx={{ fontFamily: "'Lato', sans-serif", mt: 3, lineHeight: 1.7, color: 'text.primary' }}
            >
              {product.descripcion}
            </Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ borderRadius: 2, mt: 4, fontWeight: 700, fontFamily: "'Lato', sans-serif", fontSize: '1.1rem', px: 4 }}
            onClick={() => console.log('Solicitar cotización', product)}
          >
            Solicitar Cotización
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage; 