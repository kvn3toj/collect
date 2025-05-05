import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import { Settings, Sparkles } from 'lucide-react';

interface Setting {
  id: string;
  name: string;
  description: string;
  image: string;
  characteristics: string[];
  accentStones: boolean;
  accentStoneTypes?: string[];
}

const settings: Setting[] = [
  {
    id: 'prong',
    name: 'Engaste Clásico',
    description: 'Engaste tradicional con garras que permite máxima entrada de luz a la esmeralda',
    image: '/images/settings/prong.jpg',
    characteristics: [
      '4-6 garras de metal',
      'Máxima visibilidad de la piedra',
      'Estilo atemporal',
      'Fácil mantenimiento'
    ],
    accentStones: true,
    accentStoneTypes: ['Diamantes', 'Zafiros', 'Rubíes']
  },
  {
    id: 'bezel',
    name: 'Engaste Bezel',
    description: 'Engaste moderno que rodea la esmeralda con un marco de metal, ofreciendo mayor protección',
    image: '/images/settings/bezel.jpg',
    characteristics: [
      'Marco de metal completo',
      'Protección superior',
      'Estilo contemporáneo',
      'Diseño minimalista'
    ],
    accentStones: true,
    accentStoneTypes: ['Diamantes', 'Zafiros']
  },
  {
    id: 'pave',
    name: 'Engaste Pavé',
    description: 'Engaste con múltiples piedras pequeñas que crean un efecto de brillo continuo',
    image: '/images/settings/pave.jpg',
    characteristics: [
      'Múltiples piedras pequeñas',
      'Efecto de brillo continuo',
      'Estilo lujoso',
      'Ideal para diseños elaborados'
    ],
    accentStones: true,
    accentStoneTypes: ['Diamantes', 'Zafiros', 'Rubíes']
  },
  {
    id: 'channel',
    name: 'Engaste Canal',
    description: 'Engaste donde las piedras se colocan en un canal de metal, creando una línea continua',
    image: '/images/settings/channel.jpg',
    characteristics: [
      'Piedras en canal de metal',
      'Diseño lineal',
      'Protección lateral',
      'Estilo elegante'
    ],
    accentStones: true,
    accentStoneTypes: ['Diamantes', 'Zafiros']
  }
];

interface SettingSelectorProps {
  selectedSetting: {
    style: string;
    accentStones: boolean;
    accentStoneType?: string;
  };
  onSettingSelect: (setting: {
    style: string;
    accentStones: boolean;
    accentStoneType?: string;
  }) => void;
}

const SettingSelector: React.FC<SettingSelectorProps> = ({
  selectedSetting,
  onSettingSelect
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSettingSelect = (setting: Setting) => {
    onSettingSelect({
      style: setting.id,
      accentStones: setting.accentStones,
      accentStoneType: setting.accentStoneTypes?.[0]
    });
  };

  const handleAccentStonesToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSettingSelect({
      ...selectedSetting,
      accentStones: event.target.checked
    });
  };

  const handleAccentStoneTypeSelect = (type: string) => {
    onSettingSelect({
      ...selectedSetting,
      accentStoneType: type
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Selecciona el Engaste
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Elige el estilo de engaste que mejor complemente tu esmeralda
      </Typography>

      <Grid container spacing={3}>
        {settings.map((setting) => (
          <Grid item xs={12} sm={6} md={3} key={setting.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4]
                },
                border: selectedSetting.style === setting.id ? `2px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              <CardActionArea onClick={() => handleSettingSelect(setting)}>
                <CardMedia
                  component="img"
                  height={200}
                  image={setting.image}
                  alt={setting.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Settings size={24} style={{ marginRight: 8 }} />
                    <Typography variant="h6">
                      {setting.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {setting.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {setting.characteristics.map((char, index) => (
                      <Chip
                        key={index}
                        label={char}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Opciones de Piedras de Acento */}
      {selectedSetting.style && settings.find(s => s.id === selectedSetting.style)?.accentStones && (
        <Box sx={{ mt: 4 }}>
          <FormControlLabel
            control={
              <Switch
                checked={selectedSetting.accentStones}
                onChange={handleAccentStonesToggle}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Sparkles size={20} style={{ marginRight: 8 }} />
                <Typography>Piedras de Acento</Typography>
              </Box>
            }
          />

          {selectedSetting.accentStones && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Tipo de Piedras de Acento
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {settings
                  .find(s => s.id === selectedSetting.style)
                  ?.accentStoneTypes?.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      onClick={() => handleAccentStoneTypeSelect(type)}
                      color={selectedSetting.accentStoneType === type ? 'primary' : 'default'}
                      variant={selectedSetting.accentStoneType === type ? 'filled' : 'outlined'}
                    />
                  ))}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SettingSelector; 