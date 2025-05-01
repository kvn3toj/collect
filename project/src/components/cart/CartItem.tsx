import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, IconButton, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { X } from 'lucide-react';
import useCartStore from '../../stores/cartStore';
import { CartItem as CartItemType } from '../../types/product.types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCartStore();

  // Extract values with fallbacks for safety
  const productId = item?.productId || '';
  const quantity = item?.quantity || 1;
  const productName = item?.product?.name || 'Product Unavailable';
  const productImages = item?.product?.images || [];
  const imageUrl = productImages.length > 0 ? productImages[0] : '/images/placeholder-product.jpg';
  const customizations = item?.customizations || {};
  const hasCustomizations = Object.values(customizations).length > 0;
  const customizationText = hasCustomizations 
    ? Object.values(customizations).join(', ') 
    : 'Standard';
  
  // Calculate total price safely
  const totalPrice = item?.totalPrice ?? (item?.product?.price || 0) * quantity;

  const handleQuantityChange = (event: SelectChangeEvent<number>) => {
    if (productId) {
      updateQuantity(productId, Number(event.target.value));
    }
  };

  const handleRemoveItem = () => {
    if (productId) {
      removeItem(productId);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Box
        component={RouterLink}
        to={productId ? `/products/${productId}` : '#'}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          mr: 2,
          position: 'relative',
          overflow: 'hidden',
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={productName}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            // Prevent infinite loops if the placeholder also fails
            if (e.currentTarget.src !== '/images/placeholder-product.jpg') {
              e.currentTarget.src = '/images/placeholder-product.jpg';
            }
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography
              component={RouterLink}
              to={productId ? `/products/${productId}` : '#'}
              variant="subtitle2"
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {productName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {customizationText}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={handleRemoveItem}
            sx={{ p: 0.5 }}
          >
            <X size={16} />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
          }}
        >
          <Select
            value={quantity}
            onChange={handleQuantityChange}
            size="small"
            sx={{
              minWidth: 60,
              height: 32,
              '& .MuiOutlinedInput-input': {
                py: 0.5,
              },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
              <MenuItem key={qty} value={qty}>
                {qty}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="subtitle2">
            ${typeof totalPrice === 'number' ? totalPrice.toLocaleString() : '0.00'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;