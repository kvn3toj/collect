import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../../types/product.types';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  error?: Error | null;
}

// Configuración de animación para productos
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ProductGrid = ({ products, isLoading, error }: ProductGridProps): JSX.Element => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Renderizar mensaje de error
  if (error) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8, 
        px: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#FFFFFF'
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Playfair Display', serif", color: '#3A463C' }}>
          Unable to load products
        </Typography>
        <Typography variant="body2" sx={{ color: '#666666', fontFamily: "'Lato', sans-serif" }}>
          {error.message}
        </Typography>
      </Box>
    );
  }

  // Renderizar esqueletos de carga o productos
  const renderGridItems = (): JSX.Element[] => {
    if (isLoading) {
      return Array.from(new Array(6)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={`skeleton-${index}`}>
          <ProductCard.Skeleton />
        </Grid>
      ));
    }

    return products.map((product, index) => (
      <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
        <motion.div
          variants={itemVariants}
          custom={index}
          // Para asegurar que la animación ocurra en re-ordenamiento por filtros
          key={product.id}
          layoutId={product.id}
          // Animación para re-ordenamiento
          layout
          transition={{
            layout: { duration: 0.3, ease: "easeOut" },
            opacity: { duration: 0.3 }
          }}
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.2 } 
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      </Grid>
    ));
  };

  // Renderizar mensaje de no hay productos
  const renderEmptyMessage = (): JSX.Element | null => {
    if (!isLoading && products.length === 0) {
      return (
        <Grid item xs={12}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: '#FFFFFF'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Playfair Display', serif", color: '#3A463C' }}>
              No products found
            </Typography>
            <Typography variant="body2" sx={{ color: '#666666', fontFamily: "'Lato', sans-serif" }}>
              Try adjusting your filters or search criteria
            </Typography>
          </Box>
        </Grid>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        sx={{
          px: { xs: 1, md: 0 },
          py: { xs: 2, md: 3 },
        }}
      >
        {renderGridItems()}
        {renderEmptyMessage()}
      </Grid>
    </motion.div>
  );
};

export default ProductGrid;