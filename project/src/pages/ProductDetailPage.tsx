import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, Divider, CircularProgress, Alert, Stack, IconButton, Modal } from '@mui/material';
import ProductImage from '../components/products/ProductImage';
import { useProduct } from '../hooks/useProduct';
import { Award } from 'lucide-react';
import { CertificationViewer } from '../components/premium/CertificationViewer';

const formatPrice = (value?: number, currency: string = 'USD') =>
  typeof value === 'number' && value > 0
    ? value.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits: 0 })
    : 'Consultar';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [showCertificate, setShowCertificate] = useState(false);

  // Actualizar imagen principal cuando cambie el producto
  React.useEffect(() => {
    if (product) {
      setMainImage(product.imagenesPrincipales?.[0] || product.images?.[0]);
    }
  }, [product]);

  const handleOpenCertificate = () => {
    setShowCertificate(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
  };

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
        <Alert severity="error" sx={{ mb: 3 }}>{error.message}</Alert>
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
          <Box sx={{ mb: 3, position: 'relative' }}>
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
            {/* Certificate Button */}
            <IconButton
              aria-label="View Certificate"
              onClick={handleOpenCertificate}
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s'
              }}
            >
              <Award size={20} color="#1A472A" />
            </IconButton>
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
              {/* Certificate info */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Award size={18} color="#1A472A" style={{ marginRight: 8 }} />
                <Button
                  variant="text"
                  size="small"
                  onClick={handleOpenCertificate}
                  sx={{ 
                    textTransform: 'none',
                    fontFamily: "'Lato', sans-serif",
                    color: '#1A472A',
                    fontWeight: 600,
                    p: 0
                  }}
                >
                  Ver Certificado de Autenticidad
                </Button>
              </Box>
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

      {/* Certificate Modal */}
      <Modal
        open={showCertificate}
        onClose={handleCloseCertificate}
        aria-labelledby="certificate-modal-title"
        aria-describedby="certificate-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{ maxWidth: 900, width: '100%', maxHeight: '90vh', outline: 'none' }}>
          <CertificationViewer 
            productId={id} 
            productName={product?.nombre || product?.name || ''} 
            onClose={handleCloseCertificate} 
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductDetailPage; 