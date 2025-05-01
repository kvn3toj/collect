import React from 'react';
import { Typography, Box, Paper, Button, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar, IconButton, Pagination } from '@mui/material';
import { Search, UserPlus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

// Mock users data - in a real app, this would come from an API
const mockUsers = [
  {
    id: 'user-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-15T10:30:00Z',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    orders: 5
  },
  {
    id: 'user-002',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-08-14T15:45:00Z',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    orders: 0
  },
  {
    id: 'user-003',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-08-10T09:15:00Z',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    orders: 8
  },
  {
    id: 'user-004',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2023-07-28T14:20:00Z',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
    orders: 3
  },
  {
    id: 'user-005',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    role: 'user',
    status: 'blocked',
    lastLogin: '2023-06-15T08:50:00Z',
    avatar: 'https://mui.com/static/images/avatar/5.jpg',
    orders: 1
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'warning';
    case 'blocked':
      return 'error';
    default:
      return 'default';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'primary';
    case 'user':
      return 'default';
    default:
      return 'default';
  }
};

const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, you would call an API to delete the user
    console.log(`Delete user with ID: ${id}`);
  };
  
  return (
    <AdminLayout>
      <Box sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Users
          </Typography>
          
          <Button 
            variant="contained" 
            startIcon={<UserPlus size={18} />}
          >
            Add User
          </Button>
        </Box>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Search users..."
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
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Orders</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={user.avatar} 
                          alt={`${user.firstName} ${user.lastName}`}
                          sx={{ mr: 2, width: 36, height: 36 }}
                        />
                        <Typography variant="body2">
                          {user.firstName} {user.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                        color={getRoleColor(user.role) as "primary" | "default"}
                        size="small"
                        variant={user.role === 'admin' ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={user.status.charAt(0).toUpperCase() + user.status.slice(1)} 
                        color={getStatusColor(user.status) as "success" | "warning" | "error" | "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <Edit size={18} />
                      </IconButton>
                      {user.role !== 'admin' && (
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      )}
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

export default AdminUsersPage; 