import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { Type, RotateCcw } from 'lucide-react';

interface Font {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface Position {
  id: string;
  name: string;
  description: string;
  preview: string;
}

const fonts: Font[] = [
  {
    id: 'classic',
    name: 'Clásica',
    description: 'Tipografía elegante y atemporal',
    preview: 'ABCDEFG'
  },
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Diseño contemporáneo y minimalista',
    preview: 'ABCDEFG'
  },
  {
    id: 'script',
    name: 'Script',
    description: 'Estilo caligráfico y romántico',
    preview: 'ABCDEFG'
  }
];

const positions: Position[] = [
  {
    id: 'inside',
    name: 'Interior',
    description: 'Grabado en el interior del anillo',
    preview: '/images/engraving-positions/inside.jpg'
  },
  {
    id: 'outside',
    name: 'Exterior',
    description: 'Grabado en el exterior de la joya',
    preview: '/images/engraving-positions/outside.jpg'
  },
  {
    id: 'side',
    name: 'Lateral',
    description: 'Grabado en el lateral de la joya',
    preview: '/images/engraving-positions/side.jpg'
  }
];

interface EngravingSelectorProps {
  selectedEngraving: {
    text: string;
    font: string;
    position: string;
  };
  onEngravingSelect: (engraving: {
    text: string;
    font: string;
    position: string;
  }) => void;
}

const EngravingSelector: React.FC<EngravingSelectorProps> = ({
  selectedEngraving,
  onEngravingSelect
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [previewText, setPreviewText] = useState(selectedEngraving.text);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setPreviewText(newText);
    onEngravingSelect({
      ...selectedEngraving,
      text: newText
    });
  };

  const handleFontChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onEngravingSelect({
      ...selectedEngraving,
      font: event.target.value as string
    });
  };

  const handlePositionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onEngravingSelect({
      ...selectedEngraving,
      position: event.target.value as string
    });
  };

  const handleReset = () => {
    onEngravingSelect({
      text: '',
      font: 'classic',
      position: 'inside'
    });
    setPreviewText('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personaliza el Grabado
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Añade un toque personal a tu joya con un grabado único
      </Typography>

      <Grid container spacing={3}>
        {/* Texto del Grabado */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Texto del Grabado"
            value={previewText}
            onChange={handleTextChange}
            helperText="Máximo 20 caracteres"
            inputProps={{ maxLength: 20 }}
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Selector de Fuente */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Fuente</InputLabel>
            <Select
              value={selectedEngraving.font}
              onChange={handleFontChange}
              label="Fuente"
            >
              {fonts.map((font) => (
                <MenuItem key={font.id} value={font.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Type size={20} style={{ marginRight: 8 }} />
                    <Box>
                      <Typography variant="body1">{font.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {font.description}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Selector de Posición */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Posición</InputLabel>
            <Select
              value={selectedEngraving.position}
              onChange={handlePositionChange}
              label="Posición"
            >
              {positions.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="img"
                      src={position.preview}
                      alt={position.name}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover',
                        marginRight: 2,
                        borderRadius: 1
                      }}
                    />
                    <Box>
                      <Typography variant="body1">{position.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {position.description}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Vista Previa */}
        {previewText && (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: 'background.default'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Vista Previa del Grabado
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: selectedEngraving.font === 'script' ? 'cursive' : 'inherit',
                  color: 'text.primary'
                }}
              >
                {previewText}
              </Typography>
            </Paper>
          </Grid>
        )}

        {/* Botón de Reset */}
        <Grid item xs={12}>
          <Button
            startIcon={<RotateCcw size={20} />}
            onClick={handleReset}
            variant="outlined"
            color="secondary"
          >
            Restablecer Grabado
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EngravingSelector; 