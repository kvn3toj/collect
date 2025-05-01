import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  useTheme,
} from '@mui/material';
import { X, ShoppingBag } from 'lucide-react';
import useCartStore from '../../stores/cartStore';
import CartItem from './CartItem';
import { motion } from 'framer-motion';

const CartDrawer: React.FC = () => {
  const theme = useTheme();
  const { items, isOpen, closeCart, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          p: 0,
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
          }}
        >
          Your Shopping Bag
        </Typography>
        <IconButton onClick={closeCart}>
          <X size={24} />
        </IconButton>
      </Box>

      <Divider />

      {items.length === 0 ? (
        <Box
          sx={{
            py: 8,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '60vh',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingBag
              size={64}
              color={theme.palette.text.disabled}
              opacity={0.7}
            />
          </motion.div>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Your bag is empty
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 260 }}
          >
            Looks like you haven't added any items to your bag yet.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/products"
            onClick={closeCart}
            sx={{ minWidth: 200 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 240px)',
              p: 2,
            }}
          >
            {items.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </Box>

          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">Subtotal</Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                ${totalPrice.toLocaleString()}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Shipping and taxes calculated at checkout
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/checkout"
              onClick={closeCart}
              fullWidth
              sx={{ mb: 2 }}
            >
              Checkout
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component={RouterLink}
              to="/cart"
              onClick={closeCart}
              fullWidth
            >
              View Cart
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;