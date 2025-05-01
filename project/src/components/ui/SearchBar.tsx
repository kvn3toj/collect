import React, { useState } from 'react';
import { TextField, InputAdornment, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Paper } from '@mui/material';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

interface SearchBarProps {
  onClose?: () => void;
}

// In a real application, this would be fetched from the API
const MOCK_SEARCH_RESULTS = [
  {
    id: '1',
    name: 'Colombian Emerald Ring',
    image: 'https://images.pexels.com/photos/10961577/pexels-photo-10961577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 2499,
    category: 'rings'
  },
  {
    id: '2',
    name: 'Emerald Teardrop Necklace',
    image: 'https://images.pexels.com/photos/12351222/pexels-photo-12351222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 3299,
    category: 'necklaces'
  },
  {
    id: '3',
    name: 'Raw Emerald Bracelet',
    image: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1899,
    category: 'bracelets'
  }
];

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof MOCK_SEARCH_RESULTS>([]);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Mock search functionality
    if (value.trim().length > 2) {
      // Filter mock results based on query
      const filtered = MOCK_SEARCH_RESULTS.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) || 
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (id: string) => {
    navigate(`/products/${id}`);
    setQuery('');
    setResults([]);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      onClose?.();
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Search for emeralds, jewelry, and more..."
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
            },
          }}
        />
      </form>

      {focused && results.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            width: '100%',
            zIndex: 1000,
            mt: 0.5,
            maxHeight: 400,
            overflow: 'auto',
            borderRadius: 0,
          }}
        >
          <List disablePadding>
            {results.map((result) => (
              <ListItem
                key={result.id}
                button
                onClick={() => handleResultClick(result.id)}
                divider
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    alt={result.name} 
                    src={result.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60, borderRadius: 0 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={result.name}
                  secondary={
                    <Typography 
                      component="span" 
                      variant="body2" 
                      color="text.primary"
                    >
                      ${result.price.toLocaleString()}
                    </Typography>
                  }
                  sx={{ ml: 1 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;