import React from 'react';
import { Typography, Box, Paper, Grid, Card, CardContent, Avatar, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

// Mock dashboard data - in a real app, this would come from an API
const dashboardData = {
  metrics: {
    totalSales: 28950.75,
    totalOrders: 145,
    activeUsers: 320,
    conversionRate: 3.2
  },
  recentOrders: [
    {
      id: 'ORD-1092',
      customer: 'John Smith',
      date: '2023-08-15',
      total: 450.00,
      status: 'delivered'
    },
    {
      id: 'ORD-1091',
      customer: 'Emma Johnson',
      date: '2023-08-14',
      total: 1250.00,
      status: 'processing'
    },
    {
      id: 'ORD-1090',
      customer: 'Michael Brown',
      date: '2023-08-14',
      total: 780.50,
      status: 'shipped'
    },
    {
      id: 'ORD-1089',
      customer: 'Emily Davis',
      date: '2023-08-13',
      total: 325.00,
      status: 'delivered'
    }
  ],
  popularProducts: [
    {
      id: 'PROD-001',
      name: 'Diamond Pendant Necklace',
      sales: 24,
      revenue: 10800.00
    },
    {
      id: 'PROD-015',
      name: 'Pearl Stud Earrings',
      sales: 18,
      revenue: 3150.00
    },
    {
      id: 'PROD-008',
      name: 'Gold Chain Bracelet',
      sales: 15,
      revenue: 4800.00
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processing':
      return '#FFA726'; // Orange
    case 'shipped':
      return '#29B6F6'; // Light Blue
    case 'delivered':
      return '#66BB6A'; // Green
    case 'cancelled':
      return '#EF5350'; // Red
    default:
      return '#9E9E9E'; // Grey
  }
};

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        {/* Overview metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Sales
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  ${dashboardData.metrics.totalSales.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 30 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Orders
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {dashboardData.metrics.totalOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 30 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Active Users
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {dashboardData.metrics.activeUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 30 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Conversion Rate
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {dashboardData.metrics.conversionRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 30 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Grid container spacing={4}>
          {/* Recent Orders */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Recent Orders
                </Typography>
                
                <Link to="/admin/orders" style={{ textDecoration: 'none', color: 'primary.main' }}>
                  <Typography variant="body2">
                    View All
                  </Typography>
                </Link>
              </Box>
              
              <List>
                {dashboardData.recentOrders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <ListItem
                      alignItems="flex-start"
                      component={Link}
                      to={`/admin/orders/${order.id}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': {
                          backgroundColor: 'action.hover'
                        }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography component="span" variant="subtitle2">
                              {order.id}
                            </Typography>
                            <Typography component="span" variant="body2">
                              ${order.total.toFixed(2)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {order.customer}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(order.date).toLocaleDateString()}
                              </Typography>
                              <Box 
                                component="span" 
                                sx={{ 
                                  color: getStatusColor(order.status),
                                  fontWeight: 500,
                                  fontSize: '0.75rem',
                                  textTransform: 'capitalize'
                                }}
                              >
                                {order.status}
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    {index < dashboardData.recentOrders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          
          {/* Popular Products */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Top Selling Products
                </Typography>
                
                <Link to="/admin/products" style={{ textDecoration: 'none', color: 'primary.main' }}>
                  <Typography variant="body2">
                    View All
                  </Typography>
                </Link>
              </Box>
              
              <List>
                {dashboardData.popularProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <ListItem
                      alignItems="flex-start"
                      component={Link}
                      to={`/admin/products/${product.id}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': {
                          backgroundColor: 'action.hover'
                        }
                      }}
                    >
                      <Avatar 
                        variant="rounded"
                        sx={{ 
                          mr: 2, 
                          bgcolor: 'grey.200',
                          color: 'grey.800',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          width: 40,
                          height: 40
                        }}
                      >
                        {index + 1}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography component="span" variant="subtitle2">
                              {product.name}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              {product.sales} sold
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                              ${product.revenue.toLocaleString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < dashboardData.popularProducts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboardPage; 