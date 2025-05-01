import React, { useState } from 'react';
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
  Alert
} from '@mui/material';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, ShoppingCart } from 'lucide-react';

// Simulamos datos para el carrito
const mockCartItems = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    price: 29.99,
    image: '/placeholder.jpg',
    quantity: 2,
    color: 'Black',
    size: 'M'
  },
  {
    id: '2',
    name: 'Designer Jeans',
    price: 89.99,
    image: '/placeholder.jpg',
    quantity: 1,
    color: 'Blue',
    size: '32'
  }
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calcular impuestos (10%)
  const tax = subtotal * 0.1;
  
  // Calcular envío
  const shipping = subtotal > 100 ? 0 : 9.99;
  
  // Calcular total
  const total = subtotal + tax + shipping - promoDiscount;

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
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

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <ShoppingCart size={64} strokeWidth={1} style={{ opacity: 0.5, marginBottom: 24 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Looks like you haven't added any products to your cart yet.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
      </Typography>
      
      <Grid container spacing={4}>
        {/* Cart Items Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            {cartItems.map(item => (
              <Box key={item.id}>
                <Grid container spacing={2} alignItems="center">
                  {/* Product Image */}
                  <Grid item xs={3} sm={2}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: '100%', height: 'auto', borderRadius: 1 }}
                    />
                  </Grid>
                  
                  {/* Product Info */}
                  <Grid item xs={9} sm={5}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Color: {item.color} | Size: {item.size}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight="medium" sx={{ mt: 1 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Grid>
                  
                  {/* Quantity Controls */}
                  <Grid item xs={7} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            handleQuantityChange(item.id, value);
                          }
                        }}
                        inputProps={{ 
                          min: 1, 
                          style: { textAlign: 'center' }
                        }}
                        variant="outlined"
                        size="small"
                        sx={{ width: '60px', mx: 1 }}
                      />
                      <IconButton 
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </IconButton>
                    </Box>
                  </Grid>
                  
                  {/* Subtotal & Remove */}
                  <Grid item xs={5} sm={2} sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ mt: 1 }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button 
                startIcon={<ShoppingBag />}
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Button>
              <Button 
                variant="contained"
                endIcon={<ArrowRight />}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Order Summary Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Tax (10%)</Typography>
              <Typography variant="body2">${tax.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </Typography>
            </Box>
            
            {promoDiscount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="error">Discount</Typography>
                <Typography variant="body2" color="error">-${promoDiscount.toFixed(2)}</Typography>
              </Box>
            )}
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
              <Typography variant="subtitle1" fontWeight="bold">${total.toFixed(2)}</Typography>
            </Box>
            
            {/* Promo Code Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Promo Code
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleApplyPromo}
                >
                  Apply
                </Button>
              </Box>
              {promoApplied && (
                <Alert severity="success" sx={{ mt: 1, py: 0 }}>
                  Promo code applied successfully!
                </Alert>
              )}
              {promoCode && !promoApplied && (
                <Alert severity="error" sx={{ mt: 1, py: 0 }}>
                  Invalid promo code.
                </Alert>
              )}
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              fullWidth
              endIcon={<ArrowRight />}
              onClick={handleCheckout}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
            
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              Secure Checkout Process
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage; 