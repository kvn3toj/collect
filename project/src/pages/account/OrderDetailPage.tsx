import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Box, Paper, Grid, Button, Divider, Chip, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Mock data for order details - in a real app, this would come from an API
const mockOrderDetails = {
  id: 'ORD-001',
  date: '2023-08-15T10:30:00Z',
  status: 'delivered',
  total: 850.00,
  subtotal: 800.00,
  shipping: 50.00,
  tax: 0,
  paymentMethod: 'Credit Card (ending in 4242)',
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    phoneNumber: '+1 (555) 123-4567'
  },
  items: [
    {
      id: 'PROD-001',
      name: 'Diamond Pendant Necklace',
      variant: '18K White Gold',
      price: 450.00,
      quantity: 1,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 'PROD-002',
      name: 'Pearl Earrings',
      variant: 'Silver',
      price: 175.00,
      quantity: 2,
      image: 'https://via.placeholder.com/100'
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processing':
      return 'warning';
    case 'shipped':
      return 'info';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<typeof mockOrderDetails | null>(null);
  
  // In a real app, this would fetch order details from the API
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setOrder(mockOrderDetails);
      setLoading(false);
    }, 800);
    
    // Example API call:
    // const fetchOrderDetails = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await orderService.getOrderDetails(id);
    //     setOrder(response);
    //   } catch (error) {
    //     console.error('Failed to fetch order details', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchOrderDetails();
  }, [id]);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!order) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Order not found
        </Typography>
        <Button 
          component={Link} 
          to="/account/orders" 
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to My Orders
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          component={Link} 
          to="/account/orders" 
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Back to My Orders
        </Button>
        
        <Typography variant="h4">
          Order #{order.id}
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Order Date
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {new Date(order.date).toLocaleDateString()}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Chip 
              label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
              color={getStatusColor(order.status) as "warning" | "info" | "success" | "error" | "default"}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Total
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
              ${order.total.toFixed(2)}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Payment Method
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {order.paymentMethod}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
            <Typography variant="h5" gutterBottom>
              Order Items
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Variant</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{ width: 50, height: 50, mr: 2, objectFit: 'cover' }}
                          />
                          <Typography variant="body2">{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.variant}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2">Subtotal:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">${order.subtotal.toFixed(2)}</Typography>
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="body2">Shipping:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">${order.shipping.toFixed(2)}</Typography>
                </Grid>
                
                {order.tax > 0 && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="body2">Tax:</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <Typography variant="body2">${order.tax.toFixed(2)}</Typography>
                    </Grid>
                  </>
                )}
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Total:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2">${order.total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Shipping Address
            </Typography>
            
            <Typography variant="body1">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 && (
                <>, {order.shippingAddress.addressLine2}</>
              )}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
              <br />
              {order.shippingAddress.phoneNumber}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetailPage; 