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
import ConfiguratorTutorial from '../components/tutorial/ConfiguratorTutorial';

// Simulamos la función de servicio para obtener un producto personalizable
const getCustomizableProduct = async (id: string) => {
  // Para despliegue visual estático, simularemos un retraso y luego un error
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // En versión de despliegue, forzamos un "error" de carga para mostrar mensaje
  return Promise.reject(new Error("Personalizador no disponible temporalmente"));
  
  /* DATOS SIMULADOS - COMENTADOS PARA DESPLIEGUE VISUAL ESTÁTICO
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
  */
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

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['customizable-product', id],
    queryFn: () => getCustomizableProduct(id || ''),
    enabled: !!id,
    onSuccess: (data) => {
      // Initialize with default values
      if (data && data.customizationOptions) {
        setCustomizations({
          ...customizations,
          color: data.customizationOptions.colors?.[0] || '',
          material: data.customizationOptions.materials?.[0] || '',
        });
      }
    },
    // Desactivar refetch para evitar llamadas infinitas en el entorno de despliegue
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false
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
        <Alert severity="info" sx={{ mb: 3 }}>
          El personalizador de productos está temporalmente no disponible. Estamos trabajando para habilitarlo pronto.
        </Alert>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Por favor, visite nuestra colección de productos estándar o contáctenos para solicitudes personalizadas.
        </Typography>
        <Button startIcon={<ArrowLeft />} onClick={() => navigate('/products')} sx={{ mt: 2 }}>
          Ver Productos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative' }}>
      {/* Integramos el tutorial del configurador */}
      <ConfiguratorTutorial />
      
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
          <Paper sx={{ p: 3, mb: 3, position: 'relative' }} id="preview-3d">
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
              startIcon={<Save />}
              onClick={handleSaveCustomization}
            >
              Save Design
            </Button>
            <Button 
              variant="contained" 
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
        
        {/* Customization Options */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Basic Options" />
              <Tab label="Advanced Options" />
            </Tabs>
            
            <Box hidden={activeTab !== 0}>
              <Grid container spacing={3}>
                {/* Gemstone selector */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Stone Type</Typography>
                  <Box id="gemstone-selector" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {['Emerald', 'Sapphire', 'Ruby', 'Diamond', 'Amethyst'].map((stone) => (
                      <Button 
                        key={stone}
                        variant={customizations.color === stone ? 'contained' : 'outlined'}
                        onClick={() => setCustomizations({...customizations, color: stone})}
                        sx={{ minWidth: 100 }}
                      >
                        {stone}
                      </Button>
                    ))}
                  </Box>
                </Grid>
                
                {/* Metal selector */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Metal</Typography>
                  <Box id="metal-selector" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {['Gold', 'Silver', 'Platinum', 'Rose Gold', 'White Gold'].map((metal) => (
                      <Button 
                        key={metal}
                        variant={customizations.material === metal ? 'contained' : 'outlined'}
                        onClick={() => setCustomizations({...customizations, material: metal})}
                        sx={{ minWidth: 100 }}
                      >
                        {metal}
                      </Button>
                    ))}
                  </Box>
                </Grid>
                
                {/* Setting selector */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Setting Style</Typography>
                  <Box id="setting-selector" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {['Prong', 'Bezel', 'Pave', 'Channel', 'Tension'].map((setting) => (
                      <Button 
                        key={setting}
                        variant="outlined"
                        sx={{ minWidth: 100 }}
                      >
                        {setting}
                      </Button>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            <Box hidden={activeTab !== 1}>
              <Grid container spacing={3}>
                {/* Additional options */}
                <Grid item xs={12} id="additional-options">
                  <Typography variant="subtitle1" gutterBottom>Engraving</Typography>
                  <TextField
                    fullWidth
                    label="Engraving Text"
                    variant="outlined"
                    value={customizations.engravingText}
                    onChange={handleCustomizationChange('engravingText')}
                    placeholder="Enter text to engrave"
                    helperText="Up to 20 characters"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Size</Typography>
                  <TextField
                    type="number"
                    label="Size"
                    variant="outlined"
                    value={customizations.size}
                    onChange={handleSizeChange}
                    InputProps={{
                      inputProps: { 
                        min: product.customizationOptions?.sizing?.min || 5, 
                        max: product.customizationOptions?.sizing?.max || 15,
                        step: product.customizationOptions?.sizing?.step || 0.5
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomizerPage; 