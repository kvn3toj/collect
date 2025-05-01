import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items, openCart, getTotalItems } = useCartStore();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const cartItemCount = getTotalItems();
  const userMenuOpen = Boolean(userMenuAnchor);

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
                color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                transition: 'color 0.3s ease',
                '&:hover': {
                  backgroundColor: alpha(isScrolled ? theme.palette.primary.main : theme.palette.common.white, 0.1),
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
            <Box 
              sx={{ 
                display: 'flex', 
                gap: { md: 3, lg: 4 },
                ml: 4,
                alignItems: 'center'
              }}
            >
              <Button
                component={RouterLink}
                to="/products"
                sx={{
                  color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: isScrolled ? theme.palette.primary.main : alpha(theme.palette.common.white, 0.9),
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Collections
              </Button>
              <Button
                component={RouterLink}
                to="/products?category=emeralds"
                sx={{
                  color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: isScrolled ? theme.palette.primary.main : alpha(theme.palette.common.white, 0.9),
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Emeralds
              </Button>
              <Button
                component={RouterLink}
                to="/products?category=jewelry"
                sx={{
                  color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: isScrolled ? theme.palette.primary.main : alpha(theme.palette.common.white, 0.9),
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Jewelry
              </Button>
              <Button
                component={RouterLink}
                to="/customize"
                sx={{
                  color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: isScrolled ? theme.palette.primary.main : alpha(theme.palette.common.white, 0.9),
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Custom Design
              </Button>
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
                color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                transition: 'color 0.3s ease',
                '&:hover': {
                  backgroundColor: alpha(isScrolled ? theme.palette.primary.main : theme.palette.common.white, 0.1),
                }
              }}
            >
              <Search size={20} />
            </IconButton>

            <IconButton
              onClick={openCart}
              sx={{
                color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                transition: 'color 0.3s ease',
                '&:hover': {
                  backgroundColor: alpha(isScrolled ? theme.palette.primary.main : theme.palette.common.white, 0.1),
                }
              }}
            >
              <Badge 
                badgeContent={cartItemCount} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                  }
                }}
              >
                <ShoppingBag size={20} />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    color: isScrolled ? theme.palette.text.primary : theme.palette.common.white,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(isScrolled ? theme.palette.primary.main : theme.palette.common.white, 0.1),
                    }
                  }}
                >
                  <Avatar 
                    src={user?.avatar}
                    alt={user?.firstName}
                    sx={{ 
                      width: 28, 
                      height: 28,
                      border: `2px solid ${isScrolled ? theme.palette.primary.main : theme.palette.common.white}`,
                      transition: 'border-color 0.3s ease',
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
              primary="Collections" 
              primaryTypographyProps={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            />
          </ListItem>
          <ListItem 
            button 
            component={RouterLink} 
            to="/products?category=emeralds"
            onClick={handleMobileMenuToggle}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <ListItemText 
              primary="Emeralds" 
              primaryTypographyProps={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            />
          </ListItem>
          <ListItem 
            button 
            component={RouterLink} 
            to="/products?category=jewelry"
            onClick={handleMobileMenuToggle}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <ListItemText 
              primary="Jewelry" 
              primaryTypographyProps={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            />
          </ListItem>
          <ListItem 
            button 
            component={RouterLink} 
            to="/customize"
            onClick={handleMobileMenuToggle}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <ListItemText 
              primary="Custom Design" 
              primaryTypographyProps={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            />
          </ListItem>
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