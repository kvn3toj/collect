import React, { useState, useEffect, useMemo } from 'react';
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
  Divider,
  Paper,
  Chip,
  IconButton,
  Drawer,
  useMediaQuery,
  CircularProgress,
  Collapse,
  Fade,
  Checkbox,
  FormGroup,
  FormControlLabel,
  useTheme,
  alpha,
  Alert,
} from '@mui/material';
import { FilterList, Search, SortOutlined, Close, iconProps } from '../utils/icons';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import ProductGrid from '../components/products/ProductGrid';
import { ProductFilter } from '../types/product.types';
import api from '../services/api';

// Definición de interfaz para opciones de catálogo
interface CatalogOption {
  value: string;
  label: string;
}

const ProductsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    metal: true,
    tags: true,
  });

  // Estado para opciones de filtrado dinámicas
  const [jewelryTypeOptions, setJewelryTypeOptions] = useState<CatalogOption[]>([]);
  const [metalOptions, setMetalOptions] = useState<CatalogOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  // Estado para filtros
  const [filters, setFilters] = useState<ProductFilter>({
    category: undefined, // Tipo de joya
    metal: undefined,    // Tipo de metal
    priceRange: [0, 10000000], // Ahora en dólares, de 0 a 10 millones
    sortBy: 'newest',
    tags: [],
    inStock: undefined, // Removido el filtro por defecto
    searchQuery: '',
  });

  // Estado para filtros aplicados (para mostrar chips)
  const [activeFilters, setActiveFilters] = useState<{
    category?: string;
    metal?: string;
    priceRange?: [number, number];
    tags: string[];
    inStock?: boolean;
  }>({
    category: undefined,
    metal: undefined,
    priceRange: [0, 10000000], // Ajustado para precios en COP
    tags: [],
    inStock: undefined,
  });

  // Consulta para obtener categorías (tipos de joya)
  const { data: categories } = useQuery({
    queryKey: ['product-categories'],
    queryFn: () => productService.getProductCategories(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Efecto para cargar opciones de filtrado desde la API
  useEffect(() => {
    // Comentamos temporalmente las llamadas API para el despliegue inicial
    /*
    const fetchFilterOptions = async () => {
      setIsLoadingOptions(true);
      setOptionsError(null);
      
      try {
        // Utilizamos Promise.all para hacer ambas peticiones en paralelo
        const [jewelryTypesResponse, metalsResponse] = await Promise.all([
          api.get('jewelry_types'),
          api.get('metals')
        ]);
        
        // Transformamos las respuestas al formato de CatalogOption
        setJewelryTypeOptions(
          jewelryTypesResponse.data.map((item: any) => ({
            value: item.id,
            label: item.name
          }))
        );
        
        setMetalOptions(
          metalsResponse.data.map((item: any) => ({
            value: item.id,
            label: item.name
          }))
        );
      } catch (error) {
        console.error('Error fetching filter options:', error);
        setOptionsError('Failed to load filter options. Please try again later.');
      } finally {
        setIsLoadingOptions(false);
      }
    };
    
    fetchFilterOptions();
    */

    // Datos estáticos para el despliegue inicial
    setJewelryTypeOptions([
      { value: 'rings', label: 'Rings' },
      { value: 'necklaces', label: 'Necklaces' },
      { value: 'earrings', label: 'Earrings' },
      { value: 'bracelets', label: 'Bracelets' },
    ]);
    
    setMetalOptions([
      { value: 'gold-18k', label: 'Gold 18K' },
      { value: 'white-gold', label: 'White Gold' },
      { value: 'rose-gold', label: 'Rose Gold' },
      { value: 'platinum', label: 'Platinum' },
    ]);
  }, []);

  // Consulta principal de productos
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getAllProducts(filters),
  });

  // Aplicar filtros en el cliente con useMemo
  const filteredAndSortedProducts = useMemo(() => {
    if (!data?.products) return [];
    
    let result = [...data.products];
    
    // Aplicar filtrado por tipo de joya si hay alguno seleccionado
    if (filters.category && filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Aplicar filtrado por metal si hay alguno seleccionado
    if (filters.metal && filters.metal !== 'all') {
      result = result.filter(product => {
        // Suponiendo que el producto tiene una propiedad specifications que contiene el metal
        const metalSpec = product.specifications?.metal;
        return metalSpec === filters.metal;
      });
    }
    
    // Aplicar ordenamiento por precio
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceA - priceB;
      });
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceB - priceA;
      });
    }
    
    return result;
  }, [data?.products, filters.category, filters.metal, filters.sortBy]);

  // Aplicar filtros (guarda los filtros actuales como activos)
  const applyFilters = () => {
    setActiveFilters({
      category: filters.category,
      metal: filters.metal,
      priceRange: filters.priceRange && filters.priceRange[0] > 0 || filters.priceRange && filters.priceRange[1] < 10000000 
        ? filters.priceRange 
        : undefined,
      tags: filters.tags || [],
      inStock: filters.inStock,
    });
    if (isMobile) {
      setMobileFiltersOpen(false);
    }
  };

  // Resetear filtros
  const clearFilters = () => {
    setFilters({
      category: undefined,
      metal: undefined,
      priceRange: [0, 10000000],
      sortBy: 'newest',
      tags: [],
      inStock: undefined,
      searchQuery: '',
    });
    setActiveFilters({
      category: undefined,
      metal: undefined,
      priceRange: [0, 10000000],
      tags: [],
      inStock: undefined,
    });
  };

  // Quitar un filtro activo
  const removeFilter = (type: string, value?: string) => {
    if (type === 'category') {
      setFilters((prev) => ({ ...prev, category: undefined }));
      setActiveFilters((prev) => ({ ...prev, category: undefined }));
    } else if (type === 'metal') {
      setFilters((prev) => ({ ...prev, metal: undefined }));
      setActiveFilters((prev) => ({ ...prev, metal: undefined }));
    } else if (type === 'priceRange') {
      setFilters((prev) => ({ ...prev, priceRange: [0, 10000000] }));
      setActiveFilters((prev) => ({ ...prev, priceRange: undefined }));
    } else if (type === 'tag' && value) {
      setFilters((prev) => ({
        ...prev,
        tags: prev.tags?.filter((tag) => tag !== value) || [],
      }));
      setActiveFilters((prev) => ({
        ...prev,
        tags: prev.tags.filter((tag) => tag !== value),
      }));
    } else if (type === 'inStock') {
      setFilters((prev) => ({ ...prev, inStock: undefined }));
      setActiveFilters((prev) => ({ ...prev, inStock: undefined }));
    }
  };

  // Alternar la expansión de secciones de filtro
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  // Handle search input
  const [searchInput, setSearchInput] = useState('');
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, searchQuery: searchInput }));
  };

  // Contenido de los filtros (para reutilizar en drawer y sidebar)
  const filtersContent = (
    <Box 
      sx={{ 
        p: { xs: 2.5, md: 3.5 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.3rem',
            color: '#3A463C',
            letterSpacing: '0.02em',
          }}
        >
          Refine Your Selection
        </Typography>
        {isMobile && (
          <IconButton 
            onClick={() => setMobileFiltersOpen(false)}
            sx={{
              color: '#666',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <Close {...iconProps} />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 3.5 }} />

      {/* Búsqueda */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3.5 }}>
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
                <Search {...iconProps} />
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

      {/* Tipo de Joya */}
      <Box sx={{ mb: 3.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={() => toggleSection('category')}
        >
          <Typography 
            variant="subtitle1" 
            fontWeight={500} 
            sx={{ 
              fontFamily: "'Times New Roman', serif",
              fontSize: '1.1rem',
              letterSpacing: '0.01em',
            }}
          >
            Jewelry Type
          </Typography>
          <IconButton 
            size="small"
            sx={{
              color: expandedSections.category ? theme.palette.primary.main : 'inherit',
              transform: expandedSections.category ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, color 0.2s ease',
            }}
          >
            {expandedSections.category ? (
              <Close {...iconProps} />
            ) : (
              <FilterList {...iconProps} />
            )}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.category}>
          <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
            <InputLabel 
              sx={{ 
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.9rem',
              }}
            >
              Select Jewelry Type
            </InputLabel>
            <Select
              value={filters.category || ''}
              label="Select Jewelry Type"
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value || undefined })
              }
              sx={{ 
                borderRadius: 0,
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.9rem',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  }
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 0,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  }
                }
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              {jewelryTypeOptions.map((option) => (
                <MenuItem 
                  key={option.value} 
                  value={option.value}
                  sx={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.9rem',
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Rango de Precio */}
      <Box sx={{ mb: 3.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={() => toggleSection('price')}
        >
          <Typography 
            variant="subtitle1" 
            fontWeight={500} 
            sx={{ 
              fontFamily: "'Times New Roman', serif",
              fontSize: '1.1rem',
              letterSpacing: '0.01em',
            }}
          >
            Price Range
          </Typography>
          <IconButton 
            size="small"
            sx={{
              color: expandedSections.price ? theme.palette.primary.main : 'inherit',
              transform: expandedSections.price ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, color 0.2s ease',
            }}
          >
            {expandedSections.price ? <Close {...iconProps} /> : <FilterList {...iconProps} />}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.price}>
          <Box sx={{ px: 1, mt: 2, mb: 1 }}>
            <Slider
              value={filters.priceRange}
              onChange={(_, newValue) =>
                setFilters({ ...filters, priceRange: newValue as [number, number] })
              }
              valueLabelDisplay="auto"
              min={0}
              max={10000000}
              step={100000}
              valueLabelFormat={(value) => `$${(value / 1000000).toFixed(1)}M`}
              sx={{
                color: theme.palette.primary.main,
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 14,
                  height: 14,
                  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
                  },
                  '&.Mui-active': {
                    boxShadow: `0px 0px 0px 12px ${alpha(theme.palette.primary.main, 0.16)}`,
                    transform: 'scale(1.2)',
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                },
                '& .MuiSlider-valueLabel': {
                  background: theme.palette.primary.main,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.7rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 1,
                }
              }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Min"
                  value={filters.priceRange?.[0] || 0}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: [Number(e.target.value), filters.priceRange?.[1] || 10000000],
                    })
                  }
                  fullWidth
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 4 }}>$</span>,
                    endAdornment: <span style={{ marginLeft: 4 }}>USD</span>,
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 0,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        }
                      },
                    },
                    '& .MuiInputLabel-root': { 
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                    },
                    '& .MuiInputBase-input': { 
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Max"
                  value={filters.priceRange?.[1] || 10000000}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value)],
                    })
                  }
                  fullWidth
                  InputProps={{
                    startAdornment: <span style={{ marginRight: 4 }}>$</span>,
                    endAdornment: <span style={{ marginLeft: 4 }}>USD</span>,
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 0,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        }
                      },
                    },
                    '& .MuiInputLabel-root': { 
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                    },
                    '& .MuiInputBase-input': { 
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 1 }}>
              <Typography variant="caption" sx={{ fontFamily: "'Lato', sans-serif", color: 'text.secondary' }}>
                ${ (filters.priceRange[0] / 1000000).toFixed(1) }M
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: "'Lato', sans-serif", color: 'text.secondary' }}>
                ${ (filters.priceRange[1] / 1000000).toFixed(1) }M
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Metal Type */}
      <Box sx={{ mb: 3.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={() => toggleSection('metal')}
        >
          <Typography 
            variant="subtitle1" 
            fontWeight={500} 
            sx={{ 
              fontFamily: "'Times New Roman', serif",
              fontSize: '1.1rem',
              letterSpacing: '0.01em',
            }}
          >
            Metal Type
          </Typography>
          <IconButton 
            size="small"
            sx={{
              color: expandedSections.metal ? theme.palette.primary.main : 'inherit',
              transform: expandedSections.metal ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, color 0.2s ease',
            }}
          >
            {expandedSections.metal ? <Close {...iconProps} /> : <FilterList {...iconProps} />}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.metal}>
          <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
            <InputLabel 
              sx={{ 
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.9rem',
              }}
            >
              Select Metal
            </InputLabel>
            <Select
              value={filters.metal || ''}
              label="Select Metal"
              onChange={(e) =>
                setFilters({ ...filters, metal: e.target.value || undefined })
              }
              sx={{ 
                borderRadius: 0,
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.9rem',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  }
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 0,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  }
                }
              }}
            >
              <MenuItem value="">All Metals</MenuItem>
              {metalOptions.map((option) => (
                <MenuItem 
                  key={option.value} 
                  value={option.value}
                  sx={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.9rem',
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Collapse>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Collection Tags */}
      <Box sx={{ mb: 3.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            mb: 1.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={() => toggleSection('tags')}
        >
          <Typography 
            variant="subtitle1" 
            fontWeight={500} 
            sx={{ 
              fontFamily: "'Times New Roman', serif",
              fontSize: '1.1rem',
              letterSpacing: '0.01em',
            }}
          >
            Collection
          </Typography>
          <IconButton 
            size="small"
            sx={{
              color: expandedSections.tags ? theme.palette.primary.main : 'inherit',
              transform: expandedSections.tags ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease, color 0.2s ease',
            }}
          >
            {expandedSections.tags ? <Close {...iconProps} /> : <FilterList {...iconProps} />}
          </IconButton>
        </Box>
        <Collapse in={expandedSections.tags}>
          <FormGroup sx={{ mt: 1.5 }}>
            {[
              { id: 'bestseller', name: 'Bestseller' },
              { id: 'new-arrival', name: 'New Arrival' },
              { id: 'limited-edition', name: 'Limited Edition' },
              { id: 'custom', name: 'Customizable' },
            ].map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.tags?.includes(option.id) || false}
                    onChange={(e) => {
                      const newTags = e.target.checked
                        ? [...(filters.tags || []), option.id]
                        : (filters.tags || []).filter((tag) => tag !== option.id);
                      setFilters({ ...filters, tags: newTags });
                    }}
                    sx={{
                      color: alpha(theme.palette.primary.main, 0.6),
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: '0.9rem', 
                      fontFamily: "'Lato', sans-serif",
                      color: '#555',
                    }}
                  >
                    {option.name}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </Collapse>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Stock Status */}
      <Box sx={{ mb: 3.5 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!filters.inStock}
              onChange={(e) =>
                setFilters({ ...filters, inStock: e.target.checked })
              }
              sx={{
                color: alpha(theme.palette.primary.main, 0.6),
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
              }}
            />
          }
          label={
            <Typography 
              sx={{ 
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.9rem',
                color: '#555',
              }}
            >
              In Stock Only
            </Typography>
          }
        />
      </Box>

      <Box sx={{ mt: 'auto', pt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={applyFilters}
          sx={{
            borderRadius: 0,
            textTransform: 'none',
            py: 1.5,
            backgroundColor: theme.palette.primary.main,
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            boxShadow: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: '0 4px 12px rgba(11, 93, 76, 0.2)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={clearFilters}
          sx={{
            borderRadius: 0,
            textTransform: 'none',
            py: 1.5,
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 4, md: 8 } }}>
        {/* Header Section */}
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontWeight: 700,
                color: 'text.primary',
                textAlign: 'center',
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              Luxury Emerald Collection
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                color: 'text.secondary',
                fontFamily: "'Lato', sans-serif",
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                letterSpacing: '0.01em',
              }}
            >
              Discover our curated collection of exceptional emeralds and fine jewelry pieces
            </Typography>
          </motion.div>
        </Box>

        {/* Active Filters */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            mb: 3,
            alignItems: 'center'
          }}
        >
          {Object.entries(activeFilters).some(([key, value]) => 
            value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
          ) && (
            <Button
              onClick={clearFilters}
              variant="text"
              color="primary"
              startIcon={<Close />}
              sx={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                mr: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                }
              }}
            >
              Clear All Filters
            </Button>
          )}
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
          {/* ... similar Chip components for other active filters ... */}
        </Box>

        <Grid container spacing={4}>
          {/* Filters Panel */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: theme.shape.borderRadius,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                bgcolor: 'background.paper',
                position: 'sticky',
                top: 100,
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.primary',
                  letterSpacing: '0.02em',
                }}
              >
                Refine Your Selection
              </Typography>

              {/* Search Field */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Search emerald jewelry..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  InputProps={{
                    startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
                    sx: {
                      fontFamily: "'Lato', sans-serif",
                      '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: alpha(theme.palette.background.default, 0.6),
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.background.default, 0.8),
                        },
                        '&.Mui-focused': {
                          backgroundColor: alpha(theme.palette.background.default, 1),
                        }
                      }
                    }
                  }}
                  sx={{ mb: 2 }}
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
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
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
                    onChange={(_, newValue) => setFilters(prev => ({ ...prev, priceRange: newValue as [number, number] }))}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000000}
                    step={100000}
                    valueLabelFormat={(value) => `$${(value / 1000000).toFixed(1)}M`}
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
                      ${(filters.priceRange[0] / 1000000).toFixed(1)}M
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        color: 'text.secondary',
                      }}
                    >
                      ${(filters.priceRange[1] / 1000000).toFixed(1)}M
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

          {/* Products Grid */}
          <Grid item xs={12} md={9}>
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 400,
                }}
              >
                <CircularProgress size={40} thickness={4} />
              </Box>
            ) : error ? (
              <Alert 
                severity="error"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                Error loading products. Please try again later.
              </Alert>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      color: 'text.secondary',
                    }}
                  >
                    Showing {filteredAndSortedProducts.length} products
                  </Typography>
                  <FormControl
                    size="small"
                    sx={{
                      minWidth: 200,
                    }}
                  >
                    <Select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      displayEmpty
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '0.875rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.divider, 0.2),
                        },
                      }}
                    >
                      <MenuItem value="newest" sx={{ fontFamily: "'Lato', sans-serif" }}>Newest First</MenuItem>
                      <MenuItem value="price-asc" sx={{ fontFamily: "'Lato', sans-serif" }}>Price: Low to High</MenuItem>
                      <MenuItem value="price-desc" sx={{ fontFamily: "'Lato', sans-serif" }}>Price: High to Low</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <ProductGrid products={filteredAndSortedProducts} />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductsPage;