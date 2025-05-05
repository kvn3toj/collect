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
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../../stores/configuratorStore';
import { useState, useEffect } from 'react';

interface Font {
  id: string;
  name: string;
  preview: string;
  family: string;
}

interface Position {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface EngravingSelectorProps {
  selected: string | null;
  onSelect: (engraving: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const AVAILABLE_FONTS: Font[] = [
  {
    id: 'classic',
    name: 'Clásica',
    preview: 'Aretrust',
    family: 'Playfair Display',
  },
  {
    id: 'modern',
    name: 'Moderno',
    preview: 'Aretrust',
    family: 'Lato',
  },
  {
    id: 'elegant',
    name: 'Elegante',
    preview: 'Aretrust',
    family: 'Cormorant Garamond',
  },
];

const ENGRAVING_POSITIONS: Position[] = [
  {
    id: 'inside',
    name: 'Interior',
    description: 'Grabado en el interior de la joya',
    icon: '💍',
  },
  {
    id: 'outside',
    name: 'Exterior',
    description: 'Grabado en el exterior de la joya',
    icon: '✨',
  },
];

const MAX_CHARACTERS = 20;

export const EngravingSelector = ({
  selected,
  onSelect,
  onNext,
  onBack,
}: EngravingSelectorProps) => {
  const theme = useTheme();
  const { setLoading } = useConfiguratorStore();
  const [text, setText] = useState(selected || '');
  const [selectedFont, setSelectedFont] = useState<Font>(AVAILABLE_FONTS[0]);
  const [selectedPosition, setSelectedPosition] = useState<Position>(ENGRAVING_POSITIONS[0]);

  useEffect(() => {
    if (text !== selected) {
      setLoading(true);
      onSelect(text);
      // Simulate loading state for 3D model update
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [text, selected, onSelect, setLoading]);

  const handleFontChange = (font: Font) => {
    setSelectedFont(font);
  };

  const handlePositionChange = (position: Position) => {
    setSelectedPosition(position);
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
      {/* Text Input */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Texto del Grabado
        </Typography>
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARACTERS))}
          placeholder="Ingrese el texto para grabar"
          variant="standard"
          InputProps={{
            sx: {
              '&:before': {
                borderBottomColor: 'divider',
              },
              '&:after': {
                borderBottomColor: 'primary.main',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottomColor: 'primary.main',
              },
              fontFamily: selectedFont.family,
              fontSize: '1.1rem',
              letterSpacing: '0.5px',
            },
          }}
          helperText={
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mt: 1,
                display: 'block',
                textAlign: 'right',
              }}
            >
              {text.length}/{MAX_CHARACTERS} caracteres
            </Typography>
          }
        />
      </Box>

      {/* Font Selection */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Fuente
        </Typography>
        <Grid container spacing={2}>
          {AVAILABLE_FONTS.map((font) => (
            <Grid item xs={4} key={font.id}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFontChange(font)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: selectedFont.id === font.id ? 'action.selected' : 'background.paper',
                  border: 1,
                  borderColor: selectedFont.id === font.id ? 'primary.main' : 'divider',
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
                      color: selectedFont.id === font.id ? 'primary.main' : 'text.primary',
                      fontWeight: selectedFont.id === font.id ? 600 : 400,
                      fontFamily: font.family,
                      fontSize: '1.1rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {font.preview}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      mt: 1,
                    }}
                  >
                    {font.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Position Selection */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Playfair Display',
            color: 'text.primary',
            mb: 2,
          }}
        >
          Posición del Grabado
        </Typography>
        <Grid container spacing={2}>
          {ENGRAVING_POSITIONS.map((position) => (
            <Grid item xs={6} key={position.id}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePositionChange(position)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: selectedPosition.id === position.id ? 'action.selected' : 'background.paper',
                  border: 1,
                  borderColor: selectedPosition.id === position.id ? 'primary.main' : 'divider',
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
                    variant="h4"
                    sx={{
                      mb: 1,
                    }}
                  >
                    {position.icon}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: selectedPosition.id === position.id ? 'primary.main' : 'text.primary',
                      fontWeight: selectedPosition.id === position.id ? 600 : 400,
                    }}
                  >
                    {position.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      mt: 0.5,
                    }}
                  >
                    {position.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Preview */}
      {text && (
        <Box
          sx={{
            p: 3,
            bgcolor: 'background.default',
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 1,
            }}
          >
            Vista Previa
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: selectedFont.family,
              color: 'text.primary',
              letterSpacing: '0.5px',
            }}
          >
            {text}
          </Typography>
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