import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Container, 
  Menu, 
  MenuItem, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  useMediaQuery,
  Avatar,
  Fade,
  alpha,
  Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ShoppingBag, User, Menu as MenuIcon, Heart, Search, X, ShoppingCart } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import useCartStore from '../../stores/cartStore';
import SearchBar from '../ui/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import logoLight from '/images/LOGO/logo-aretrust-light.png';
import logoDark from '/images/LOGO/logo-aretrust-dark.png';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import cartService from '../../services/cartService';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items: localCartItems, getTotalItems, openCart } = useCartStore();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Usar React Query para obtener el carrito actual
  const { data: serverCartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    // No limitamos a autenticados para permitir carrito anónimo
    refetchOnWindowFocus: true,
    // Menor tiempo de invalidación para mantener carrito sincronizado
    staleTime: 30000, // 30 segundos
  });
  
  // Calcular el número de items en el carrito, priorizando el servidor
  const cartItemCount = serverCartItems.length > 0 
    ? serverCartItems.reduce((total, item) => total + item.quantity, 0)
    : getTotalItems();
    
  const userMenuOpen = Boolean(userMenuAnchor);

  // Verificamos si el usuario tiene permisos de administrador
  const isAdmin = user?.role === 'admin' || (user?.email && user.email.endsWith('@aretrust.co'));

  // Función para verificar si una ruta está activa
  const isPathActive = (path: string) => {
    return path === '/' 
      ? location.pathname === path 
      : location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    // Invalidar consulta de carrito al cerrar sesión
    queryClient.invalidateQueries({ queryKey: ['cart'] });
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const navItems = [
    { label: 'Colección', path: '/products' },
    { label: 'Mi Atelier', path: '/atelier', requiresAuth: true },
    { label: 'Sobre Nosotros', path: '/about' }
  ];

  const renderNavItems = () => (
    <>
      {navItems.map((item) => {
        if (item.requiresAuth && !isAuthenticated) return null;
        const isActive = isPathActive(item.path);
        return (
          <Button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              color: isScrolled ? 'text.primary' : 'white',
              mx: 1,
              fontFamily: 'Lato',
              fontWeight: 500,
              position: 'relative',
              '&:hover': {
                bgcolor: 'transparent',
                color: 'gold.main'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                width: '100%',
                height: '2px',
                bgcolor: 'gold.main',
                transition: 'transform 0.3s ease-in-out',
                transformOrigin: 'center'
              },
              '&:hover::after': {
                transform: 'translateX(-50%) scaleX(1)'
              }
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </>
  );

  const drawer = (
    <Box
      sx={{
        width: 280,
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <img
          src={logoDark}
          alt="ARETrust"
          style={{ height: 32 }}
        />
        <IconButton onClick={handleDrawerToggle}>
          <X size={20} />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          if (item.requiresAuth && !isAuthenticated) return null;
          const isActive = isPathActive(item.path);
          return (
            <ListItem
              button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                py: 2,
                bgcolor: isActive ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontFamily: 'Lato',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'gold.main' : 'text.primary'
                }}
              />
            </ListItem>
          );
        })}
        <ListItem
          button
          onClick={() => handleNavigation('/cart')}
          sx={{
            py: 2,
            bgcolor: isPathActive('/cart') ? 'action.selected' : 'transparent',
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <ListItemText
            primary="Carrito"
            primaryTypographyProps={{
              fontFamily: 'Lato',
              fontWeight: isPathActive('/cart') ? 600 : 500,
              color: isPathActive('/cart') ? 'gold.main' : 'text.primary'
            }}
          />
          {cartItemCount > 0 && (
            <Badge 
              badgeContent={cartItemCount} 
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => handleNavigation(isAuthenticated ? '/account' : '/login')}
          sx={{
            py: 2,
            '&:hover': {
              bgcolor: 'action.hover'
            }
          }}
        >
          <ListItemText
            primary={isAuthenticated ? 'Mi Cuenta' : 'Iniciar Sesión'}
            primaryTypographyProps={{
              fontFamily: 'Lato',
              fontWeight: 500
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: isScrolled ? 'background.paper' : 'transparent',
          transition: 'all 0.3s ease-in-out',
          borderBottom: isScrolled ? '1px solid' : 'none',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, sm: 80 },
              justifyContent: 'space-between'
            }}
          >
            {/* Logo */}
            <Box
              onClick={() => handleNavigation('/')}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img
                src={isScrolled ? logoDark : logoLight}
                alt="ARETrust"
                style={{ height: isMobile ? 28 : 40 }}
              />
            </Box>

            {/* Navigation for desktop */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexGrow: 1
                }}
              >
                {renderNavItems()}
              </Box>
            )}

            {/* Right menu icons */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Tooltip title="Buscar">
                <IconButton
                  onClick={handleSearchToggle}
                  sx={{
                    color: isScrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      color: 'gold.main'
                    }
                  }}
                >
                  <Search size={20} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Carrito">
                <IconButton
                  onClick={handleCartClick}
                  sx={{
                    color: isScrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      color: 'gold.main'
                    },
                    mx: 1
                  }}
                >
                  <Badge 
                    badgeContent={cartItemCount} 
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <ShoppingCart size={20} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {isAuthenticated ? (
                <>
                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{
                      color: isScrolled ? 'text.primary' : 'white',
                      '&:hover': {
                        color: 'gold.main'
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: 'gold.main',
                        color: 'common.black',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      {user?.firstName ? user.firstName.charAt(0) : user?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={userMenuAnchor}
                    open={userMenuOpen}
                    onClose={handleUserMenuClose}
                    TransitionComponent={Fade}
                    sx={{
                      mt: 1.5,
                      '& .MuiPaper-root': {
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        navigate('/account');
                      }}
                    >
                      Mi cuenta
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem
                        onClick={() => {
                          handleUserMenuClose();
                          navigate('/admin');
                        }}
                      >
                        Administración
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        navigate('/account/orders');
                      }}
                    >
                      Mis pedidos
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => navigate('/login')}
                  startIcon={<User size={18} />}
                  variant="outlined"
                  sx={{
                    ml: 1,
                    color: isScrolled ? 'text.primary' : 'white',
                    borderColor: isScrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      borderColor: 'gold.main',
                      color: 'gold.main',
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  Acceder
                </Button>
              )}

              {isMobile && (
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    ml: 1,
                    color: isScrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      color: 'gold.main'
                    }
                  }}
                >
                  <MenuIcon size={24} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Search bar overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              padding: '20px',
              zIndex: 1300,
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <SearchBar fullWidth />
                <IconButton onClick={handleSearchToggle}>
                  <X size={20} />
                </IconButton>
              </Box>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar
        sx={{
          minHeight: { xs: 64, sm: 80 }
        }}
      />
    </>
  );
};

export default Header;