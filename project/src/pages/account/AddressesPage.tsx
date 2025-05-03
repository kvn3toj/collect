import React, { useState } from 'react';
import { Typography, Box, Paper, Grid, Button, Card, CardContent, IconButton, Chip, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Address } from '../../types/user.types';

// Mock addresses - in a real app, this would come from an API
const mockAddresses: Address[] = [
  {
    id: 'addr-001',
    userId: 'user-001',
    type: 'shipping' as const,
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    phoneNumber: '+1 (555) 123-4567',
    isDefault: true
  },
  {
    id: 'addr-002',
    userId: 'user-001',
    type: 'billing' as const,
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '456 Park Ave',
    addressLine2: '',
    city: 'New York',
    state: 'NY',
    postalCode: '10002',
    country: 'United States',
    phoneNumber: '+1 (555) 123-4567',
    isDefault: true
  }
];

// Example country list - in a real app, this would come from an API
const countries = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Italy', label: 'Italy' },
];

// Example state list for US - in a real app, this would be dynamic based on country
const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

type AddressFormData = Omit<Address, 'id' | 'userId' | 'isDefault'> & { setAsDefault: boolean };

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [dialogTitle, setDialogTitle] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddressFormData>();
  
  const handleAddAddress = (type: 'shipping' | 'billing') => {
    setDialogTitle(`Add ${type === 'shipping' ? 'Shipping' : 'Billing'} Address`);
    setEditingAddress(null);
    reset({
      type,
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      phoneNumber: '',
      setAsDefault: false
    });
    setDialogOpen(true);
  };
  
  const handleEditAddress = (address: Address) => {
    setDialogTitle(`Edit ${address.type === 'shipping' ? 'Shipping' : 'Billing'} Address`);
    setEditingAddress(address);
    reset({
      ...address,
      setAsDefault: address.isDefault
    });
    setDialogOpen(true);
  };
  
  const handleDeleteAddress = (addressId: string) => {
    // In a real app, you would call an API to delete the address
    setAddresses(addresses.filter(addr => addr.id !== addressId));
  };
  
  const onSubmit = (data: AddressFormData) => {
    // In a real app, you would call an API to save the address
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => {
        if (addr.id === editingAddress.id) {
          return {
            ...addr,
            ...data,
            isDefault: data.setAsDefault
          };
        }
        
        // If this is set as default, update other addresses of the same type
        if (data.setAsDefault && addr.type === data.type && addr.id !== editingAddress.id) {
          return { ...addr, isDefault: false };
        }
        
        return addr;
      }));
    } else {
      // Add new address
      const newAddress: Address = {
        id: `addr-${Math.floor(Math.random() * 1000)}`,
        userId: 'user-001', // In a real app, this would come from the authenticated user
        ...data,
        isDefault: data.setAsDefault
      };
      
      // If this is set as default, update other addresses of the same type
      const updatedAddresses = data.setAsDefault 
        ? addresses.map(addr => 
            addr.type === data.type 
              ? { ...addr, isDefault: false } 
              : addr
          )
        : [...addresses];
      
      setAddresses([...updatedAddresses, newAddress]);
    }
    
    setDialogOpen(false);
  };
  
  const getAddressesByType = (type: 'shipping' | 'billing') => {
    return addresses.filter(address => address.type === type);
  };
  
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        My Addresses
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
                variant="outlined" 
                sx={{ justifyContent: 'flex-start' }}
                href="/account/orders"
              >
                Orders
              </Button>
              <Button 
                variant="contained" 
                sx={{ justifyContent: 'flex-start' }}
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
          {/* Shipping Addresses */}
          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">
                Shipping Addresses
              </Typography>
              
              <Button 
                variant="outlined" 
                onClick={() => handleAddAddress('shipping')}
              >
                Add New Address
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {getAddressesByType('shipping').length > 0 ? (
                getAddressesByType('shipping').map((address) => (
                  <Grid item xs={12} md={6} key={address.id}>
                    <Card variant="outlined">
                      <CardContent>
                        {address.isDefault && (
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Chip label="Default" size="small" color="primary" />
                          </Box>
                        )}
                        
                        <Typography variant="subtitle1">
                          {address.firstName} {address.lastName}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          {address.addressLine1}
                          {address.addressLine2 && <>, {address.addressLine2}</>}
                          <br />
                          {address.city}, {address.state} {address.postalCode}
                          <br />
                          {address.country}
                          <br />
                          {address.phoneNumber}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => handleEditAddress(address)}
                          >
                            Edit
                          </Button>
                          
                          {!address.isDefault && (
                            <Button 
                              variant="outlined" 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              Delete
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
                    You don't have any shipping addresses yet.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
          
          {/* Billing Addresses */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">
                Billing Addresses
              </Typography>
              
              <Button 
                variant="outlined" 
                onClick={() => handleAddAddress('billing')}
              >
                Add New Address
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {getAddressesByType('billing').length > 0 ? (
                getAddressesByType('billing').map((address) => (
                  <Grid item xs={12} md={6} key={address.id}>
                    <Card variant="outlined">
                      <CardContent>
                        {address.isDefault && (
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Chip label="Default" size="small" color="primary" />
                          </Box>
                        )}
                        
                        <Typography variant="subtitle1">
                          {address.firstName} {address.lastName}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          {address.addressLine1}
                          {address.addressLine2 && <>, {address.addressLine2}</>}
                          <br />
                          {address.city}, {address.state} {address.postalCode}
                          <br />
                          {address.country}
                          <br />
                          {address.phoneNumber}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => handleEditAddress(address)}
                          >
                            Edit
                          </Button>
                          
                          {!address.isDefault && (
                            <Button 
                              variant="outlined" 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              Delete
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
                    You don't have any billing addresses yet.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Address dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  {...register("firstName", { 
                    required: "First name is required" 
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  {...register("lastName", { 
                    required: "Last name is required" 
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Address Line 1"
                  fullWidth
                  margin="normal"
                  {...register("addressLine1", { 
                    required: "Address is required" 
                  })}
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1?.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Address Line 2 (Optional)"
                  fullWidth
                  margin="normal"
                  {...register("addressLine2")}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  fullWidth
                  margin="normal"
                  {...register("city", { 
                    required: "City is required" 
                  })}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="State"
                  fullWidth
                  margin="normal"
                  {...register("state", { 
                    required: "State is required" 
                  })}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                >
                  {usStates.map((state) => (
                    <MenuItem key={state.value} value={state.value}>
                      {state.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Postal Code"
                  fullWidth
                  margin="normal"
                  {...register("postalCode", { 
                    required: "Postal code is required" 
                  })}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Country"
                  fullWidth
                  margin="normal"
                  {...register("country", { 
                    required: "Country is required" 
                  })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  {...register("phoneNumber", { 
                    required: "Phone number is required" 
                  })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  label="Address Type"
                  fullWidth
                  margin="normal"
                  {...register("type", { 
                    required: "Address type is required" 
                  })}
                  error={!!errors.type}
                  helperText={errors.type?.message}
                >
                  <MenuItem value="shipping">Shipping Address</MenuItem>
                  <MenuItem value="billing">Billing Address</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    id="setAsDefault" 
                    {...register("setAsDefault")} 
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="setAsDefault">Set as default address</label>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AddressesPage; 