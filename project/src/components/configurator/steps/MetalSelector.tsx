import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../../stores/configuratorStore';

interface Metal {
  id: string;
  name: string;
  colors: string[];
  minWeight: number;
  maxWeight: number;
}

interface MetalSelectorProps {
  options: Metal[];
  selected: {
    type: string | null;
    color: string | null;
    weight: number | null;
  };
  onSelect: (metal: { type: string; color: string; weight: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MetalSelector = ({
  options,
  selected,
  onSelect,
  onNext,
  onBack,
}: MetalSelectorProps) => {
  const theme = useTheme();
  const { setLoading } = useConfiguratorStore();

  const selectedMetal = options?.find((metal) => metal.id === selected.type);

  const handleMetalChange = (type: string) => {
    const metal = options?.find((m) => m.id === type);
    if (metal) {
      setLoading(true);
      onSelect({
        type,
        color: metal.colors[0],
        weight: metal.minWeight,
      });
      // Simulate loading state for 3D model update
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleColorChange = (color: string) => {
    if (selected.type) {
      setLoading(true);
      onSelect({
        ...selected,
        color,
      } as { type: string; color: string; weight: number });
      // Simulate loading state for 3D model update
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleWeightChange = (_: Event, value: number | number[]) => {
    if (selected.type && selected.color) {
      setLoading(true);
      onSelect({
        ...selected,
        weight: value as number,
      } as { type: string; color: string; weight: number });
      // Simulate loading state for 3D model update
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Metal Type Selection */}
      <FormControl fullWidth>
        <InputLabel>Tipo de Metal</InputLabel>
        <Select
          value={selected.type || ''}
          label="Tipo de Metal"
          onChange={(e) => handleMetalChange(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              fontFamily: 'Lato',
            },
          }}
        >
          {options?.map((metal) => (
            <MenuItem key={metal.id} value={metal.id}>
              {metal.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Metal Color Selection */}
      {selectedMetal && (
        <FormControl fullWidth>
          <InputLabel>Color del Metal</InputLabel>
          <Select
            value={selected.color || ''}
            label="Color del Metal"
            onChange={(e) => handleColorChange(e.target.value)}
            sx={{
              '& .MuiSelect-select': {
                fontFamily: 'Lato',
              },
            }}
          >
            {selectedMetal.colors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Metal Weight Selection */}
      {selectedMetal && (
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 1,
            }}
          >
            Peso del Metal (gramos)
          </Typography>
          <Slider
            value={selected.weight || selectedMetal.minWeight}
            min={selectedMetal.minWeight}
            max={selectedMetal.maxWeight}
            step={0.1}
            onChange={handleWeightChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}g`}
            sx={{
              color: theme.palette.primary.main,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {selectedMetal.minWeight}g
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {selectedMetal.maxWeight}g
            </Typography>
          </Box>
        </Box>
      )}

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 'auto',
        }}
      >
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            flex: 1,
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              bgcolor: 'rgba(212, 175, 55, 0.04)',
            },
            height: 48,
            borderRadius: 1,
            textTransform: 'none',
            fontFamily: 'Lato',
            fontWeight: 500,
          }}
        >
          Atrás
        </Button>
        <Button
          variant="contained"
          disabled={!selected.type || !selected.color || !selected.weight}
          onClick={onNext}
          sx={{
            flex: 1,
            bgcolor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            height: 48,
            borderRadius: 1,
            textTransform: 'none',
            fontFamily: 'Lato',
            fontWeight: 500,
          }}
        >
          Continuar
        </Button>
      </Box>
    </Box>
  );
}; 