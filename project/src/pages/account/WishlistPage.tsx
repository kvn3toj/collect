import React from 'react';
import { Typography, Box, Paper, Grid, Button, Card, CardContent, CardMedia, IconButton, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

// Mock wishlist data - in a real app, this would come from an API
const mockWishlistItems = [
  {
    id: 'prod001',
    name: 'Diamond Pendant Necklace',
    price: 450.00,
    rating: 4.8,
    reviewCount: 24,
    image: 'https://via.placeholder.com/300x300',
    addedOn: '2023-08-01T10:00:00Z'
  },
  {
    id: 'prod002',
    name: 'Pearl Stud Earrings',
    price: 175.00,
    rating: 4.5,
    reviewCount: 18,
    image: 'https://via.placeholder.com/300x300',
    addedOn: '2023-08-05T12:30:00Z'
  },
  {
    id: 'prod003',
    name: 'Gold Chain Bracelet',
    price: 320.00,
    rating: 4.7,
    reviewCount: 15,
    image: 'https://via.placeholder.com/300x300',
    addedOn: '2023-07-28T15:45:00Z'
  }
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = React.useState(mockWishlistItems);
  
  const handleRemoveFromWishlist = (itemId: string) => {
    // In a real app, this would call an API to remove the item from the wishlist
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };
  
  const handleAddToCart = (itemId: string) => {
    // In a real app, this would call an API to add the item to the cart
    console.log(`Added item ${itemId} to cart`);
  };
  
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        My Wishlist
      </Typography>
      
      <Grid container spacing={4}>
        {/* Sidebar with account navigation */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="outlined" 
                sx={{ justifyContent: 'flex-start' }}
                href="/account"
              >
                Profile
              </Button>
              <Button 
                variant="outlined" 
                sx={{ justifyContent: 'flex-start' }}
                href="/account/orders"
              >
                Orders
              </Button>
              <Button 
                variant="outlined" 
                sx={{ justifyContent: 'flex-start' }}
                href="/account/addresses"
              >
                Addresses
              </Button>
              <Button 
                variant="contained" 
                sx={{ justifyContent: 'flex-start' }}
              >
                Wishlist
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Main content area */}
        <Grid item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Saved Items
            </Typography>
            
            {wishlistItems.length > 0 ? (
              <Grid container spacing={3}>
                {wishlistItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={item.image}
                          alt={item.name}
                        />
                      </Link>
                      
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Link to={`/products/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <Typography variant="h6" gutterBottom>
                            {item.name}
                          </Typography>
                        </Link>
                        
                        <Typography variant="h6" color="primary" gutterBottom>
                          ${item.price.toFixed(2)}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Rating value={item.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            ({item.reviewCount})
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Added on {new Date(item.addedOn).toLocaleDateString()}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Button 
                            variant="contained" 
                            fullWidth
                            onClick={() => handleAddToCart(item.id)}
                          >
                            Add to Cart
                          </Button>
                          
                          <Button 
                            variant="outlined" 
                            color="error"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" gutterBottom>
                  Your wishlist is empty.
                </Typography>
                <Button 
                  component={Link} 
                  to="/products" 
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Explore Products
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WishlistPage; 