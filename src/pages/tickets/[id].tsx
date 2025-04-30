import React from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '../../data/products.json';

export default function TicketPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Producto no encontrado
        </Typography>
        <Link href="/catalogo" passHref legacyBehavior>
          <Button variant="contained" color="primary">
            Volver al Catálogo
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', width: '100%', height: 400, borderRadius: 1, overflow: 'hidden' }}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.totalPrice.toLocaleString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          {product.isTicket && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Detalles del Ticket
              </Typography>
              {product.benefits?.map((benefit, index) => (
                <Typography key={index} variant="body2" paragraph>
                  • {benefit}
                </Typography>
              ))}
              {product.prontoPagoBenefit && (
                <Typography variant="body2" paragraph>
                  • {product.prontoPagoBenefit}
                </Typography>
              )}
              {product.bulkBenefit && (
                <Typography variant="body2">
                  • {product.bulkBenefit}
                </Typography>
              )}
            </Paper>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            {product.isTicket ? 'Adquirir Ticket' : 'Contactar para más información'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
} 