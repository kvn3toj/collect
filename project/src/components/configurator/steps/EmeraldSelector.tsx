import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../../stores/configuratorStore';

interface Emerald {
  id: string;
  name: string;
  description: string;
  image: string;
  minCarats: number;
  maxCarats: number;
}

interface EmeraldSelectorProps {
  options: {
    cuts: string[];
    qualities: string[];
    origins: string[];
    emeralds: Emerald[];
  };
  selected: {
    cut: string | null;
    quality: string | null;
    origin: string | null;
    carats: number | null;
  };
  onSelect: (emerald: {
    cut: string;
    quality: string;
    origin: string;
    carats: number;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EmeraldSelector = ({
  options,
  selected,
  onSelect,
  onNext,
  onBack,
}: EmeraldSelectorProps) => {
  const theme = useTheme();
  const { setLoading } = useConfiguratorStore();

  const handleCutChange = (cut: string) => {
    setLoading(true);
    onSelect({
      ...selected,
      cut,
    } as { cut: string; quality: string; origin: string; carats: number });
    // Simulate loading state for 3D model update
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleQualityChange = (quality: string) => {
    setLoading(true);
    onSelect({
      ...selected,
      quality,
    } as { cut: string; quality: string; origin: string; carats: number });
    // Simulate loading state for 3D model update
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOriginChange = (origin: string) => {
    setLoading(true);
    onSelect({
      ...selected,
      origin,
    } as { cut: string; quality: string; origin: string; carats: number });
    // Simulate loading state for 3D model update
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleCaratsChange = (_: Event, value: number | number[]) => {
    setLoading(true);
    onSelect({
      ...selected,
      carats: value as number,
    } as { cut: string; quality: string; origin: string; carats: number });
    // Simulate loading state for 3D model update
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
      {/* Cut Selection */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Corte de la Esmeralda
        </Typography>
        <Grid container spacing={2}>
          {options.cuts.map((cut) => (
            <Grid item xs={6} sm={4} key={cut}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCutChange(cut)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: selected.cut === cut ? 'action.selected' : 'background.paper',
                  border: 1,
                  borderColor: selected.cut === cut ? 'primary.main' : 'divider',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 1,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    '&:last-child': {
                      pb: 2,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: selected.cut === cut ? 'primary.main' : 'text.primary',
                      fontWeight: selected.cut === cut ? 600 : 400,
                    }}
                  >
                    {cut}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quality Selection */}
      <FormControl fullWidth>
        <InputLabel>Calidad</InputLabel>
        <Select
          value={selected.quality || ''}
          label="Calidad"
          onChange={(e) => handleQualityChange(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              fontFamily: 'Lato',
            },
          }}
        >
          {options.qualities.map((quality) => (
            <MenuItem key={quality} value={quality}>
              {quality}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Origin Selection */}
      <FormControl fullWidth>
        <InputLabel>Origen</InputLabel>
        <Select
          value={selected.origin || ''}
          label="Origen"
          onChange={(e) => handleOriginChange(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              fontFamily: 'Lato',
            },
          }}
        >
          {options.origins.map((origin) => (
            <MenuItem key={origin} value={origin}>
              {origin}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Carats Selection */}
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 1,
          }}
        >
          Quilates
        </Typography>
        <Slider
          value={selected.carats || 1}
          min={1}
          max={10}
          step={0.1}
          onChange={handleCaratsChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} ct`}
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
            1 ct
          </Typography>
          <Typography variant="caption" color="text.secondary">
            10 ct
          </Typography>
        </Box>
      </Box>

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
          disabled={!selected.cut || !selected.quality || !selected.origin || !selected.carats}
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