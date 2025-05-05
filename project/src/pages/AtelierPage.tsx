import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import atelierService from '../services/atelier.service';
import AtelierDesignCard from '../components/atelier/AtelierDesignCard';
import { useAuth } from '../hooks/useAuth';

const AtelierPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();

  const { data: designs, isLoading, error } = useQuery({
    queryKey: ['myDesigns'],
    queryFn: atelierService.getMyDesigns,
    enabled: !!user,
  });

  const handleCreateNew = () => {
    navigate('/customize');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          size={32}
          sx={{
            color: '#D4AF37',
            opacity: 0.8,
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          sx={{
            fontFamily: 'Lato',
            fontWeight: 300,
            letterSpacing: 0.5,
          }}
        >
          Ha ocurrido un error al cargar tus diseños. Por favor, intenta nuevamente.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          mb: { xs: 3, md: 4 },
          px: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h4"
          fontFamily="Playfair Display"
          sx={{
            fontWeight: 500,
            letterSpacing: 0.5,
            mb: 2,
          }}
        >
          Mi Atelier Privado
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontFamily: 'Lato',
            fontWeight: 300,
            letterSpacing: 0.5,
            maxWidth: 600,
          }}
        >
          Un espacio exclusivo donde puedes guardar, editar y gestionar tus diseños personalizados de joyería.
        </Typography>
      </Box>

      {/* Content */}
      {designs?.length === 0 ? (
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            fontFamily="Playfair Display"
            sx={{
              fontWeight: 500,
              letterSpacing: 0.5,
              mb: 2,
            }}
          >
            Tu Atelier está vacío
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontFamily: 'Lato',
              fontWeight: 300,
              letterSpacing: 0.5,
              mb: 4,
              maxWidth: 400,
            }}
          >
            Comienza a crear diseños únicos y personalizados que reflejen tu estilo y visión.
          </Typography>
          <Button
            variant="contained"
            onClick={handleCreateNew}
            startIcon={<Plus size={20} />}
            sx={{
              bgcolor: '#D4AF37',
              color: 'white',
              '&:hover': {
                bgcolor: '#B8960C',
              },
              height: 48,
              px: 4,
              borderRadius: 1,
              textTransform: 'none',
              fontFamily: 'Lato',
              fontWeight: 500,
              letterSpacing: 0.5,
              boxShadow: 'none',
            }}
          >
            Comenzar a Diseñar
          </Button>
        </Box>
      ) : (
        <Box sx={{ px: { xs: 2, md: 3 } }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            sx={{
              '& .MuiGrid-item': {
                width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' },
              },
            }}
          >
            {designs?.map((design) => (
              <Grid item key={design.id}>
                <AtelierDesignCard design={design} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AtelierPage; 