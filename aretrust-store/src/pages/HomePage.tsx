import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  useMediaQuery,
  Divider,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedIcon from '@mui/icons-material/Verified';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/product/ProductCard';
import productService from '../services/productService';

/**
 * Página de inicio
 */
const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Obtener productos destacados
  const { data: featuredProductsData, isLoading, error } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: productService.getFeaturedProducts,
  });
  
  const featuredProducts = featuredProductsData?.data || [];
  
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: {
            xs: 'calc(100vh - 64px)',
            md: '90vh',
          },
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1629224316855-532e0b990122?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            filter: 'brightness(0.5)',
          },
        }}
      >
        <Container>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  color: 'white',
                  py: { xs: 6, md: 8 },
                  px: { xs: 2, md: 4 },
                  backdropFilter: 'blur(2px)',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 2,
                  }}
                >
                  ESMERALDAS DE COLOMBIA
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    fontFamily: 'var(--font-primary)',
                    fontWeight: 300,
                    mb: 4,
                    opacity: 0.9,
                  }}
                >
                  Joyería exclusiva con las esmeraldas más puras del mundo
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/collection')}
                    sx={{ minWidth: '180px' }}
                  >
                    Ver Colección
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/customize')}
                    sx={{
                      minWidth: '180px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: theme.palette.secondary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderColor: theme.palette.secondary.light,
                      },
                    }}
                  >
                    Personalizar Joya
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Características principales */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8F9FA' }}>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              mb: 6,
            }}
          >
            Nuestro Compromiso
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <DiamondIcon
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    mb: 1.5,
                  }}
                >
                  Calidad Excepcional
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: '300px',
                    mx: 'auto',
                  }}
                >
                  Seleccionamos a mano las gemas con mayor pureza y color,
                  garantizando esmeraldas de calidad única.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <VerifiedIcon
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    mb: 1.5,
                  }}
                >
                  Origen Certificado
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: '300px',
                    mx: 'auto',
                  }}
                >
                  Todas nuestras gemas tienen certificado de origen colombiano
                  y trazabilidad completa desde la mina.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <DesignServicesIcon
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    mb: 1.5,
                  }}
                >
                  Diseño Personalizado
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: '300px',
                    mx: 'auto',
                  }}
                >
                  Creamos joyas únicas según tus preferencias y estilo personal,
                  con artesanos de experiencia generacional.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Productos destacados */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              mb: 1,
            }}
          >
            Piezas Destacadas
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Nuestra selección exclusiva de esmeraldas y joyería
          </Typography>

          {isLoading ? (
            <Typography align="center">Cargando productos destacados...</Typography>
          ) : error ? (
            <Typography color="error" align="center">
              Error al cargar productos. Por favor, inténtelo de nuevo.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {featuredProducts.slice(0, 6).map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4}>
                  <ProductCard product={product} featured={true} />
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/collection')}
            >
              Ver Toda la Colección
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Sección de personalización */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  mb: 3,
                }}
              >
                Personaliza Tu Joya
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, opacity: 0.9, fontSize: '1.1rem' }}
              >
                ¿Buscas algo único? Crea una pieza exclusiva a tu medida.
                Selecciona el tipo de joya, metal, quilates y calidad para obtener
                una cotización personalizada.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/customize')}
                sx={{ minWidth: '200px' }}
              >
                Empezar a Diseñar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height={isSmall ? 250 : 400}
                  image="https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=2067"
                  alt="Diseño de joyas"
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonios */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              mb: 6,
            }}
          >
            Lo Que Dicen Nuestros Clientes
          </Typography>

          <Grid container spacing={4}>
            {/* Testimonios dummy - en una app real serían dinámicos desde API */}
            {[
              {
                name: 'María García',
                text: 'El anillo que compré para mi compromiso es simplemente espectacular. La esmeralda tiene un color y claridad como nunca había visto antes.',
                location: 'Madrid',
              },
              {
                name: 'Roberto Sánchez',
                text: 'El proceso de personalización fue increíblemente sencillo y el resultado final superó todas mis expectativas. Un servicio de primera clase.',
                location: 'Barcelona',
              },
              {
                name: 'Carmen López',
                text: 'He comprado joyas de esmeralda durante años y puedo afirmar que la calidad de ARETRUST está muy por encima de otras marcas de lujo.',
                location: 'Valencia',
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    p: 2,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ 
                        mb: 3, 
                        fontStyle: 'italic',
                        position: 'relative',
                        '&::before': {
                          content: '"""',
                          fontFamily: 'Georgia, serif',
                          fontSize: '4rem',
                          color: 'rgba(0, 77, 64, 0.1)',
                          position: 'absolute',
                          top: '-1.5rem',
                          left: '-1rem',
                        }
                      }}
                    >
                      {testimonial.text}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.location}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: '#F8F9FA',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              mb: 3,
            }}
          >
            ¿Listo para descubrir la belleza de nuestras esmeraldas?
          </Typography>
          <Typography
            variant="body1"
            sx={{ 
              mb: 4,
              fontSize: '1.1rem',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Explora nuestra colección exclusiva o programa una consulta personalizada
            para encontrar la joya perfecta.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/collection')}
            >
              Ver Catálogo
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => window.location.href = 'tel:+34911234567'}
            >
              Contactar
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 