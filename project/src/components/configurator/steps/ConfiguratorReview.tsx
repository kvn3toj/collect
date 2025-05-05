import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../../stores/configuratorStore';
import { Download, Save, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface ConfiguratorReviewProps {
  onRequestQuote: () => void;
  onSaveToAtelier: () => void;
  onBack: () => void;
}

export const ConfiguratorReview = ({
  onRequestQuote,
  onSaveToAtelier,
  onBack,
}: ConfiguratorReviewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { config, estimatedPrice, isLoading } = useConfiguratorStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToAtelier = async () => {
    setIsSaving(true);
    try {
      await onSaveToAtelier();
    } finally {
      setIsSaving(false);
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return '--';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderSpecification = (label: string, value: string | null) => {
    if (!value) return null;
    return (
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontFamily: 'Lato',
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          overflow: 'hidden',
        }}
      >
        {/* 3D Viewer */}
        <Box
          sx={{
            flex: 1,
            minHeight: { xs: '50vh', md: 'auto' },
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          {/* Placeholder for 3D Viewer */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Playfair Display',
                color: 'text.primary',
              }}
            >
              Vista 3D del Diseño
            </Typography>
          </Box>
        </Box>

        {/* Specifications and Actions */}
        <Box
          sx={{
            width: { xs: '100%', md: '400px' },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Specifications Card */}
          <Card
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 'none',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Playfair Display',
                  color: 'text.primary',
                  mb: 3,
                }}
              >
                Especificaciones
              </Typography>

              {/* Jewelry Type */}
              {renderSpecification('Tipo de Joya', config.jewelryType)}

              {/* Metal */}
              {config.metal.type && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    Metal
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontFamily: 'Lato',
                    }}
                  >
                    {config.metal.type} • {config.metal.color} • {config.metal.weight}g
                  </Typography>
                </Box>
              )}

              {/* Emerald */}
              {config.emerald.cut && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    Esmeralda
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontFamily: 'Lato',
                    }}
                  >
                    {config.emerald.cut} • {config.emerald.quality} • {config.emerald.carats} ct
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontFamily: 'Lato',
                      mt: 0.5,
                    }}
                  >
                    Origen: {config.emerald.origin}
                  </Typography>
                </Box>
              )}

              {/* Setting */}
              {config.setting.type && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    Engaste
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontFamily: 'Lato',
                    }}
                  >
                    {config.setting.type}
                  </Typography>
                  {config.setting.accentStones && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontFamily: 'Lato',
                        mt: 0.5,
                      }}
                    >
                      Piedras de acento: {config.setting.accentStones.type} •{' '}
                      {config.setting.accentStones.color} • {config.setting.accentStones.quantity}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Engraving */}
              {config.engraving && renderSpecification('Grabado', config.engraving)}

              <Divider sx={{ my: 3 }} />

              {/* Price */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  Precio Estimado
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'Playfair Display',
                    color: 'text.primary',
                    fontWeight: 600,
                  }}
                >
                  {formatPrice(estimatedPrice)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={onRequestQuote}
              startIcon={<MessageSquare size={20} />}
              disabled={isLoading}
              sx={{
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
              Solicitar Cotización Privada
            </Button>

            <Button
              variant="outlined"
              onClick={handleSaveToAtelier}
              startIcon={isSaving ? <CircularProgress size={20} /> : <Save size={20} />}
              disabled={isLoading || isSaving}
              sx={{
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
              {isSaving ? 'Guardando...' : 'Guardar en Mi Atelier'}
            </Button>

            <Button
              variant="text"
              startIcon={<Download size={20} />}
              disabled={isLoading}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'text.primary',
                },
                height: 48,
                borderRadius: 1,
                textTransform: 'none',
                fontFamily: 'Lato',
                fontWeight: 500,
              }}
            >
              Descargar Imagen
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}; 