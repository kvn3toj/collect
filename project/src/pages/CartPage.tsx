import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Alert,
  useTheme,
  alpha,
  CircularProgress
} from '@mui/material';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingCart,
  Loader 
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import cartService from '../services/cartService';
import { CartItem } from '../types/product.types';
import useAuthStore from '../stores/authStore';
import { motion } from 'framer-motion';

// Animación para el contenedor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    }
  }
};

// Animación para los elementos del carrito
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const CartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Obtener los items del carrito usando React Query
  const { data: cartItems = [], isLoading, isError, error } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    // Usar refetchOnWindowFocus para mantener los datos actualizados
    refetchOnWindowFocus: true,
    // Mostrar datos obsoletos mientras se revalidan
    staleTime: 60000, // 1 minuto
  });

  // Mutation para eliminar item del carrito
  const removeMutation = useMutation({
    mutationFn: cartService.removeCartItem,
    onSuccess: () => {
      // Invalidar consulta para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Mutation para actualizar cantidad de un item
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string, quantity: number }) => 
      cartService.updateCartItem(itemId, quantity),
    onSuccess: () => {
      // Invalidar consulta para refrescar los datos
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Calcular subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.totalPrice ?? (item.product?.price || 0) * item.quantity), 0
  );
  
  // Calcular impuestos (10%)
  const tax = subtotal * 0.1;
  
  // Calcular envío
  const shipping = subtotal > 100 ? 0 : 9.99;
  
  // Calcular total
  const total = subtotal + tax + shipping - promoDiscount;

  const handleRemoveItem = (productId: string) => {
    removeMutation.mutate(productId);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantityMutation.mutate({ itemId: productId, quantity: newQuantity });
  };

  const handleApplyPromo = () => {
    // Simular validación de código promocional
    if (promoCode.toUpperCase() === 'DISCOUNT20') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.2); // 20% de descuento
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  // Logging para debuggear problemas con productos faltantes
  useEffect(() => {
    if (cartItems.length > 0) {
      // Verificar elementos sin producto o con producto incompleto
      const itemsWithMissingProduct = cartItems.filter(item => 
        !item.product || !item.product.images || !item.product.price
      );
      
      if (itemsWithMissingProduct.length > 0) {
        console.warn('⚠️ Elementos del carrito con datos de producto incompletos:', itemsWithMissingProduct);
        
        // Log de todos los elementos para comparación
        console.log('Todos los elementos del carrito:', cartItems);
      }
    }
  }, [cartItems]);

  // Si está cargando
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress size={40} sx={{ color: theme.palette.primary.main, opacity: 0.8, mb: 4 }} />
        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: alpha(theme.palette.text.primary, 0.7) }}>
          Loading your cart...
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
          {error instanceof Error ? error.message : 'Error loading cart'}
        </Alert>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleContinueShopping}
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

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingCart 
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
            component="h1" 
            gutterBottom
            sx={{ 
              fontFamily: 'Playfair Display', 
              fontWeight: 500,
              color: theme.palette.text.primary,
              mb: 3
            }}
          >
            Your cart is empty
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
            There are currently no items in your shopping cart. Explore our collection to discover exquisite emerald jewelry crafted with the finest materials.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleContinueShopping}
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
            Explore Collection
          </Button>
        </motion.div>
      </Container>
    );
  }

  // Si hay items en el carrito
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
          Shopping Cart
        </Typography>

        <Grid container spacing={4}>
          {/* Lista de items */}
          <Grid item xs={12} md={8}>
            <Box component={Paper} 
              elevation={0}
              sx={{ 
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                mb: 4
              }}
            >
              {/* Encabezados en desktop */}
              <Box 
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  pb: 2,
                  mb: 3
                }}
              >
                <Typography 
                  variant="subtitle2"
                  sx={{ 
                    flex: '2 1 auto',
                    color: alpha(theme.palette.text.primary, 0.7),
                    fontWeight: 500
                  }}
                >
                  Item
                </Typography>
                <Typography 
                  variant="subtitle2"
                  sx={{ 
                    flex: '1 1 auto',
                    color: alpha(theme.palette.text.primary, 0.7),
                    fontWeight: 500,
                    textAlign: 'center'
                  }}
                >
                  Quantity
                </Typography>
                <Typography 
                  variant="subtitle2"
                  sx={{ 
                    flex: '1 1 auto',
                    color: alpha(theme.palette.text.primary, 0.7),
                    fontWeight: 500,
                    textAlign: 'right'
                  }}
                >
                  Price
                </Typography>
              </Box>

              {/* Lista de items del carrito */}
              {cartItems.map((item) => (
                <motion.div key={item.productId} variants={itemVariants}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { xs: 'flex-start', md: 'center' },
                      py: 3,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    }}
                  >
                    {/* Información del producto */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      flex: '2 1 auto',
                      width: { xs: '100%', md: 'auto' },
                      mb: { xs: 2, md: 0 }
                    }}>
                      {/* Imagen */}
                      <Box 
                        component="img"
                        src={item.product?.images?.[0] || '/assets/placeholder-product.svg'}
                        alt={item.product?.name || 'Product'}
                        sx={{ 
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          mr: 2,
                          borderRadius: 1
                        }}
                      />
                      
                      {/* Nombre y detalles */}
                      <Box>
                        <Typography 
                          variant="h6"
                          sx={{ 
                            fontFamily: 'Playfair Display',
                            fontWeight: 500,
                            mb: 0.5,
                            fontSize: { xs: '1rem', md: '1.1rem' }
                          }}
                        >
                          {item.product?.name || 'Product'}
                        </Typography>
                        
                        {item.customizations && Object.keys(item.customizations).length > 0 && (
                          <Typography 
                            variant="body2"
                            sx={{ 
                              color: alpha(theme.palette.text.secondary, 0.9),
                              mb: 1
                            }}
                          >
                            {Object.entries(item.customizations).map(([key, value]) => (
                              `${key}: ${value}`
                            )).join(', ')}
                          </Typography>
                        )}
                        
                        {/* Precio unitario en móvil */}
                        <Typography 
                          variant="body2"
                          sx={{ 
                            display: { xs: 'block', md: 'none' },
                            color: alpha(theme.palette.text.secondary, 0.9),
                            mb: 1
                          }}
                        >
                          Unit Price: ${((item.product?.discountPrice || item.product?.price || 0)).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Control de cantidad */}
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: { xs: 'flex-start', md: 'center' },
                      flex: '1 1 auto',
                      width: { xs: '100%', md: 'auto' },
                      mb: { xs: 2, md: 0 }
                    }}>
                      <IconButton
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        size="small"
                        sx={{ 
                          color: theme.palette.text.secondary,
                          bgcolor: alpha(theme.palette.divider, 0.1),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.divider, 0.2),
                          }
                        }}
                      >
                        <Minus size={16} />
                      </IconButton>
                      
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          mx: 2,
                          minWidth: 24,
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      
                      <IconButton
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        size="small"
                        sx={{ 
                          color: theme.palette.text.secondary,
                          bgcolor: alpha(theme.palette.divider, 0.1),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.divider, 0.2),
                          }
                        }}
                      >
                        <Plus size={16} />
                      </IconButton>
                    </Box>
                    
                    {/* Precio total y botón eliminar */}
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: { xs: 'space-between', md: 'flex-end' },
                      flex: '1 1 auto',
                      width: { xs: '100%', md: 'auto' }
                    }}>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          color: theme.palette.text.primary
                        }}
                      >
                        ${(item.totalPrice ?? (item.product?.price || 0) * item.quantity).toFixed(2)}
                      </Typography>
                      
                      <IconButton
                        onClick={() => handleRemoveItem(item.productId)}
                        sx={{ 
                          color: theme.palette.grey[500],
                          '&:hover': {
                            color: theme.palette.error.main,
                          },
                          ml: { xs: 0, md: 2 }
                        }}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>

            <Button 
              startIcon={<ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />}
              variant="text"
              onClick={handleContinueShopping}
              sx={{ 
                color: alpha(theme.palette.text.primary, 0.8),
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent'
                }
              }}
            >
              Continue shopping
            </Button>
          </Grid>

          {/* Resumen de pedido */}
          <Grid item xs={12} md={4}>
            <Box component={Paper} 
              elevation={0}
              sx={{ 
                p: 3,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5)
              }}
            >
              <Typography 
                variant="h5"
                sx={{ 
                  fontFamily: 'Playfair Display',
                  fontWeight: 500,
                  mb: 3
                }}
              >
                Order Summary
              </Typography>

              <Box sx={{ mb: 2 }}>
                {/* Subtotal */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>

                {/* Impuestos */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    Tax (10%)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ${tax.toFixed(2)}
                  </Typography>
                </Box>

                {/* Envío */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    Shipping
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Box>

                {/* Descuento */}
                {promoApplied && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body1" sx={{ color: theme.palette.success.main }}>
                      Discount
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.success.main }}>
                      -${promoDiscount.toFixed(2)}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Total */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              {/* Código Promocional */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle2"
                  sx={{ 
                    fontWeight: 500,
                    mb: 1.5
                  }}
                >
                  Promo Code
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    placeholder="Enter code"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    sx={{
                      '.MuiOutlinedInput-root': {
                        borderRadius: 0,
                      }
                    }}
                  />
                  <Button 
                    variant="outlined"
                    onClick={handleApplyPromo}
                    disabled={!promoCode}
                    sx={{ 
                      borderRadius: 0,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      }
                    }}
                  >
                    Apply
                  </Button>
                </Box>

                {promoApplied && (
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mt: 1.5, 
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    }}
                  >
                    Code DISCOUNT20 applied (20% off)
                  </Alert>
                )}
              </Box>

              {/* Botón de checkout */}
              <Button 
                variant="contained" 
                fullWidth 
                endIcon={<ArrowRight size={16} />}
                onClick={handleCheckout}
                sx={{ 
                  borderRadius: 0,
                  py: 1.5,
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.9),
                    boxShadow: 'none',
                  }
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default CartPage; 