import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Slider,
  TextField,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Scale } from 'lucide-react';

interface Metal {
  id: string;
  name: string;
  description: string;
  color: string;
  minWeight: number;
  maxWeight: number;
  defaultWeight: number;
}

const metals: Metal[] = [
  {
    id: 'gold-18k',
    name: 'Oro 18K',
    description: 'Oro amarillo de 18 quilates, perfecto para piezas clásicas',
    color: '#FFD700',
    minWeight: 2,
    maxWeight: 10,
    defaultWeight: 4
  },
  {
    id: 'gold-18k-white',
    name: 'Oro Blanco 18K',
    description: 'Oro blanco de 18 quilates, ideal para diseños modernos',
    color: '#F5F5F5',
    minWeight: 2,
    maxWeight: 10,
    defaultWeight: 4
  },
  {
    id: 'gold-18k-rose',
    name: 'Oro Rosa 18K',
    description: 'Oro rosa de 18 quilates, para piezas románticas y contemporáneas',
    color: '#B76E79',
    minWeight: 2,
    maxWeight: 10,
    defaultWeight: 4
  },
  {
    id: 'platinum',
    name: 'Platino',
    description: 'Platino 950, el metal más noble y duradero',
    color: '#E5E4E2',
    minWeight: 3,
    maxWeight: 15,
    defaultWeight: 6
  }
];

interface MetalSelectorProps {
  selectedMetal: {
    type: string;
    color: string;
    weight: number;
  };
  onMetalSelect: (metal: { type: string; color: string; weight: number }) => void;
}

const MetalSelector: React.FC<MetalSelectorProps> = ({
  selectedMetal,
  onMetalSelect
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMetalSelect = (metal: Metal) => {
    onMetalSelect({
      type: metal.id,
      color: metal.color,
      weight: metal.defaultWeight
    });
  };

  const handleWeightChange = (event: Event, newValue: number | number[]) => {
    onMetalSelect({
      ...selectedMetal,
      weight: newValue as number
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Selecciona el Metal
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Elige el metal y ajusta el peso según tus preferencias
      </Typography>

      <Grid container spacing={3}>
        {/* Selector de Metal */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {metals.map((metal) => (
              <Grid item xs={12} sm={6} md={3} key={metal.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4]
                    },
                    border: selectedMetal.type === metal.id ? `2px solid ${theme.palette.primary.main}` : 'none'
                  }}
                >
                  <CardActionArea onClick={() => handleMetalSelect(metal)}>
                    <CardContent>
                      <Box 
                        sx={{ 
                          width: '100%', 
                          height: 60, 
                          bgcolor: metal.color,
                          mb: 2,
                          borderRadius: 1,
                          border: '1px solid rgba(0,0,0,0.1)'
                        }} 
                      />
                      <Typography variant="h6" gutterBottom>
                        {metal.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {metal.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Control de Peso */}
        {selectedMetal.type && (
          <Grid item xs={12}>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Scale size={20} style={{ marginRight: 8 }} />
                <Typography variant="subtitle1">
                  Peso del Metal
                </Typography>
              </Box>
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Slider
                    value={selectedMetal.weight}
                    onChange={handleWeightChange}
                    min={metals.find(m => m.id === selectedMetal.type)?.minWeight || 2}
                    max={metals.find(m => m.id === selectedMetal.type)?.maxWeight || 10}
                    step={0.1}
                    marks
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}g`}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Peso (gramos)"
                    value={selectedMetal.weight}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        handleWeightChange({} as Event, value);
                      }
                    }}
                    InputProps={{
                      inputProps: {
                        min: metals.find(m => m.id === selectedMetal.type)?.minWeight || 2,
                        max: metals.find(m => m.id === selectedMetal.type)?.maxWeight || 10,
                        step: 0.1
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MetalSelector; 