import React from 'react';
import { Typography, Box, Paper, Button, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Pagination } from '@mui/material';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Link } from 'react-router-dom';

// Mock products data - in a real app, this would come from an API
const mockProducts = [
  {
    id: 'PROD-001',
    name: 'Diamond Pendant Necklace',
    sku: 'DP-N1001',
    price: 450.00,
    stockStatus: 'in_stock',
    category: 'Necklaces',
    metal: '18K White Gold',
    featured: true
  },
  {
    id: 'PROD-002',
    name: 'Pearl Stud Earrings',
    sku: 'PE-S2001',
    price: 175.00,
    stockStatus: 'in_stock',
    category: 'Earrings',
    metal: 'Silver',
    featured: false
  },
  {
    id: 'PROD-003',
    name: 'Gold Chain Bracelet',
    sku: 'GC-B3001',
    price: 320.00,
    stockStatus: 'low_stock',
    category: 'Bracelets',
    metal: '14K Gold',
    featured: true
  },
  {
    id: 'PROD-004',
    name: 'Emerald Ring',
    sku: 'ER-R4001',
    price: 550.00,
    stockStatus: 'out_of_stock',
    category: 'Rings',
    metal: 'Platinum',
    featured: false
  },
  {
    id: 'PROD-005',
    name: 'Sapphire Drop Earrings',
    sku: 'SD-E5001',
    price: 375.00,
    stockStatus: 'in_stock',
    category: 'Earrings',
    metal: '18K White Gold',
    featured: true
  }
];

const getStockStatusColor = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'success';
    case 'low_stock':
      return 'warning';
    case 'out_of_stock':
      return 'error';
    default:
      return 'default';
  }
};

const getStockStatusLabel = (status: string) => {
  switch (status) {
    case 'in_stock':
      return 'In Stock';
    case 'low_stock':
      return 'Low Stock';
    case 'out_of_stock':
      return 'Out of Stock';
    default:
      return status;
  }
};

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, you would call an API to delete the product
    console.log(`Delete product with ID: ${id}`);
  };
  
  return (
    <AdminLayout>
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Products
          </Typography>
          
          <Button 
            variant="contained" 
            startIcon={<Plus size={18} />}
            component={Link}
            to="/admin/products/new"
          >
            Add Product
          </Button>
        </Box>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Search products..."
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
                  <TableCell>Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Metal</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Featured</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.metal}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStockStatusLabel(product.stockStatus)} 
                        color={getStockStatusColor(product.stockStatus) as "success" | "warning" | "error" | "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {product.featured ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        component={Link}
                        to={`/admin/products/${product.id}/edit`}
                        size="small"
                      >
                        <Edit size={18} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={18} />
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

export default AdminProductsPage; 