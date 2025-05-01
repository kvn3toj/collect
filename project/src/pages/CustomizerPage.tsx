import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Tabs,
  Tab,
  TextField
} from '@mui/material';
import { ArrowLeft, Save, ShoppingCart } from 'lucide-react';

// Simulamos la función de servicio para obtener un producto personalizable
const getCustomizableProduct = async (id: string) => {
  // En una aplicación real, esto sería una llamada API
  return {
    id,
    name: 'Customizable Product ' + id,
    price: 149.99,
    description: 'This product can be fully customized to your preferences.',
    images: ['/sample-customizable.jpg'],
    customizationOptions: {
      colors: ['Red', 'Blue', 'Green', 'Black', 'White'],
      materials: ['Cotton', 'Leather', 'Synthetic', 'Wool'],
      engraving: true,
      sizing: {
        min: 5,
        max: 15,
        step: 0.5
      }
    }
  };
};

const CustomizerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [customizations, setCustomizations] = useState({
    color: '',
    material: '',
    engravingText: '',
    size: 10
  });

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['customizable-product', id],
    queryFn: () => getCustomizableProduct(id || ''),
    enabled: !!id,
    onSuccess: (data) => {
      // Initialize with default values
      setCustomizations({
        ...customizations,
        color: data.customizationOptions.colors[0],
        material: data.customizationOptions.materials[0],
      });
    }
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCustomizationChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomizations({
      ...customizations,
      [field]: event.target.value
    });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (product && !isNaN(value)) {
      const { min, max } = product.customizationOptions.sizing;
      if (value >= min && value <= max) {
        setCustomizations({
          ...customizations,
          size: value
        });
      }
    }
  };

  const handleSaveCustomization = () => {
    // In a real app, this would save the customization to the server
    console.log('Saving customization:', customizations);
  };

  const handleAddToCart = () => {
    // In a real app, this would add the customized product to the cart
    console.log('Adding to cart:', { product, customizations });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading customizer...</Typography>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error loading product customizer. Please try again later.</Alert>
        <Button startIcon={<ArrowLeft />} onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowLeft />} 
        sx={{ mb: 3 }} 
        onClick={() => navigate('/products')}
      >
        Back to Products
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Customize: {product.name}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        {product.description}
      </Typography>
      
      <Grid container spacing={4}>
        {/* Product Preview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3, position: 'relative' }}>
            <Typography variant="h6" gutterBottom>Preview</Typography>
            <Box
              component="img"
              src={product.images[0] || '/placeholder.jpg'}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 1
              }}
            />
            
            {/* Customization overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                bgcolor: 'rgba(255,255,255,0.8)',
                p: 2,
                borderRadius: 1
              }}
            >
              <Typography variant="subtitle2">Current Selections:</Typography>
              <Typography variant="body2">Color: {customizations.color}</Typography>
              <Typography variant="body2">Material: {customizations.material}</Typography>
              {customizations.engravingText && (
                <Typography variant="body2">Engraving: "{customizations.engravingText}"</Typography>
              )}
              <Typography variant="body2">Size: {customizations.size}</Typography>
            </Box>
          </Paper>
          
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mt: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              startIcon={<Save />}
              onClick={handleSaveCustomization}
              sx={{ flex: 1 }}
            >
              Save Design
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ flex: 1 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
        
        {/* Customization Options */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Customize Your Product</Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="customization options">
                <Tab label="Colors & Materials" />
                <Tab label="Engraving" />
                <Tab label="Sizing" />
              </Tabs>
            </Box>
            
            {/* Colors & Materials Tab */}
            <Box role="tabpanel" hidden={activeTab !== 0} sx={{ mt: 3 }}>
              {activeTab === 0 && (
                <>
                  <Typography variant="subtitle1" gutterBottom>Select Color</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {product.customizationOptions.colors.map(color => (
                      <Button 
                        key={color}
                        variant={customizations.color === color ? "contained" : "outlined"}
                        onClick={() => setCustomizations({...customizations, color})}
                        sx={{ minWidth: 'auto', px: 2 }}
                      >
                        {color}
                      </Button>
                    ))}
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom>Select Material</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.customizationOptions.materials.map(material => (
                      <Button 
                        key={material}
                        variant={customizations.material === material ? "contained" : "outlined"}
                        onClick={() => setCustomizations({...customizations, material})}
                        sx={{ minWidth: 'auto', px: 2 }}
                      >
                        {material}
                      </Button>
                    ))}
                  </Box>
                </>
              )}
            </Box>
            
            {/* Engraving Tab */}
            <Box role="tabpanel" hidden={activeTab !== 1} sx={{ mt: 3 }}>
              {activeTab === 1 && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Add Personalized Engraving
                  </Typography>
                  <TextField
                    fullWidth
                    label="Engraving Text"
                    variant="outlined"
                    value={customizations.engravingText}
                    onChange={handleCustomizationChange('engravingText')}
                    helperText="Maximum 20 characters"
                    inputProps={{ maxLength: 20 }}
                    sx={{ mb: 2 }}
                  />
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Engraving will appear on the product as shown in the preview. 
                    Please review your text carefully before adding to cart.
                  </Alert>
                </>
              )}
            </Box>
            
            {/* Sizing Tab */}
            <Box role="tabpanel" hidden={activeTab !== 2} sx={{ mt: 3 }}>
              {activeTab === 2 && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    Select Size (Min: {product.customizationOptions.sizing.min}, 
                    Max: {product.customizationOptions.sizing.max})
                  </Typography>
                  <TextField
                    fullWidth
                    label="Size"
                    type="number"
                    variant="outlined"
                    value={customizations.size}
                    onChange={handleSizeChange}
                    inputProps={{ 
                      step: product.customizationOptions.sizing.step,
                      min: product.customizationOptions.sizing.min,
                      max: product.customizationOptions.sizing.max
                    }}
                    sx={{ mb: 2 }}
                  />
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomizerPage; 