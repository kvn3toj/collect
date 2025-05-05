import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Divider, 
  Grid, 
  Paper, 
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  alpha
} from '@mui/material';
import { ShoppingBag, ArrowRight, Clock, Package, CheckCircle, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import orderService from '../../services/orderService';
import { OrderStatus } from '../../types/order.types';
import { motion } from 'framer-motion';

// Animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Mapa de estado a color y icono
const statusConfig: Record<OrderStatus, { color: string; icon: React.ReactNode }> = {
  'pending': { color: 'warning.main', icon: <Clock size={16} /> },
  'processing': { color: 'info.main', icon: <Package size={16} /> },
  'shipped': { color: 'primary.main', icon: <Package size={16} /> },
  'delivered': { color: 'success.main', icon: <CheckCircle size={16} /> },
  'cancelled': { color: 'error.main', icon: <XCircle size={16} /> },
  'refunded': { color: 'error.main', icon: <XCircle size={16} /> }
};

const OrdersPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Obtener órdenes del usuario
  const { data: orders = [], isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getMyOrders,
  });

  const handleOrderClick = (orderId: string) => {
    navigate(`/account/orders/${orderId}`);
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  // Si está cargando
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress size={40} sx={{ color: theme.palette.primary.main, opacity: 0.8, mb: 4 }} />
        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: alpha(theme.palette.text.primary, 0.7) }}>
          Loading your orders...
        </Typography>
      </Container>
    );
  }

  // Si hay un error
  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.error.main, 0.1),
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            mb: 4 
          }}
        >
          {error instanceof Error ? error.message : 'Error loading orders'}
        </Alert>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleShopNow}
          sx={{ 
            borderRadius: 0,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  // Si no hay órdenes
  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag 
            size={64} 
            strokeWidth={1} 
            style={{ 
              opacity: 0.5, 
              marginBottom: 24,
              color: theme.palette.text.secondary 
            }} 
          />
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontFamily: 'Playfair Display', 
              fontWeight: 500,
              color: theme.palette.text.primary,
              mb: 3
            }}
          >
            No Orders Yet
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: alpha(theme.palette.text.primary, 0.7),
              maxWidth: 500,
              mx: 'auto',
              mb: 4
            }}
          >
            You haven't placed any orders yet. Explore our collection to discover exquisite emerald jewelry crafted with the finest materials.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleShopNow}
            sx={{ 
              borderRadius: 0,
              py: 1.5,
              px: 4,
              backgroundColor: theme.palette.primary.main,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.9),
                boxShadow: 'none',
              }
            }}
          >
            Shop Now
          </Button>
        </motion.div>
      </Container>
    );
  }

  // Renderizar lista de órdenes
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            fontFamily: 'Playfair Display', 
            fontWeight: 500,
            color: theme.palette.text.primary,
            mb: { xs: 3, md: 5 }
          }}
        >
          Your Orders
        </Typography>

        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: { xs: 2, md: 3 },
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onClick={() => handleOrderClick(order.id)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: 'Playfair Display',
                          fontWeight: 500,
                          color: theme.palette.text.primary,
                          mb: 1
                        }}
                      >
                        Order #{order.orderNumber}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: alpha(theme.palette.text.primary, 0.6),
                          mb: 1
                        }}
                      >
                        Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Typography>
                      <Chip
                        icon={statusConfig[order.status].icon}
                        label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        size="small"
                        sx={{ 
                          bgcolor: alpha(theme.palette[statusConfig[order.status].color as any], 0.1),
                          color: theme.palette[statusConfig[order.status].color as any],
                          borderRadius: 1,
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            color: theme.palette[statusConfig[order.status].color as any]
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: alpha(theme.palette.text.primary, 0.7),
                          mb: 0.5
                        }}
                      >
                        {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                      </Typography>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          color: theme.palette.primary.main
                        }}
                      >
                        ${order.total.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                      <Button
                        endIcon={<ArrowRight size={16} />}
                        sx={{ 
                          color: theme.palette.primary.main,
                          '&:hover': {
                            bgcolor: 'transparent',
                            color: alpha(theme.palette.primary.main, 0.8)
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default OrdersPage; 