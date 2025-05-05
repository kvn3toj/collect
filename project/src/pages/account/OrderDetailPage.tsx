import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  alpha,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ShoppingBag
} from 'lucide-react';
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

// Mapeo de estados a pasos del pedido
const statusToStep: Record<OrderStatus, number> = {
  'pending': 0,
  'processing': 1,
  'shipped': 2,
  'delivered': 3,
  'cancelled': -1,
  'refunded': -1
};

// Mapa de estado a color y icono
const statusConfig: Record<OrderStatus, { color: string; icon: React.ReactNode; label: string }> = {
  'pending': { color: 'warning.main', icon: <Clock size={16} />, label: 'Pending' },
  'processing': { color: 'info.main', icon: <Package size={16} />, label: 'Processing' },
  'shipped': { color: 'primary.main', icon: <Truck size={16} />, label: 'Shipped' },
  'delivered': { color: 'success.main', icon: <CheckCircle size={16} />, label: 'Delivered' },
  'cancelled': { color: 'error.main', icon: <XCircle size={16} />, label: 'Cancelled' },
  'refunded': { color: 'error.main', icon: <XCircle size={16} />, label: 'Refunded' }
};

const OrderDetailPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  
  // Obtener detalles del pedido
  const { data: order, isLoading, isError, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrderById(orderId!),
    enabled: !!orderId
  });

  const handleBackToOrders = () => {
    navigate('/account/orders');
  };

  const handleShopAgain = () => {
    navigate('/products');
  };

  // Si está cargando
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress size={40} sx={{ color: theme.palette.primary.main, opacity: 0.8, mb: 4 }} />
        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: alpha(theme.palette.text.primary, 0.7) }}>
          Loading order details...
        </Typography>
      </Container>
    );
  }

  // Si hay un error
  if (isError || !order) {
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
          {error instanceof Error ? error.message : 'Error loading order details'}
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowLeft size={16} />}
          onClick={handleBackToOrders}
          sx={{ 
            borderRadius: 0,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
          }}
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  // Procesar el estado del pedido para el stepper
  const currentStep = statusToStep[order.status];
  const isCancelledOrRefunded = order.status === 'cancelled' || order.status === 'refunded';

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowLeft size={16} />}
            onClick={handleBackToOrders}
            sx={{ 
              color: alpha(theme.palette.text.primary, 0.7),
              '&:hover': {
                bgcolor: 'transparent',
                color: theme.palette.primary.main
              }
            }}
          >
            Back to Orders
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4 }}>
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1"
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
                    variant="body1"
                    sx={{ 
                      color: alpha(theme.palette.text.primary, 0.7)
                    }}
                  >
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
                <Chip
                  icon={statusConfig[order.status].icon}
                  label={statusConfig[order.status].label}
                  sx={{ 
                    bgcolor: alpha(theme.palette[statusConfig[order.status].color as any], 0.1),
                    color: theme.palette[statusConfig[order.status].color as any],
                    borderRadius: 1,
                    fontWeight: 500,
                    px: 1,
                    mt: { xs: 2, sm: 0 },
                    '& .MuiChip-icon': {
                      color: theme.palette[statusConfig[order.status].color as any]
                    }
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          {!isCancelledOrRefunded && (
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: { xs: 2, md: 3 },
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    mb: 4
                  }}
                >
                  <Stepper activeStep={currentStep} alternativeLabel>
                    <Step>
                      <StepLabel
                        StepIconProps={{
                          icon: <Clock size={24} />,
                        }}
                      >
                        Order Placed
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconProps={{
                          icon: <Package size={24} />,
                        }}
                      >
                        Processing
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconProps={{
                          icon: <Truck size={24} />,
                        }}
                      >
                        Shipped
                      </StepLabel>
                    </Step>
                    <Step>
                      <StepLabel
                        StepIconProps={{
                          icon: <CheckCircle size={24} />,
                        }}
                      >
                        Delivered
                      </StepLabel>
                    </Step>
                  </Stepper>
                </Paper>
              </motion.div>
            </Grid>
          )}

          {isCancelledOrRefunded && (
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Alert 
                  severity={order.status === 'cancelled' ? 'error' : 'warning'}
                  icon={order.status === 'cancelled' ? <XCircle size={24} /> : <XCircle size={24} />}
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: alpha(
                      theme.palette[order.status === 'cancelled' ? 'error' : 'warning'].main, 
                      0.1
                    ),
                    border: `1px solid ${alpha(
                      theme.palette[order.status === 'cancelled' ? 'error' : 'warning'].main, 
                      0.2
                    )}`,
                    mb: 4 
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    This order has been {order.status === 'cancelled' ? 'cancelled' : 'refunded'}.
                  </Typography>
                  {order.notes && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Note: {order.notes}
                    </Typography>
                  )}
                </Alert>
              </motion.div>
            </Grid>
          )}

          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{ 
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  mb: { xs: 3, md: 0 }
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontFamily: 'Playfair Display',
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    mb: 3
                  }}
                >
                  Items in Your Order
                </Typography>

                {order.items.map((item, index) => (
                  <Box key={item.productId}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        py: 2
                      }}
                    >
                      <Box 
                        component="img"
                        src={item.productImage}
                        alt={item.productName}
                        sx={{ 
                          width: { xs: '100%', sm: 80 },
                          height: { xs: 200, sm: 80 },
                          objectFit: 'cover',
                          borderRadius: 1,
                          mr: { xs: 0, sm: 2 },
                          mb: { xs: 2, sm: 0 }
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6"
                          sx={{ 
                            fontFamily: 'Playfair Display',
                            fontWeight: 500,
                            mb: 0.5
                          }}
                        >
                          {item.productName}
                        </Typography>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            color: alpha(theme.palette.text.primary, 0.7),
                            mb: 1
                          }}
                        >
                          Quantity: {item.quantity}
                        </Typography>
                        {item.customizations && Object.keys(item.customizations).length > 0 && (
                          <Typography 
                            variant="body2"
                            sx={{ 
                              color: alpha(theme.palette.text.primary, 0.7),
                              mb: 1
                            }}
                          >
                            Customizations: {Object.entries(item.customizations).map(([key, value]) => `${key}: ${value}`).join(', ')}
                          </Typography>
                        )}
                        <Typography 
                          variant="body2"
                          sx={{ 
                            color: alpha(theme.palette.text.primary, 0.7),
                            mb: 1
                          }}
                        >
                          SKU: {item.sku}
                        </Typography>
                      </Box>
                      <Box 
                        sx={{ 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: { xs: 'flex-start', sm: 'flex-end' },
                          mt: { xs: 1, sm: 0 }
                        }}
                      >
                        <Typography 
                          variant="subtitle1"
                          sx={{ 
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                        >
                          ${item.totalPrice.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    {index < order.items.length - 1 && (
                      <Divider sx={{ my: 1 }} />
                    )}
                  </Box>
                ))}
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{ 
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  mb: 3
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontFamily: 'Playfair Display',
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    mb: 3
                  }}
                >
                  Order Summary
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                      Subtotal
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${order.subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                      Shipping
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${order.shippingCost.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                      Tax
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${order.tax.toFixed(2)}
                    </Typography>
                  </Box>
                  {order.discount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: theme.palette.success.main }}>
                        Discount
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.success.main }}>
                        -${order.discount.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Total
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                    ${order.total.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>

              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{ 
                    p: { xs: 2, md: 3 },
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    mb: 3
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: 'Playfair Display',
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      mb: 3
                    }}
                  >
                    Shipping Information
                  </Typography>

                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 0.5 }}>
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2 && <>, {order.shippingAddress.addressLine2}</>}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 0.5 }}>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 0.5 }}>
                    {order.shippingAddress.country}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    Phone: {order.shippingAddress.phoneNumber}
                  </Typography>

                  {order.trackingNumber && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        Tracking Information
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Tracking Number: {order.trackingNumber}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </motion.div>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingBag size={16} />}
                  onClick={handleShopAgain}
                  sx={{ 
                    borderRadius: 0,
                    py: 1.5,
                    px: 3,
                    bgcolor: theme.palette.primary.main,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.9),
                      boxShadow: 'none',
                    }
                  }}
                >
                  Shop Again
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default OrderDetailPage; 