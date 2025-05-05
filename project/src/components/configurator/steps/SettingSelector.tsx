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
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../../stores/configuratorStore';

interface Setting {
  id: string;
  name: string;
  description: string;
  image: string;
  allowsAccentStones: boolean;
}

interface AccentStone {
  id: string;
  name: string;
  colors: string[];
}

interface SettingSelectorProps {
  options: {
    settings: Setting[];
    accentStones: AccentStone[];
  };
  selected: {
    type: string | null;
    accentStones: {
      type: string | null;
      color: string | null;
      quantity: number | null;
    } | null;
  };
  onSelect: (setting: {
    type: string;
    accentStones: {
      type: string;
      color: string;
      quantity: number;
    } | null;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SettingSelector = ({
  options,
  selected,
  onSelect,
  onNext,
  onBack,
}: SettingSelectorProps) => {
  const theme = useTheme();
  const { setLoading } = useConfiguratorStore();

  const selectedSetting = options.settings.find((setting) => setting.id === selected.type);
  const selectedAccentStone = options.accentStones.find(
    (stone) => stone.id === selected.accentStones?.type
  );

  const handleSettingChange = (type: string) => {
    const setting = options.settings.find((s) => s.id === type);
    setLoading(true);
    onSelect({
      type,
      accentStones: setting?.allowsAccentStones
        ? {
            type: options.accentStones[0].id,
            color: options.accentStones[0].colors[0],
            quantity: 2,
          }
        : null,
    });
    // Simulate loading state for 3D model update
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleAccentStoneTypeChange = (type: string) => {
    const stone = options.accentStones.find((s) => s.id === type);
    if (stone) {
      setLoading(true);
      onSelect({
        ...selected,
        accentStones: {
          type,
          color: stone.colors[0],
          quantity: 2,
        },
      } as { type: string; accentStones: { type: string; color: string; quantity: number } });
      // Simulate loading state for 3D model update
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleAccentStoneColorChange = (color: string) => {
    if (selected.accentStones) {
      setLoading(true);
      onSelect({
        ...selected,
        accentStones: {
          ...selected.accentStones,
          color,
        },
      } as { type: string; accentStones: { type: string; color: string; quantity: number } });
      // Simulate loading state for 3D model update
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleAccentStoneQuantityChange = (quantity: number) => {
    if (selected.accentStones) {
      setLoading(true);
      onSelect({
        ...selected,
        accentStones: {
          ...selected.accentStones,
          quantity,
        },
      } as { type: string; accentStones: { type: string; color: string; quantity: number } });
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
      {/* Setting Type Selection */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Tipo de Engaste
        </Typography>
        <Grid container spacing={2}>
          {options.settings.map((setting) => (
            <Grid item xs={6} sm={4} key={setting.id}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSettingChange(setting.id)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: selected.type === setting.id ? 'action.selected' : 'background.paper',
                  border: 1,
                  borderColor: selected.type === setting.id ? 'primary.main' : 'divider',
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
                    '&:last-child': {
                      pb: 2,
                    },
                  }}
                >
                  {/* Setting Image */}
                  <Box
                    sx={{
                      width: '100%',
                      height: 100,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={setting.image}
                      alt={setting.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>

                  {/* Setting Info */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: selected.type === setting.id ? 'primary.main' : 'text.primary',
                      fontWeight: selected.type === setting.id ? 600 : 400,
                      mb: 1,
                    }}
                  >
                    {setting.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {setting.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Accent Stones Selection */}
      {selectedSetting?.allowsAccentStones && (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'Playfair Display',
              color: 'text.primary',
              mb: 2,
            }}
          >
            Piedras de Acento
          </Typography>

          {/* Accent Stone Type */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Piedra</InputLabel>
            <Select
              value={selected.accentStones?.type || ''}
              label="Tipo de Piedra"
              onChange={(e) => handleAccentStoneTypeChange(e.target.value)}
              sx={{
                '& .MuiSelect-select': {
                  fontFamily: 'Lato',
                },
              }}
            >
              {options.accentStones.map((stone) => (
                <MenuItem key={stone.id} value={stone.id}>
                  {stone.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Accent Stone Color */}
          {selectedAccentStone && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={selected.accentStones?.color || ''}
                label="Color"
                onChange={(e) => handleAccentStoneColorChange(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    fontFamily: 'Lato',
                  },
                }}
              >
                {selectedAccentStone.colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Accent Stone Quantity */}
          {selectedAccentStone && (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1,
                }}
              >
                Cantidad
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                {[2, 4, 6, 8].map((quantity) => (
                  <Button
                    key={quantity}
                    variant={selected.accentStones?.quantity === quantity ? 'contained' : 'outlined'}
                    onClick={() => handleAccentStoneQuantityChange(quantity)}
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      height: 40,
                      borderRadius: 1,
                      textTransform: 'none',
                      fontFamily: 'Lato',
                      fontWeight: 500,
                    }}
                  >
                    {quantity}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
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
          disabled={!selected.type || (selectedSetting?.allowsAccentStones && !selected.accentStones)}
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