import React from 'react';
import { Typography, Box, Paper, Button, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Pagination, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert } from '@mui/material';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import supabaseClient from '../../lib/supabaseClient';

// Definir tipo para productos
interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockStatus: string;
  category: string;
  metal: string;
  featured: boolean;
  // Campos adicionales para consistencia con backend
  createdAt?: string;
  updatedAt?: string;
  stock?: number;
  description?: string;
  images?: string[];
}

// Mock products data - Usado como fallback si hay errores
const mockProducts: Product[] = [
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

// Función para obtener productos desde Supabase
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
};

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [editPrice, setEditPrice] = React.useState('');
  const [priceError, setPriceError] = React.useState<string | null>(null);
  const [connectionError, setConnectionError] = React.useState<string | null>(null);
  
  // Activar React Query
  const queryClient = useQueryClient();
  
  // Usar React Query para obtener productos
  const { 
    data: products = [], 
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  // Manejar errores de conexión
  React.useEffect(() => {
    if (error) {
      console.error('Error fetching products:', error);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Mostrar un mensaje específico para errores comunes
      if (errorMessage.includes('Invalid API key')) {
        setConnectionError('Error de autenticación con Supabase. Verifica la API key en el archivo .env');
        toast.error('Error de conexión con Supabase');
      } else if (errorMessage.includes('relation "products" does not exist')) {
        setConnectionError('La tabla "products" no existe en Supabase. Ejecuta el script SQL de migración.');
        toast.error('Tabla de productos no encontrada');
      } else {
        setConnectionError(`Error al cargar productos: ${errorMessage}`);
        toast.error('Error al cargar productos');
      }
    } else {
      setConnectionError(null);
    }
  }, [error]);
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, you would call an API to delete the product
    console.log(`Delete product with ID: ${id}`);
  };

  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setEditPrice(product.price.toString());
    setPriceError(null);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
    setEditPrice('');
    setPriceError(null);
  };

  const handleEditPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditPrice(value);
    
    // Validación del precio
    if (value === '') {
      setPriceError('El precio no puede estar vacío');
    } else if (isNaN(parseFloat(value))) {
      setPriceError('Debe ser un número válido');
    } else if (parseFloat(value) < 0) {
      setPriceError('El precio no puede ser negativo');
    } else {
      setPriceError(null);
    }
  };

  // Función para conectar con Supabase
  const updateProductPrice = async (productId: string, newPrice: number) => {
    try {
      const { error } = await supabaseClient
        .from('products')
        .update({ price: newPrice })
        .eq('id', productId);
        
      if (error) throw error;
      
      return { id: productId, price: newPrice };
    } catch (error) {
      console.error('Error updating product price:', error);
      throw error;
    }
  };
  
  // Mutación con React Query para actualizar el precio
  const updatePriceMutation = useMutation({
    mutationFn: (variables: { productId: string; price: number }) => 
      updateProductPrice(variables.productId, variables.price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      // Actualizar también el estado local para reflejar el cambio inmediatamente
      if (selectedProduct) {
        // No es necesario actualizar el estado local ya que React Query
        // se encargará de actualizar los datos automáticamente
        toast.success(`Precio de ${selectedProduct?.name} actualizado a $${parseFloat(editPrice).toFixed(2)}`);
      }
      
      handleCloseEditDialog();
    },
    onError: (error) => {
      console.error('Error updating product price:', error);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Mensajes específicos según el error
      if (errorMessage.includes('Invalid API key')) {
        toast.error('Error de autenticación con Supabase. Verifica la API key.');
      } else if (errorMessage.includes('permission denied')) {
        toast.error('Permiso denegado para actualizar productos. Verifica las políticas RLS.');
      } else {
        toast.error('Error al actualizar el precio en la base de datos.');
      }
    }
  });
  
  const handleSavePrice = () => {
    if (!selectedProduct || priceError || editPrice === '') return;
    
    const newPrice = parseFloat(editPrice);
    
    // Validación adicional de precio (opcional)
    const MAX_PRICE = 1000000; // Ejemplo de límite de precio
    if (newPrice > MAX_PRICE) {
      setPriceError(`El precio no puede exceder $${MAX_PRICE.toLocaleString()}`);
      return;
    }
    
    try {
      // Usar la mutación para actualizar en Supabase
      updatePriceMutation.mutate({ 
        productId: selectedProduct.id, 
        price: newPrice 
      });
      
    } catch (error) {
      console.error('Error en la actualización:', error);
      toast.error('Ocurrió un error al iniciar la actualización del precio');
    }
  };
  
  // Renderizar contenido condicional según el estado
  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Cargando productos...</Typography>
        </Box>
      );
    }
    
    if (connectionError) {
      return (
        <Alert 
          severity="error" 
          sx={{ mt: 3, mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}>
              Reintentar
            </Button>
          }
        >
          {connectionError}
        </Alert>
      );
    }
    
    // Si hay error pero no se manejó específicamente, mostrar datos mock
    const displayProducts = error ? mockProducts : products;
    
    return (
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
            {displayProducts.map((product: Product) => (
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
                    size="small"
                    color="primary"
                    onClick={() => handleOpenEditDialog(product)}
                    title="Editar precio"
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
    );
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
          
          {renderContent()}
          
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
      
      {/* Diálogo mejorado de edición de precio */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCloseEditDialog}
        PaperProps={{ sx: { minWidth: '300px' } }}
      >
        <DialogTitle>Editar Precio del Producto</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ mb: 2, mt: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Producto: {selectedProduct.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                SKU: {selectedProduct.sku}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Precio actual: ${selectedProduct.price.toFixed(2)}
              </Typography>
              
              <TextField
                autoFocus
                label="Nuevo Precio"
                type="number"
                fullWidth
                value={editPrice}
                onChange={handleEditPriceChange}
                error={!!priceError}
                helperText={priceError}
                margin="dense"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                disabled={updatePriceMutation.isPending}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseEditDialog}
            disabled={updatePriceMutation.isPending}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSavePrice} 
            variant="contained" 
            disabled={!!priceError || !editPrice || updatePriceMutation.isPending}
          >
            {updatePriceMutation.isPending ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProductsPage; 