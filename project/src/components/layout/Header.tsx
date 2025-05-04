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
  alpha
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ShoppingBag, User, Menu as MenuIcon, Heart, Search, X } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import useCartStore from '../../stores/cartStore';
import SearchBar from '../ui/SearchBar';
import { motion } from 'framer-motion';
import logoLight from '/images/LOGO/logo-aretrust-light.png';
import logoDark from '/images/LOGO/logo-aretrust-dark.png';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items, openCart, getTotalItems } = useCartStore();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const cartItemCount = getTotalItems();
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
      setIsScrolled(window.scrollY > 50);
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
    navigate('/');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  // Colors with WCAG AA compliance
  const textColor = isScrolled ? '#212121' : '#FFFFFF';
  const hoverColor = isScrolled ? theme.palette.warning.main : '#E1C16E';
  const iconBgHover = isScrolled ? alpha(theme.palette.primary.main, 0.08) : 'rgba(255,255,255,0.12)';

  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      sx={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
        boxShadow: isScrolled ? '0px 2px 10px rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isScrolled ? 'none' : 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          opacity: isScrolled ? 0 : 1,
        }
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          sx={{ 
            py: { xs: 1, md: 1.5 },
            px: { xs: 1, md: 2 },
            minHeight: { xs: 64, md: 72 },
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMobileMenuToggle}
              sx={{ 
                mr: 1, 
                color: textColor,
                transition: 'color 0.3s ease',
                '&:hover': {
                  backgroundColor: iconBgHover,
                  color: hoverColor,
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: isMobile ? 1 : 0,
              textAlign: isMobile ? 'center' : 'left',
              mr: 2,
              minHeight: 40,
            }}
          >
            <Box
              component="img"
              src={isScrolled ? logoDark : logoLight}
              alt="ARETrust logo"
              sx={{
                height: { xs: 32, md: 40 },
                width: 'auto',
                transition: 'filter 0.3s',
                filter: isScrolled ? 'none' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))',
                display: 'block',
                mx: isMobile ? 'auto' : 0,
              }}
            />
          </Box>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
              <Button
                id="home-nav"
                component={RouterLink}
                to="/"
                sx={{
                  color: textColor,
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: isScrolled ? 500 : 600,
                  mx: 1,
                  fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                  position: 'relative',
                  py: 1.5,
                  textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: hoverColor,
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: isPathActive('/') ? '100%' : '0%',
                    height: 2,
                    bgcolor: isPathActive('/') ? hoverColor : 'transparent',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover:after': {
                    width: '70%',
                    bgcolor: hoverColor,
                  },
                }}
              >
                Inicio
              </Button>
              
              <Button
                id="catalog-nav"
                component={RouterLink}
                to="/products"
                sx={{
                  color: textColor,
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: isScrolled ? 500 : 600,
                  mx: 1,
                  fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                  position: 'relative',
                  py: 1.5,
                  textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: hoverColor,
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: isPathActive('/products') ? '100%' : '0%',
                    height: 2,
                    bgcolor: isPathActive('/products') ? hoverColor : 'transparent',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover:after': {
                    width: '70%',
                    bgcolor: hoverColor,
                  },
                }}
              >
                Colección
              </Button>
              
              {/* Mostrar botón de Configurador solo para administradores */}
              {isAdmin && (
                <Button
                  id="configurator-nav"
                  component={RouterLink}
                  to="/configurator"
                  sx={{
                    color: textColor,
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: isScrolled ? 500 : 600,
                    mx: 1,
                    fontSize: '0.9rem',
                    letterSpacing: '0.02em',
                    position: 'relative',
                    py: 1.5,
                    textShadow: isScrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: hoverColor,
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: isPathActive('/configurator') ? '100%' : '0%',
                      height: 2,
                      bgcolor: isPathActive('/configurator') ? hoverColor : 'transparent',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover:after': {
                      width: '70%',
                      bgcolor: hoverColor,
                    },
                  }}
                >
                  Configurador
                </Button>
              )}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Search, Cart, and User Icons */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: { xs: 1, md: 2 }
            }}
          >
            <IconButton
              onClick={handleSearchToggle}
              sx={{
                color: textColor,
                transition: 'color 0.3s ease',
                textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.15)',
                '&:hover': {
                  color: hoverColor,
                  backgroundColor: iconBgHover,
                }
              }}
            >
              <Search size={20} />
            </IconButton>

            <Box sx={{ ml: 1 }}>
              <IconButton
                id="cart-nav"
                aria-label="shopping cart"
                onClick={openCart}
                sx={{
                  color: textColor,
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.15)',
                  '&:hover': {
                    backgroundColor: iconBgHover,
                    color: hoverColor,
                  },
                }}
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {cartItemCount}
                  </Box>
                )}
              </IconButton>
            </Box>

            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    color: textColor,
                    transition: 'color 0.3s ease',
                    textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.15)',
                    '&:hover': {
                      backgroundColor: iconBgHover,
                      color: hoverColor,
                    }
                  }}
                >
                  <Avatar 
                    src={user?.avatar}
                    alt={user?.firstName}
                    sx={{ 
                      width: 28, 
                      height: 28,
                      border: `2px solid ${isScrolled ? theme.palette.primary.main : '#FFFFFF'}`,
                      transition: 'border-color 0.3s ease',
                      boxShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={userMenuOpen}
                  onClose={handleUserMenuClose}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      borderRadius: 0,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                      minWidth: 200,
                    }
                  }}
                >
                  <MenuItem 
                    component={RouterLink} 
                    to="/account"
                    onClick={handleUserMenuClose}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                      py: 1.5,
                      color: '#212121',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    My Account
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/account/orders"
                    onClick={handleUserMenuClose}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                      py: 1.5,
                      color: '#212121',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    Orders
                  </MenuItem>
                  <MenuItem 
                    component={RouterLink} 
                    to="/account/wishlist"
                    onClick={handleUserMenuClose}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                      py: 1.5,
                      color: '#212121',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    Wishlist
                  </MenuItem>
                  <Divider />
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '0.9rem',
                      py: 1.5,
                      color: theme.palette.error.main,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.08),
                      }
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                variant={isScrolled ? "outlined" : "contained"}
                color={isScrolled ? "primary" : "secondary"}
                sx={{
                  ml: { xs: 0, md: 1 },
                  px: { xs: 2, md: 3 },
                  py: { xs: 0.75, md: 1 },
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Search Bar */}
      <Fade in={searchOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            zIndex: 1,
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ py: 2 }}>
              <SearchBar onClose={() => setSearchOpen(false)} />
            </Box>
          </Container>
        </Box>
      </Fade>

      {/* Mobile Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: 300,
            backgroundColor: 'white',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: theme.palette.primary.main,
            }}
          >
            ARETrust
          </Typography>
          <IconButton 
            onClick={handleMobileMenuToggle}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <X size={24} />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem 
            button 
            component={RouterLink} 
            to="/"
            onClick={handleMobileMenuToggle}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <ListItemText 
              primary="Inicio" 
              primaryTypographyProps={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#212121',
              }}
            />
          </ListItem>
          
          <ListItem 
            button 
            component={RouterLink} 
            to="/products"
            onClick={handleMobileMenuToggle}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <ListItemText 
              primary="Colección" 
              primaryTypographyProps={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
                color: '#212121',
              }}
            />
          </ListItem>
          
          {/* Mostrar enlace de Configurador en móvil solo para administradores */}
          {isAdmin && (
            <ListItem 
              button 
              component={RouterLink} 
              to="/configurator"
              onClick={handleMobileMenuToggle}
              sx={{
                py: 1.5,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                }
              }}
            >
              <ListItemText 
                primary="Configurador" 
                primaryTypographyProps={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#212121',
                }}
              />
            </ListItem>
          )}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          {!isAuthenticated && (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                }
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;