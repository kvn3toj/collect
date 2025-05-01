import React from 'react';
import { Typography, Box, Paper, Button, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Pagination } from '@mui/material';
import { Search, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

// Mock orders data - in a real app, this would come from an API
const mockOrders = [
  {
    id: 'ORD-1092',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    date: '2023-08-15',
    total: 450.00,
    items: 1,
    status: 'delivered',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1091',
    customer: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    date: '2023-08-14',
    total: 1250.00,
    items: 3,
    status: 'processing',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1090',
    customer: 'Michael Brown',
    email: 'michael.brown@example.com',
    date: '2023-08-14',
    total: 780.50,
    items: 2,
    status: 'shipped',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1089',
    customer: 'Emily Davis',
    email: 'emily.davis@example.com',
    date: '2023-08-13',
    total: 325.00,
    items: 1,
    status: 'delivered',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-1088',
    customer: 'David Wilson',
    email: 'david.wilson@example.com',
    date: '2023-08-12',
    total: 960.75,
    items: 4,
    status: 'cancelled',
    paymentStatus: 'refunded'
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

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'pending':
      return 'warning';
    case 'refunded':
      return 'error';
    default:
      return 'default';
  }
};

const AdminOrdersPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  return (
    <AdminLayout>
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Search orders..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: '100%', sm: '300px' } }}
            />
            
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Button variant="outlined" sx={{ mr: 1 }}>
                Filter
              </Button>
              <Button variant="outlined">
                Export
              </Button>
            </Box>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.customer}</Typography>
                      <Typography variant="caption" color="text.secondary">{order.email}</Typography>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                        color={getStatusColor(order.status) as "success" | "info" | "warning" | "error" | "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)} 
                        color={getPaymentStatusColor(order.paymentStatus) as "success" | "warning" | "error" | "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        component={Link}
                        to={`/admin/orders/${order.id}`}
                        size="small"
                      >
                        <Eye size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination 
              count={10} 
              page={page} 
              onChange={handleChangePage} 
              color="primary" 
            />
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminOrdersPage; 