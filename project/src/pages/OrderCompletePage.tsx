import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  Divider,
  Grid,
  useTheme,
  alpha 
} from '@mui/material';
import { CheckCircle, ArrowRight, ShoppingBag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import orderService from '../services/orderService';

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

const OrderCompletePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extraer orderId de la URL o state
  const orderId = location.state?.orderId || new URLSearchParams(location.search).get('orderId');
  
  // Obtener los detalles del pedido usando React Query si hay un orderId
  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
    retry: 1
  });

  const handleViewAllOrders = () => {
    navigate('/account/orders');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div variants={itemVariants}>
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <CheckCircle 
                size={64} 
                color={theme.palette.success.main} 
                strokeWidth={1.5}
              />
            </Box>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                fontFamily: 'Playfair Display', 
                fontWeight: 500,
                color: theme.palette.text.primary,
                mb: 2
              }}
            >
              Order Confirmed
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: alpha(theme.palette.text.primary, 0.7),
                maxWidth: 600,
                mx: 'auto',
                mb: 2,
                fontSize: '1.1rem'
              }}
            >
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: alpha(theme.palette.text.primary, 0.6),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Clock size={16} />
              You will receive a confirmation email shortly
            </Typography>
          </motion.div>
        </Box>

        {order && (
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                mb: 4
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: 'Playfair Display',
                      fontWeight: 500,
                      color: theme.palette.text.primary
                    }}
                  >
                    Order #{order.orderNumber}
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: alpha(theme.palette.text.primary, 0.6)
                    }}
                  >
                    {new Date(order.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle1"
                  sx={{ 
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    color: theme.palette.primary.main,
                    py: 0.5,
                    px: 1.5,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    textTransform: 'capitalize'
                  }}
                >
                  {order.status}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: 'Playfair Display',
                  fontWeight: 500,
                  mb: 2
                }}
              >
                Items Ordered
              </Typography>

              <Box sx={{ mb: 4 }}>
                {order.items.map((item, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      py: 2,
                      borderBottom: index < order.items.length - 1 ? 
                        `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none'
                    }}
                  >
                    <Box 
                      component="img"
                      src={item.productImage}
                      alt={item.productName}
                      sx={{ 
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 1,
                        mr: 2
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle1"
                        sx={{ 
                          fontFamily: 'Inter',
                          fontWeight: 500
                        }}
                      >
                        {item.productName}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: alpha(theme.palette.text.primary, 0.6)
                        }}
                      >
                        Quantity: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="subtitle1"
                      sx={{ 
                        fontFamily: 'Inter',
                        fontWeight: 500
                      }}
                    >
                      ${item.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontFamily: 'Playfair Display',
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    Shipping Address
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    {order.shippingAddress.addressLine1}
                    {order.shippingAddress.addressLine2 && <>, {order.shippingAddress.addressLine2}</>}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}<br />
                    {order.shippingAddress.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontFamily: 'Playfair Display',
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    Order Summary
                  </Typography>
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
                  <Divider sx={{ my: 1.5 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                      ${order.total.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<ShoppingBag size={18} />}
              onClick={handleContinueShopping}
              sx={{ 
                borderRadius: 0,
                py: 1.5,
                borderColor: alpha(theme.palette.text.primary, 0.3),
                color: theme.palette.text.primary,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  bgcolor: 'transparent'
                }
              }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowRight size={18} />}
              onClick={handleViewAllOrders}
              sx={{ 
                borderRadius: 0,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.9),
                  boxShadow: 'none'
                }
              }}
            >
              View All Orders
            </Button>
          </Box>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default OrderCompletePage; 