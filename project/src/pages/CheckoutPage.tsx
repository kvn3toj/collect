import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Divider,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  RadioGroup,
  Radio,
  Alert,
  CircularProgress
} from '@mui/material';
import { ArrowLeft, ArrowRight, CreditCard, Truck, Check } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import CheckoutTutorial from '../components/tutorial/CheckoutTutorial';

// Pasos del checkout
const steps = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Datos de formulario
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    shippingMethod: 'standard'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { items: cartItems, clearCart } = useCartStore();
  // Calcular subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      (typeof item.totalPrice === 'number'
        ? item.totalPrice
        : ((item.product?.precio ?? item.product?.price ?? 0) * (item.quantity ?? 1))),
    0
  );
  // Calcular impuestos (10%)
  const tax = subtotal * 0.1;
  // Calcular envío
  const shipping = subtotal > 100 ? 0 : 9.99;
  // Calcular total
  const total = subtotal + tax + shipping;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setShippingInfo({
        ...shippingInfo,
        [name]: value
      });
      
      // Limpiar error cuando el campo se actualiza
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setPaymentInfo({
        ...paymentInfo,
        [name]: value
      });
      
      // Limpiar error cuando el campo se actualiza
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: checked
    });
  };

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingInfo.firstName) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email) newErrors.email = 'Email is required';
    if (!shippingInfo.phone) newErrors.phone = 'Phone is required';
    if (!shippingInfo.address) newErrors.address = 'Address is required';
    if (!shippingInfo.city) newErrors.city = 'City is required';
    if (!shippingInfo.state) newErrors.state = 'State is required';
    if (!shippingInfo.zip) newErrors.zip = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!paymentInfo.cardName) newErrors.cardName = 'Name on card is required';
    if (!paymentInfo.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!paymentInfo.expDate) newErrors.expDate = 'Expiration date is required';
    if (!paymentInfo.cvv) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    let isValid = false;
    
    // Validar según el paso actual
    if (activeStep === 0) {
      isValid = validateShippingForm();
    } else if (activeStep === 1) {
      isValid = validatePaymentForm();
    } else {
      isValid = true;
    }
    
    if (isValid) {
      if (activeStep === steps.length - 1) {
        handlePlaceOrder();
      } else {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };
  
  const handlePlaceOrder = () => {
    setLoading(true);
    
    // Simular proceso de orden
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };
  
  const handleReturnToHome = () => {
    navigate('/');
  };

  // Renderizar paso de envío
  const renderShippingStep = () => (
    <Grid container spacing={3} id="shipping-form">
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={shippingInfo.firstName}
          onChange={handleShippingChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={shippingInfo.lastName}
          onChange={handleShippingChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={shippingInfo.email}
          onChange={handleShippingChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingChange}
          error={!!errors.address}
          helperText={errors.address}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleShippingChange}
          error={!!errors.city}
          helperText={errors.city}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="State/Province"
          name="state"
          value={shippingInfo.state}
          onChange={handleShippingChange}
          error={!!errors.state}
          helperText={errors.state}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="ZIP/Postal Code"
          name="zip"
          value={shippingInfo.zip}
          onChange={handleShippingChange}
          error={!!errors.zip}
          helperText={errors.zip}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            value={shippingInfo.country}
            label="Country"
            onChange={handleShippingChange}
          >
            <MenuItem value="US">United States</MenuItem>
            <MenuItem value="CA">Canada</MenuItem>
            <MenuItem value="MX">Mexico</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          Shipping Method
        </Typography>
        <RadioGroup
          name="shippingMethod"
          value={shippingInfo.shippingMethod}
          onChange={handleShippingChange}
        >
          <FormControlLabel 
            value="standard" 
            control={<Radio />} 
            label="Standard Shipping (3-5 business days) - Free" 
          />
          <FormControlLabel 
            value="express" 
            control={<Radio />} 
            label="Express Shipping (1-2 business days) - $9.99" 
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );

  // Renderizar paso de pago
  const renderPaymentStep = () => (
    <Grid container spacing={3} id="payment-method">
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Name on Card"
          name="cardName"
          value={paymentInfo.cardName}
          onChange={handlePaymentChange}
          error={!!errors.cardName}
          helperText={errors.cardName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Card Number"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentChange}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
          inputProps={{ maxLength: 19 }}
          placeholder="XXXX XXXX XXXX XXXX"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Expiration Date"
          name="expDate"
          value={paymentInfo.expDate}
          onChange={handlePaymentChange}
          error={!!errors.expDate}
          helperText={errors.expDate}
          placeholder="MM/YY"
          inputProps={{ maxLength: 5 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="CVV"
          name="cvv"
          value={paymentInfo.cvv}
          onChange={handlePaymentChange}
          error={!!errors.cvv}
          helperText={errors.cvv}
          inputProps={{ maxLength: 4 }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={paymentInfo.saveCard} 
              onChange={handleCheckboxChange} 
              name="saveCard" 
              color="primary" 
            />
          }
          label="Save card for future purchases"
        />
      </Grid>
      <Grid item xs={12}>
        <Alert severity="info" icon={<CreditCard size={16} />}>
          All transactions are secure and encrypted. Your financial information is never stored on our servers.
        </Alert>
      </Grid>
    </Grid>
  );

  // Renderizar paso de revisión
  const renderReviewStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        {cartItems.map(item => (
          <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              {(item.product?.nombre || item.product?.name || 'Producto')} × {item.quantity}
            </Typography>
            <Typography variant="body2">
              ${(item.totalPrice ?? (item.product?.precio ?? item.product?.price ?? 0) * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Tax</Typography>
          <Typography variant="body2">${tax.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
          <Typography variant="subtitle1" fontWeight="bold">${total.toFixed(2)}</Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping Information
        </Typography>
        <Typography variant="body2">
          {shippingInfo.firstName} {shippingInfo.lastName}
        </Typography>
        <Typography variant="body2">
          {shippingInfo.address}
        </Typography>
        <Typography variant="body2">
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </Typography>
        <Typography variant="body2">
          {shippingInfo.country === 'US' ? 'United States' : 
           shippingInfo.country === 'CA' ? 'Canada' : 'Mexico'}
        </Typography>
        <Typography variant="body2">
          {shippingInfo.email} | {shippingInfo.phone}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontWeight: 'medium' }}>
          <Truck size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          {shippingInfo.shippingMethod === 'standard' ? 
            'Standard Shipping (3-5 business days)' : 
            'Express Shipping (1-2 business days)'}
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        <Typography variant="body2">
          <CreditCard size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Alert severity="warning">
          Please review all information above before placing your order. By clicking "Place Order", 
          you agree to our terms and conditions and confirm that all provided information is correct.
        </Alert>
      </Grid>
    </Grid>
  );

  // Renderizar confirmación de pedido
  const renderOrderComplete = () => (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Box sx={{ 
        width: 70, 
        height: 70, 
        borderRadius: '50%', 
        bgcolor: 'success.light', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 24px'
      }}>
        <Check size={40} color="white" />
      </Box>
      
      <Typography variant="h4" gutterBottom>
        Order Placed Successfully!
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Thank you for your purchase. Your order has been received and is being processed.
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 4 }}>
        Order #: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 4 }}>
        A confirmation email has been sent to {shippingInfo.email}
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        onClick={handleReturnToHome}
        sx={{ minWidth: 200 }}
      >
        Return to Home
      </Button>
    </Box>
  );

  // Render different content based on step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderShippingStep();
      case 1:
        return renderPaymentStep();
      case 2:
        return renderReviewStep();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative' }}>
      <CheckoutTutorial />
      
      <Typography variant="h4" sx={{ mb: 4, fontFamily: "'Playfair Display', serif" }}>
        {orderComplete ? 'Order Confirmed' : 'Checkout'}
      </Typography>
      
      {orderComplete ? (
        renderOrderComplete()
      ) : (
        <>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
                {getStepContent(activeStep)}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }} id="cart-review">
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                
                <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
                  {cartItems.map((item) => (
                    <Box key={item.product.id} sx={{ mb: 2, display: 'flex' }}>
                      <Box
                        component="img"
                        src={item.product.images?.[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography variant="body2">
                          ${item.totalPrice?.toFixed(2) ?? 
                            ((item.product?.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Shipping</Typography>
                    <Typography variant="body2">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Tax</Typography>
                    <Typography variant="body2">${tax.toFixed(2)}</Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
                
                <Box id="certificate-info" sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight="medium" gutterBottom>
                    Certificación y Garantía
                  </Typography>
                  <Typography variant="caption">
                    Todas nuestras joyas incluyen certificado GIA de autenticidad, garantía internacional 
                    y seguimiento de origen ético de las esmeraldas colombianas.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              startIcon={<ArrowLeft />}
              onClick={activeStep === 0 ? handleReturnToHome : handleBack}
            >
              {activeStep === 0 ? 'Back to Shopping' : 'Back'}
            </Button>
            <div id="final-review">
              <Button
                variant="contained"
                endIcon={
                  loading ? <CircularProgress size={24} color="inherit" /> : 
                  activeStep === steps.length - 1 ? <Check /> : <ArrowRight />
                }
                onClick={handleNext}
                disabled={loading}
              >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </div>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CheckoutPage; 