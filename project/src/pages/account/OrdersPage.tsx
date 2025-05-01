import React from 'react';
import { Typography, Box, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for orders - in a real app, this would come from an API
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2023-08-15',
    total: 850.00,
    status: 'delivered',
    items: 3,
  },
  {
    id: 'ORD-002',
    date: '2023-07-20',
    total: 1250.00,
    status: 'processing',
    items: 2,
  },
  {
    id: 'ORD-003',
    date: '2023-06-02',
    total: 450.00,
    status: 'delivered',
    items: 1,
  }
];

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

const OrdersPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState(mockOrders);
  
  // In a real app, this would fetch orders from the API
  React.useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    
    // Example API call:
    // const fetchOrders = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await orderService.getUserOrders();
    //     setOrders(response);
    //   } catch (error) {
    //     console.error('Failed to fetch orders', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchOrders();
  }, []);
  
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      
      <Grid container spacing={4}>
        {/* Sidebar with account navigation */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="outlined" 
                sx={{ justifyContent: 'flex-start' }}
                href="/account"
              >
                Profile
              </Button>
              <Button 
                variant="contained" 
                sx={{ justifyContent: 'flex-start' }}
              >
                Orders
              </Button>
              <Button 
                variant="outlined" 
                sx={{ justifyContent: 'flex-start' }}
                href="/account/addresses"
              >
                Addresses
              </Button>
              <Button 
                variant="outlined" 
                sx={{ justifyContent: 'flex-start' }}
                href="/account/wishlist"
              >
                Wishlist
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Main content area */}
        <Grid item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order History
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : orders.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell component="th" scope="row">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                            color={getStatusColor(order.status) as "warning" | "info" | "success" | "error" | "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button 
                            component={Link} 
                            to={`/account/orders/${order.id}`}
                            variant="outlined"
                            size="small"
                          >
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" gutterBottom>
                  You haven't placed any orders yet.
                </Typography>
                <Button 
                  component={Link} 
                  to="/products" 
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Shop Now
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrdersPage; 