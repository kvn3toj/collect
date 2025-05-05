import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Diamond, Heart, Star } from 'lucide-react';

interface JewelryType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const jewelryTypes: JewelryType[] = [
  {
    id: 'ring',
    name: 'Anillo',
    description: 'Anillos de compromiso y de diseño con esmeraldas colombianas',
    icon: <Diamond size={24} />,
    image: '/images/jewelry-types/ring.jpg'
  },
  {
    id: 'pendant',
    name: 'Colgante',
    description: 'Colgantes y dijes con esmeraldas de alta calidad',
    icon: <Heart size={24} />,
    image: '/images/jewelry-types/pendant.jpg'
  },
  {
    id: 'earrings',
    name: 'Aretes',
    description: 'Aretes y pendientes con esmeraldas certificadas',
    icon: <Star size={24} />,
    image: '/images/jewelry-types/earrings.jpg'
  }
];

interface JewelryTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

const JewelryTypeSelector: React.FC<JewelryTypeSelectorProps> = ({
  selectedType,
  onTypeSelect
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Selecciona el Tipo de Joya
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Elige el tipo de joya que deseas personalizar con nuestras esmeraldas colombianas
      </Typography>

      <Grid container spacing={2}>
        {jewelryTypes.map((type) => (
          <Grid item xs={12} sm={6} md={4} key={type.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4]
                },
                border: selectedType === type.id ? `2px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              <CardActionArea onClick={() => onTypeSelect(type.id)}>
                <CardMedia
                  component="img"
                  height={isMobile ? 140 : 200}
                  image={type.image}
                  alt={type.name}
                  sx={{
                    objectFit: 'cover',
                    filter: selectedType === type.id ? 'none' : 'grayscale(50%)',
                    transition: 'filter 0.2s'
                  }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {type.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {type.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {type.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JewelryTypeSelector; 