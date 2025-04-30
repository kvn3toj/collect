import { GetStaticProps } from 'next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';
import productsData from '../data/products.json';

interface CatalogPageProps {
  products: typeof productsData;
}

export default function CatalogPage({ products }: CatalogPageProps) {
  const investmentTickets = products.filter(p => p.isTicket);
  const emeralds = products.filter(p => !p.isTicket);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {investmentTickets.length > 0 && (
          <Box mb={8}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
              Oportunidad de Inversión ARE Trüst
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {investmentTickets.map((ticket) => (
                <Grid item key={ticket.id} xs={12} sm={8} md={6}>
                  <ProductCard product={ticket} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {emeralds.length > 0 && (
          <Box>
            <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
              Esmeraldas Colombianas Certificadas
            </Typography>
            <Grid container spacing={4}>
              {emeralds.map((emerald) => (
                <Grid item key={emerald.id} xs={12} sm={6} md={4}>
                  <ProductCard product={emerald} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {products.length === 0 && (
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mt: 5 }}>
            No hay productos disponibles en este momento.
          </Typography>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: productsData,
    },
  };
}; 