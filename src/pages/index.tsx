import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Layout from '../components/Layout';
import Link from 'next/link';
import CountdownTimer from '../components/CountdownTimer';
import TicketGrid from '../components/TicketGrid';

export default function Home() {
  // Ejemplo: La oferta termina en 7 días a partir de ahora
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 7);

  // Ejemplo: Tickets disponibles (reemplazar con datos reales)
  const availableTicketNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(/images/hero/hero-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: 'white',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Inversión en Esmeraldas Colombianas
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              mb: 4,
              maxWidth: '600px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Descubre el poder de la inversión en esmeraldas certificadas con ARE Trüst
          </Typography>
          <CountdownTimer targetDate={offerEndDate} />
          <Link href="/catalogo" passHref legacyBehavior>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2 }}
            >
              Ver Catálogo
            </Button>
          </Link>
          <Link href="/nosotros" passHref legacyBehavior>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
            >
              Conoce Más
            </Button>
          </Link>
        </Container>
      </Box>

      {/* Tickets Section */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 }, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          color="primary"
          sx={{ 
            mb: 4,
            fontWeight: 500
          }}
        >
          Tickets Disponibles
        </Typography>
        <TicketGrid availableTickets={availableTicketNumbers} />
        <Link href="/catalogo#investment-ticket" passHref legacyBehavior>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            sx={{ 
              mt: 4,
              px: 4,
              py: 1.5
            }}
          >
            Ver Detalles del Ticket
          </Button>
        </Link>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" align="center" gutterBottom>
          ¿Por qué invertir con nosotros?
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
            mt: 4,
          }}
        >
          {[
            {
              title: 'Certificación Garantizada',
              description: 'Todas nuestras esmeraldas cuentan con certificación internacional.',
            },
            {
              title: 'Retorno Atractivo',
              description: '17% de retorno mensual por 17 meses, con devolución del 100% del capital.',
            },
            {
              title: 'Proceso Transparente',
              description: 'Acceso completo a la información y documentación de cada inversión.',
            },
          ].map((feature, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Call to Action */}
      <Box sx={{ py: { xs: 4, md: 8 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            ¿Listo para comenzar?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Únete a nuestra comunidad de inversionistas y forma parte del futuro de las esmeraldas colombianas.
          </Typography>
          <Link href="/contacto" passHref legacyBehavior>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ 
                px: 4,
                py: 1.5
              }}
            >
              Contáctanos
            </Button>
          </Link>
        </Container>
      </Box>
    </Layout>
  );
} 