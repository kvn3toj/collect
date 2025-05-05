import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Tabs,
  Tab,
  Chip,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton
} from '@mui/material';
import { Info, Diamond, MapPin, Award } from 'lucide-react';

interface EmeraldCut {
  id: string;
  name: string;
  description: string;
  image: string;
  characteristics: string[];
}

interface EmeraldQuality {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  priceMultiplier: number;
}

interface EmeraldOrigin {
  id: string;
  name: string;
  description: string;
  image: string;
  characteristics: string[];
}

const emeraldCuts: EmeraldCut[] = [
  {
    id: 'emerald-cut',
    name: 'Corte Esmeralda',
    description: 'El corte clásico rectangular con facetas escalonadas que realza la belleza natural de la esmeralda',
    image: '/images/emerald-cuts/emerald-cut.jpg',
    characteristics: [
      'Rectangular con esquinas truncadas',
      'Facetas escalonadas',
      'Ideal para esmeraldas de alta calidad',
      'Máxima transparencia y brillo'
    ]
  },
  {
    id: 'oval-cut',
    name: 'Corte Oval',
    description: 'Corte ovalado que maximiza el brillo y el tamaño aparente de la piedra',
    image: '/images/emerald-cuts/oval-cut.jpg',
    characteristics: [
      'Forma ovalada elegante',
      'Brillo excepcional',
      'Aspecto más grande que su peso real',
      'Versátil para diferentes estilos'
    ]
  },
  {
    id: 'cushion-cut',
    name: 'Corte Cojín',
    description: 'Corte cuadrado con esquinas redondeadas que combina tradición y modernidad',
    image: '/images/emerald-cuts/cushion-cut.jpg',
    characteristics: [
      'Forma cuadrada con esquinas suaves',
      'Brillo intenso',
      'Estilo contemporáneo',
      'Ideal para diseños modernos'
    ]
  }
];

const emeraldQualities: EmeraldQuality[] = [
  {
    id: 'exceptional',
    name: 'Excepcional',
    description: 'Esmeraldas de la más alta calidad, con color verde intenso y transparencia perfecta',
    characteristics: [
      'Color verde intenso y uniforme',
      'Transparencia excepcional',
      'Inclusiones mínimas',
      'Certificación internacional'
    ],
    priceMultiplier: 2.5
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Esmeraldas de alta calidad con excelente color y transparencia',
    characteristics: [
      'Color verde vibrante',
      'Buena transparencia',
      'Inclusiones menores',
      'Certificación garantizada'
    ],
    priceMultiplier: 1.8
  },
  {
    id: 'fine',
    name: 'Fina',
    description: 'Esmeraldas de buena calidad con color y transparencia notables',
    characteristics: [
      'Color verde natural',
      'Transparencia aceptable',
      'Inclusiones visibles',
      'Certificación incluida'
    ],
    priceMultiplier: 1.2
  }
];

const emeraldOrigins: EmeraldOrigin[] = [
  {
    id: 'colombia-muzo',
    name: 'Muzo, Colombia',
    description: 'Las legendarias esmeraldas de Muzo, conocidas por su color verde profundo y brillo excepcional',
    image: '/images/emerald-origins/muzo.jpg',
    characteristics: [
      'Color verde profundo',
      'Brillo excepcional',
      'Origen más prestigioso',
      'Certificación de origen'
    ]
  },
  {
    id: 'colombia-chivor',
    name: 'Chivor, Colombia',
    description: 'Esmeraldas de Chivor, famosas por su color verde azulado y transparencia única',
    image: '/images/emerald-origins/chivor.jpg',
    characteristics: [
      'Color verde azulado',
      'Alta transparencia',
      'Origen histórico',
      'Certificación de origen'
    ]
  },
  {
    id: 'colombia-coscuez',
    name: 'Coscuez, Colombia',
    description: 'Esmeraldas de Coscuez, valoradas por su color verde intenso y calidad consistente',
    image: '/images/emerald-origins/coscuez.jpg',
    characteristics: [
      'Color verde intenso',
      'Calidad consistente',
      'Origen tradicional',
      'Certificación de origen'
    ]
  }
];

interface EmeraldSelectorProps {
  selectedEmerald: {
    cut: string;
    quality: string;
    origin: string;
    carats: number;
  };
  onEmeraldSelect: (emerald: {
    cut: string;
    quality: string;
    origin: string;
    carats: number;
  }) => void;
}

const EmeraldSelector: React.FC<EmeraldSelectorProps> = ({
  selectedEmerald,
  onEmeraldSelect
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEmeraldChange = (field: string, value: string) => {
    onEmeraldSelect({
      ...selectedEmerald,
      [field]: value
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Selecciona tu Esmeralda
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Personaliza tu joya con una esmeralda colombiana de la más alta calidad
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab icon={<Diamond size={20} />} label="Corte" />
        <Tab icon={<Award size={20} />} label="Calidad" />
        <Tab icon={<MapPin size={20} />} label="Origen" />
      </Tabs>

      {/* Selector de Corte */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {emeraldCuts.map((cut) => (
            <Grid item xs={12} md={4} key={cut.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  },
                  border: selectedEmerald.cut === cut.id ? `2px solid ${theme.palette.primary.main}` : 'none'
                }}
              >
                <CardActionArea onClick={() => handleEmeraldChange('cut', cut.id)}>
                  <CardMedia
                    component="img"
                    height={200}
                    image={cut.image}
                    alt={cut.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {cut.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {cut.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {cut.characteristics.map((char, index) => (
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
      )}

      {/* Selector de Calidad */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          {emeraldQualities.map((quality) => (
            <Grid item xs={12} md={4} key={quality.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  },
                  border: selectedEmerald.quality === quality.id ? `2px solid ${theme.palette.primary.main}` : 'none'
                }}
              >
                <CardActionArea onClick={() => handleEmeraldChange('quality', quality.id)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Award size={24} style={{ marginRight: 8 }} />
                      <Typography variant="h6">
                        {quality.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {quality.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {quality.characteristics.map((char, index) => (
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
      )}

      {/* Selector de Origen */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          {emeraldOrigins.map((origin) => (
            <Grid item xs={12} md={4} key={origin.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4]
                  },
                  border: selectedEmerald.origin === origin.id ? `2px solid ${theme.palette.primary.main}` : 'none'
                }}
              >
                <CardActionArea onClick={() => handleEmeraldChange('origin', origin.id)}>
                  <CardMedia
                    component="img"
                    height={200}
                    image={origin.image}
                    alt={origin.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <MapPin size={24} style={{ marginRight: 8 }} />
                      <Typography variant="h6">
                        {origin.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {origin.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {origin.characteristics.map((char, index) => (
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
      )}
    </Box>
  );
};

export default EmeraldSelector; 