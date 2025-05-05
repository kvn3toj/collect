import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  useTheme,
  alpha
} from '@mui/material';
import { ArrowLeft, ArrowRight, CreditCard, Truck, Check } from 'lucide-react';
import useCartStore from '../stores/cartStore';
import { useQuery, useMutation } from '@tanstack/react-query';
import orderService from '../services/orderService';
import CheckoutTutorial from '../components/tutorial/CheckoutTutorial';
import { PremiumPackaging } from '../components/premium/PremiumPackaging';
import { InsuranceOptions } from '../components/premium/InsuranceOptions';
import { CreateOrderData } from '../types/order.types';
import { motion } from 'framer-motion';

// Pasos del checkout
const steps = ['Shipping', 'Premium Services', 'Payment', 'Review'];

const CheckoutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const { items: cartItems, clearCart } = useCartStore();
  
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

  // Premium services state
  const [premiumServices, setPremiumServices] = useState({
    packagingId: '',
    insuranceId: '',
    giftMessage: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Obtener opciones de packaging con React Query
  const {
    data: packagingOptions = [],
    isLoading: isLoadingPackaging,
    error: packagingError,
  } = useQuery({
    queryKey: ['packagingOptions'],
    queryFn: orderService.getPackagingOptions,
  });

  // Obtener opciones de seguro con React Query
  const {
    data: insuranceOptions = [],
    isLoading: isLoadingInsurance,
    error: insuranceError,
  } = useQuery({
    queryKey: ['insuranceOptions'],
    queryFn: orderService.getInsuranceOptions,
  });

  // Mutación para crear un pedido
  const createOrderMutation = useMutation({
    mutationFn: (data: CreateOrderData) => orderService.createOrder(data),
    onSuccess: (data) => {
      clearCart();
      // Navegar a la página de confirmación con el ID del pedido
      navigate(`/order-complete?orderId=${data.id}`, { state: { orderId: data.id } });
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      setErrors({
        ...errors,
        submit: 'Error creating order. Please try again.'
      });
    }
  });

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
    } else if (activeStep === 2) {
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
    // Crear datos del pedido según el formato esperado por la API
    const orderData: CreateOrderData = {
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        customizations: item.customizations
      })),
      shippingAddress: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        addressLine1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postalCode: shippingInfo.zip,
        country: shippingInfo.country,
        phoneNumber: shippingInfo.phone
      },
      billingAddress: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        addressLine1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postalCode: shippingInfo.zip,
        country: shippingInfo.country,
        phoneNumber: shippingInfo.phone
      },
      paymentMethod: 'credit_card',
      premiumOptions: {
        packagingId: premiumServices.packagingId || undefined,
        insuranceId: premiumServices.insuranceId || undefined,
        giftMessage: premiumServices.giftMessage || undefined
      }
    };
    
    // Enviar datos a la API
    createOrderMutation.mutate(orderData);
  };
  
  const handleReturnToHome = () => {
    navigate('/');
  };

  const handlePackagingSelect = (packagingId: string, giftMessage?: string) => {
    setPremiumServices({
      ...premiumServices,
      packagingId,
      giftMessage: giftMessage || ''
    });
  };

  const handleInsuranceSelect = (insuranceId: string) => {
    setPremiumServices({
      ...premiumServices,
      insuranceId
    });
  };

  // Render shipping step
  const renderShippingStep = () => (
    <Grid container spacing={3}>
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
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Email Address"
          name="email"
          value={shippingInfo.email}
          onChange={handleShippingChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Phone Number"
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
          label="ZIP / Postal Code"
          name="zip"
          value={shippingInfo.zip}
          onChange={handleShippingChange}
          error={!!errors.zip}
          helperText={errors.zip}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            name="country"
            value={shippingInfo.country}
            label="Country"
            onChange={handleShippingChange}
          >
            <MenuItem value="US">United States</MenuItem>
            <MenuItem value="CA">Canada</MenuItem>
            <MenuItem value="MX">Mexico</MenuItem>
            <MenuItem value="UK">United Kingdom</MenuItem>
            <MenuItem value="FR">France</MenuItem>
            <MenuItem value="DE">Germany</MenuItem>
            <MenuItem value="ES">Spain</MenuItem>
            <MenuItem value="IT">Italy</MenuItem>
            <MenuItem value="JP">Japan</MenuItem>
            <MenuItem value="AU">Australia</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <Typography variant="h6" gutterBottom>
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
              label={
                <Box>
                  <Typography variant="body1">Standard Shipping (5-7 business days)</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {subtotal > 100 ? 'Free' : '$9.99'}
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value="express"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1">Express Shipping (2-3 business days)</Typography>
                  <Typography variant="body2" color="text.secondary">
                    $19.99
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );

  // Render premium services step
  const renderPremiumServicesStep = () => {
    if (isLoadingPackaging || isLoadingInsurance) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        </Box>
      );
    }

    if (packagingError || insuranceError) {
      return (
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.error.main, 0.1),
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
          }}
        >
          {(packagingError instanceof Error && packagingError.message) || 
           (insuranceError instanceof Error && insuranceError.message) || 
           'Error loading premium options'}
        </Alert>
      );
    }

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: 'Playfair Display',
              fontWeight: 500,
              mb: 3 
            }}
          >
            Premium Packaging
          </Typography>
          <Box sx={{ mb: 4 }}>
            <PremiumPackaging 
              onSelect={handlePackagingSelect}
              selectedPackagingId={premiumServices.packagingId}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />
        </Grid>
        
        <Grid item xs={12}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: 'Playfair Display',
              fontWeight: 500,
              mb: 3 
            }}
          >
            Insurance Options
          </Typography>
          <Box>
            <InsuranceOptions 
              onSelect={handleInsuranceSelect}
              selectedInsuranceId={premiumServices.insuranceId}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  // Renderizar paso de pago
  const renderPaymentStep = () => (
    <Grid container spacing={3} id="payment-method">
      <Grid item xs={12}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: 'Playfair Display',
            fontWeight: 500,
            mb: 3 
          }}
        >
          Payment Details
        </Typography>
      </Grid>
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
        <Alert 
          severity="info" 
          icon={<CreditCard size={16} />}
          sx={{ 
            borderRadius: 2, 
            bgcolor: alpha(theme.palette.info.main, 0.1),
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
          }}
        >
          All transactions are secure and encrypted. Your financial information is never stored on our servers.
        </Alert>
      </Grid>
    </Grid>
  );

  // Renderizar paso de revisión
  const renderReviewStep = () => {
    // Encontrar nombres de opciones premium seleccionadas
    const selectedPackaging = packagingOptions.find(opt => opt.id === premiumServices.packagingId);
    const selectedInsurance = insuranceOptions.find(opt => opt.id === premiumServices.insuranceId);
    
    // Calcular costos de premium
    const packagingCost = selectedPackaging ? selectedPackaging.price : 0;
    const insuranceCost = selectedInsurance ? selectedInsurance.price : 0;
    
    // Calcular total con servicios premium
    const totalWithPremium = total + packagingCost + insuranceCost;
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
        </Grid>
        
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.productId}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={item.product.images?.[0] || '/placeholder.jpg'}
                  alt={item.product.name}
                  sx={{ width: 60, height: 60, objectFit: 'cover', mr: 2, borderRadius: 1 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    Quantity: {item.quantity}
                  </Typography>
                  {item.customizations && Object.keys(item.customizations).length > 0 && (
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                      Customizations: {Object.entries(item.customizations).map(([key, value]) => `${key}: ${value}`).join(', ')}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                ${(item.totalPrice || (item.product.price * item.quantity)).toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        ))}
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Shipping Address</Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 0.5 }}>
            {shippingInfo.address}
          </Typography>
          <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 0.5 }}>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
          </Typography>
          <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 0.5 }}>
            {shippingInfo.country}
          </Typography>
          <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 0.5 }}>
            Email: {shippingInfo.email}
          </Typography>
          <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
            Phone: {shippingInfo.phone}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
            Shipping Method: {shippingInfo.shippingMethod === 'standard' ? 'Standard (5-7 days)' : 'Express (2-3 days)'}
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Premium Services</Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Packaging: {selectedPackaging ? selectedPackaging.name : 'Standard Packaging'}
          </Typography>
          {selectedPackaging && (
            <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 1 }}>
              ${selectedPackaging.price.toFixed(2)}
            </Typography>
          )}
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Insurance: {selectedInsurance ? selectedInsurance.name : 'No Insurance'}
          </Typography>
          {selectedInsurance && (
            <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), mb: 1 }}>
              ${selectedInsurance.price.toFixed(2)}
            </Typography>
          )}
          {premiumServices.giftMessage && (
            <>
              <Typography variant="body1" sx={{ mb: 0.5, mt: 1 }}>
                Gift Message:
              </Typography>
              <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7), fontStyle: 'italic' }}>
                "{premiumServices.giftMessage}"
              </Typography>
            </>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Payment Details</Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            {paymentInfo.cardName}
          </Typography>
          <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
            Card ending in {paymentInfo.cardNumber.slice(-4)}
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">${shipping.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Tax</Typography>
              <Typography variant="body1">${tax.toFixed(2)}</Typography>
            </Box>
            
            {/* Costos de servicios premium */}
            {selectedPackaging && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Premium Packaging ({selectedPackaging.name})</Typography>
                <Typography variant="body1">${selectedPackaging.price.toFixed(2)}</Typography>
              </Box>
            )}
            
            {selectedInsurance && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Insurance ({selectedInsurance.name})</Typography>
                <Typography variant="body1">${selectedInsurance.price.toFixed(2)}</Typography>
              </Box>
            )}
            
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                ${totalWithPremium.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {errors.submit && (
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: 2, 
                mb: 2,
                bgcolor: alpha(theme.palette.error.main, 0.1),
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
              }}
            >
              {errors.submit}
            </Alert>
          )}
        </Grid>
      </Grid>
    );
  };

  // Render different content based on step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderShippingStep();
      case 1:
        return renderPremiumServicesStep();
      case 2:
        return renderPaymentStep();
      case 3:
        return renderReviewStep();
      default:
        return 'Unknown step';
    }
  };

  if (createOrderMutation.isPending) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress size={60} sx={{ color: theme.palette.primary.main, opacity: 0.8, mb: 4 }} />
        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: alpha(theme.palette.text.primary, 0.7) }}>
          Processing your order...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
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
        Checkout
      </Typography>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 5,
            '& .MuiStepLabel-root .Mui-completed': {
              color: theme.palette.primary.main,
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: theme.palette.primary.main,
            }
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 2, md: 4 },
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                bgcolor: alpha(theme.palette.background.paper, 0.5)
              }}
            >
              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowLeft size={16} />}
                  sx={{ 
                    color: theme.palette.text.primary,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={activeStep === steps.length - 1 ? <Check size={16} /> : <ArrowRight size={16} />}
                  disabled={createOrderMutation.isPending}
                  sx={{ 
                    borderRadius: 0,
                    py: 1,
                    px: 3,
                    bgcolor: theme.palette.primary.main,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.9),
                      boxShadow: 'none'
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 2, md: 3 },
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
              
              <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 3 }}>
                {cartItems.map((item) => (
                  <Box key={item.productId} sx={{ mb: 2, display: 'flex' }}>
                    <Box
                      component="img"
                      src={item.product.images?.[0] || '/placeholder.jpg'}
                      alt={item.product.name}
                      sx={{ width: 50, height: 50, objectFit: 'cover', mr: 2, borderRadius: 1 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                        Qty: {item.quantity}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    Shipping
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                    Tax
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    ${tax.toFixed(2)}
                  </Typography>
                </Box>
                
                {/* Mostrar costos premium si están seleccionados */}
                {activeStep >= 1 && premiumServices.packagingId && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                      Premium Packaging
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${(packagingOptions.find(p => p.id === premiumServices.packagingId)?.price || 0).toFixed(2)}
                    </Typography>
                  </Box>
                )}
                
                {activeStep >= 1 && premiumServices.insuranceId && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.7) }}>
                      Insurance
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ${(insuranceOptions.find(i => i.id === premiumServices.insuranceId)?.price || 0).toFixed(2)}
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                  ${(
                    total + 
                    (packagingOptions.find(p => p.id === premiumServices.packagingId)?.price || 0) +
                    (insuranceOptions.find(i => i.id === premiumServices.insuranceId)?.price || 0)
                  ).toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default CheckoutPage; 