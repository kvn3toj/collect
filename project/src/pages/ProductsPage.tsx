import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  Button,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  useTheme,
  alpha,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { Search, Close } from '../utils/icons';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import ProductGrid from '../components/products/ProductGrid';
import { ProductFilter, Product } from '../types/product.types';
import CatalogTutorial from '../components/tutorial/CatalogTutorial';
import LoadingState from '../components/globalStates/LoadingState';
import ErrorState from '../components/globalStates/ErrorState';
import EmptyState from '../components/globalStates/EmptyState';

// Definición de interfaz para opciones de catálogo
interface CatalogOption {
  value: string;
  label: string;
}

type FilterType = 'category' | 'metal' | 'priceRange' | 'tag' | 'inStock';

interface ActiveFilters {
  category?: string;
  metal?: string;
  priceRange?: [number, number];
  tags: string[];
  inStock?: boolean;
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 10000000];

const ProductsPage: React.FC = () => {
  const theme = useTheme();
  const [jewelryTypeOptions, setJewelryTypeOptions] = useState<CatalogOption[]>([]);

  // Estado para filtros
  const [filters, setFilters] = useState<ProductFilter>({
    category: undefined,
    metal: undefined,
    priceRange: DEFAULT_PRICE_RANGE,
    sortBy: 'newest',
    tags: [],
    inStock: undefined,
    searchQuery: '',
  });

  // Estado para filtros aplicados (para mostrar chips)
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    category: undefined,
    metal: undefined,
    priceRange: DEFAULT_PRICE_RANGE,
    tags: [],
    inStock: undefined,
  });

  // Efecto para cargar opciones de filtrado
  useEffect(() => {
    // Datos estáticos para el despliegue inicial
    setJewelryTypeOptions([
      { value: 'rings', label: 'Rings' },
      { value: 'necklaces', label: 'Necklaces' },
      { value: 'earrings', label: 'Earrings' },
      { value: 'bracelets', label: 'Bracelets' },
    ]);
  }, []);

  // Consulta principal de productos
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAllProducts(filters),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  // Usar los productos obtenidos de la API
  const filteredAndSortedProducts = useMemo(() => {
    if (!data?.products?.length) return [];
    
    let result = [...data.products];
    
    // Aplicar filtrado por tipo de joya si hay alguno seleccionado
    if (filters.category && filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Aplicar filtrado por metal si hay alguno seleccionado
    if (filters.metal && filters.metal !== 'all') {
      result = result.filter(product => {
        const metalSpec = product.specifications?.metal;
        return metalSpec === filters.metal;
      });
    }
    
    // Aplicar ordenamiento por precio
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.discountPrice ?? a.price ?? Infinity;
        const priceB = b.discountPrice ?? b.price ?? Infinity;
        return priceA - priceB;
      });
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.discountPrice ?? a.price ?? -Infinity;
        const priceB = b.discountPrice ?? b.price ?? -Infinity;
        return priceB - priceA;
      });
    }
    
    return result;
  }, [data?.products, filters.category, filters.metal, filters.sortBy]);
  
  // Comentado: Para el despliegue visual estático, array vacío
  // const filteredAndSortedProducts: Product[] = [];

  // Aplicar filtros (guarda los filtros actuales como activos)
  const applyFilters = (): void => {
    setActiveFilters({
      category: filters.category,
      metal: filters.metal,
      priceRange: filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000)
        ? filters.priceRange 
        : undefined,
      tags: filters.tags || [],
      inStock: filters.inStock,
    });
  };

  // Resetear filtros
  const clearFilters = (): void => {
    setFilters({
      category: undefined,
      metal: undefined,
      priceRange: DEFAULT_PRICE_RANGE,
      sortBy: 'newest',
      tags: [],
      inStock: undefined,
      searchQuery: '',
    });
    setActiveFilters({
      category: undefined,
      metal: undefined,
      priceRange: DEFAULT_PRICE_RANGE,
      tags: [],
      inStock: undefined,
    });
  };

  // Quitar un filtro activo
  const removeFilter = (type: FilterType, value?: string): void => {
    if (type === 'category') {
      setFilters(prev => ({ ...prev, category: undefined }));
      setActiveFilters(prev => ({ ...prev, category: undefined }));
    } else if (type === 'metal') {
      setFilters(prev => ({ ...prev, metal: undefined }));
      setActiveFilters(prev => ({ ...prev, metal: undefined }));
    } else if (type === 'priceRange') {
      setFilters(prev => ({ ...prev, priceRange: DEFAULT_PRICE_RANGE }));
      setActiveFilters(prev => ({ ...prev, priceRange: undefined }));
    } else if (type === 'tag' && value) {
      setFilters(prev => ({
        ...prev,
        tags: prev.tags?.filter(tag => tag !== value) || [],
      }));
      setActiveFilters(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== value),
      }));
    } else if (type === 'inStock') {
      setFilters(prev => ({ ...prev, inStock: undefined }));
      setActiveFilters(prev => ({ ...prev, inStock: undefined }));
    }
  };

  // Handle search input
  const [searchInput, setSearchInput] = useState('');
  
  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery: searchInput }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>): void => {
    setFilters(prev => ({ ...prev, category: e.target.value || undefined }));
  };

  const handleSortChange = (e: SelectChangeEvent<string>): void => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value as ProductFilter['sortBy'] }));
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]): void => {
    setFilters(prev => ({ ...prev, priceRange: newValue as [number, number] }));
  };

  const hasActiveFilters = Object.entries(activeFilters).some(([, value]) => 
    value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
  );

  // Formatear el valor del precio para mostrar en el slider
  const formatPriceLabel = (value: number): string => `$${(value / 1000000).toFixed(1)}M`;

  if (isLoading) {
    return <LoadingState message="Cargando productos..." />;
  }

  if (error) {
    return (
      <ErrorState
        message="No pudimos cargar los productos. Por favor, intenta nuevamente."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!data?.products?.length) {
    return (
      <EmptyState
        title="No hay productos disponibles"
        message="No encontramos productos que coincidan con tus criterios de búsqueda."
        actionLabel="Limpiar filtros"
        onAction={clearFilters}
      />
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: { xs: 3, md: 4 },
              textAlign: 'center',
              color: 'text.primary'
            }}
          >
            Nuestra Colección
          </Typography>

          {/* Filtros */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 4,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}
          >
            <Grid container spacing={3}>
              {/* Sidebar de filtros */}
              <Grid item xs={12} md={3}>
                <Paper 
                  id="filter-panel"
                  elevation={0} 
                  sx={{
                    p: 3,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 2,
                    mb: { xs: 3, md: 0 }
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Playfair Display', serif" }}>
                    Filters
                  </Typography>
                  
                  {/* Search Field */}
                  <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      placeholder="Search emerald jewelry..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <IconButton 
                            type="submit" 
                            edge="end"
                            sx={{
                              color: theme.palette.primary.main,
                            }}
                          >
                            <Search fontSize="small" />
                          </IconButton>
                        ),
                        sx: {
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '0.9rem',
                          '&::placeholder': {
                            fontStyle: 'italic',
                            color: '#999',
                          }
                        }
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 0,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 0 0 1px ${alpha(theme.palette.primary.main, 0.25)}`,
                          }
                        },
                      }}
                    />
                  </Box>

                  {/* Filter Sections */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Category Filter */}
                    <FormControl>
                      <InputLabel 
                        id="category-label"
                        sx={{ 
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        Jewelry Type
                      </InputLabel>
                      <Select
                        labelId="category-label"
                        value={filters.category || ''}
                        onChange={handleCategoryChange}
                        label="Jewelry Type"
                        sx={{
                          fontFamily: "'Lato', sans-serif",
                          '& .MuiSelect-select': {
                            fontSize: '0.875rem',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha(theme.palette.divider, 0.2),
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                          }
                        }}
                      >
                        <MenuItem value="" sx={{ fontFamily: "'Lato', sans-serif" }}>
                          All Types
                        </MenuItem>
                        {jewelryTypeOptions.map((option) => (
                          <MenuItem 
                            key={option.value} 
                            value={option.value}
                            sx={{ 
                              fontFamily: "'Lato', sans-serif",
                              fontSize: '0.875rem',
                            }}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Price Range Filter */}
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          mb: 2,
                          color: 'text.primary',
                        }}
                      >
                        Price Range
                      </Typography>
                      <Slider
                        value={filters.priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000000}
                        step={100000}
                        valueLabelFormat={formatPriceLabel}
                        sx={{
                          color: theme.palette.primary.main,
                          '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                            transition: 'all 0.2s ease',
                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                            },
                            '&.Mui-active': {
                              width: 16,
                              height: 16,
                            },
                          },
                          '& .MuiSlider-rail': {
                            opacity: 0.32,
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 1,
                          px: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "'Lato', sans-serif",
                            color: 'text.secondary',
                          }}
                        >
                          ${formatPriceLabel(filters.priceRange?.[0] ?? 0)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "'Lato', sans-serif",
                            color: 'text.secondary',
                          }}
                        >
                          ${formatPriceLabel(filters.priceRange?.[1] ?? 10000000)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Apply Filters Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={applyFilters}
                      sx={{
                        py: 1.5,
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Apply Filters
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Filtros Activos */}
          {Object.keys(activeFilters).length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, color: 'text.secondary' }}
              >
                Filtros activos:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {activeFilters.category && (
                  <Chip
                    label={jewelryTypeOptions.find(opt => opt.value === activeFilters.category)?.label}
                    onDelete={() => removeFilter('category')}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.875rem',
                      borderRadius: theme.shape.borderRadius,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: 'text.primary',
                      '& .MuiChip-deleteIcon': {
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'text.primary',
                        }
                      }
                    }}
                  />
                )}
                {activeFilters.metal && (
                  <Chip
                    label={activeFilters.metal}
                    onDelete={() => removeFilter('metal')}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.875rem',
                      borderRadius: theme.shape.borderRadius,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: 'text.primary',
                      '& .MuiChip-deleteIcon': {
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'text.primary',
                        }
                      }
                    }}
                  />
                )}
                {activeFilters.priceRange && (
                  <Chip
                    label={`${formatPriceLabel(activeFilters.priceRange[0])} - ${formatPriceLabel(activeFilters.priceRange[1])}`}
                    onDelete={() => removeFilter('priceRange')}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.875rem',
                      borderRadius: theme.shape.borderRadius,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: 'text.primary',
                      '& .MuiChip-deleteIcon': {
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'text.primary',
                        }
                      }
                    }}
                  />
                )}
                {activeFilters.tags.length > 0 && (
                  activeFilters.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => removeFilter('tag', tag)}
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '0.875rem',
                        borderRadius: theme.shape.borderRadius,
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        color: 'text.primary',
                        '& .MuiChip-deleteIcon': {
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'text.primary',
                          }
                        }
                      }}
                    />
                  ))
                )}
                {activeFilters.inStock && (
                  <Chip
                    label={activeFilters.inStock ? 'In Stock' : 'Out of Stock'}
                    onDelete={() => removeFilter('inStock')}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.875rem',
                      borderRadius: theme.shape.borderRadius,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: 'text.primary',
                      '& .MuiChip-deleteIcon': {
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'text.primary',
                        }
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          )}

          {/* Grid de Productos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProductGrid
              products={filteredAndSortedProducts}
              spacing={{ xs: 2, sm: 3, md: 4 }}
            />
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProductsPage;