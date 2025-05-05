import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  CircularProgress,
  useTheme,
  useMediaQuery,
  IconButton,
  Fade,
  Slide,
  Modal,
} from '@mui/material';
import { ArrowLeft, Save, ShoppingCart, Eye, Settings, Diamond, MessageSquare, Award } from 'lucide-react';
import ConfiguratorTutorial from '../components/tutorial/ConfiguratorTutorial';
import JewelryTypeSelector from '../components/customizer/JewelryTypeSelector';
import MetalSelector from '../components/customizer/MetalSelector';
import EmeraldSelector from '../components/customizer/EmeraldSelector';
import SettingSelector from '../components/customizer/SettingSelector';
import EngravingSelector from '../components/customizer/EngravingSelector';
import QuoteRequestModal from '../components/customizer/QuoteRequestModal';
import { useQuery } from '@tanstack/react-query';
import { useConfiguratorStore } from '../stores/configuratorStore';
import { ConfiguratorControls } from '../components/configurator/ConfiguratorControls';
import { ConfiguratorViewer } from '../components/configurator/ConfiguratorViewer';
import { ConfiguratorProgress } from '../components/configurator/ConfiguratorProgress';
import { ConfiguratorPrice } from '../components/configurator/ConfiguratorPrice';
import { api } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfiguratorReview } from '../components/configurator/steps/ConfiguratorReview';
import { CertificationViewer } from '../components/premium/CertificationViewer';

// Define the steps in the configurator flow
const CONFIGURATOR_STEPS = [
  { id: 'select-type', label: 'Tipo de Joya' },
  { id: 'select-metal', label: 'Metal' },
  { id: 'select-emerald', label: 'Esmeralda' },
  { id: 'select-setting', label: 'Engaste' },
  { id: 'select-engraving', label: 'Grabado' },
  { id: 'review', label: 'Revisión' },
] as const;

type ConfiguratorStep = typeof CONFIGURATOR_STEPS[number]['id'];

const CustomizerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentStep, setError, config, setLoading } = useConfiguratorStore();
  
  const [is3DViewActive, setIs3DViewActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showControls, setShowControls] = useState(!isMobile);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedEmeraldId, setSelectedEmeraldId] = useState<string | null>(null);
  const [selectedEmeraldName, setSelectedEmeraldName] = useState<string | null>(null);

  // Fetch configurator options
  const { data: options, isLoading: optionsLoading, error } = useQuery({
    queryKey: ['configuratorOptions'],
    queryFn: async () => {
      const response = await api.get('/api/configurator/options');
      return response.data;
    },
  });

  useEffect(() => {
    if (error) {
      setError('Error al cargar las opciones del configurador');
    }
  }, [error, setError]);

  // Simulación de carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveToAtelier = async () => {
    setLoading(true);
    try {
      // TODO: Implement save to atelier logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    } finally {
      setLoading(false);
    }
  };

  // Handle step navigation
  const handleNext = () => {
    const currentIndex = CONFIGURATOR_STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex < CONFIGURATOR_STEPS.length - 1) {
      setCurrentStep(CONFIGURATOR_STEPS[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = CONFIGURATOR_STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(CONFIGURATOR_STEPS[currentIndex - 1].id);
    }
  };

  // Function to open certificate viewer
  const handleOpenCertificate = (emeraldId: string, emeraldName: string) => {
    setSelectedEmeraldId(emeraldId);
    setSelectedEmeraldName(emeraldName);
    setShowCertificate(true);
  };

  // Function to close certificate viewer
  const handleCloseCertificate = () => {
    setShowCertificate(false);
  };

  // Render current step component
  const renderCurrentStep = () => {
    const stepProps = {
      onNext: handleNext,
      onBack: handleBack,
    };

    switch (currentStep) {
      case 'select-type':
        return <JewelryTypeSelector {...stepProps} />;
      case 'select-metal':
        return <MetalSelector {...stepProps} />;
      case 'select-emerald':
        return (
          <EmeraldSelector 
            {...stepProps} 
            onViewCertificate={handleOpenCertificate} 
          />
        );
      case 'select-setting':
        return <SettingSelector {...stepProps} />;
      case 'select-engraving':
        return <EngravingSelector {...stepProps} />;
      case 'review':
        return (
          <ConfiguratorReview
            {...stepProps}
            onRequestQuote={() => setShowQuoteModal(true)}
            onSaveToAtelier={handleSaveToAtelier}
            onViewCertificate={handleOpenCertificate}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            opacity: 0.8,
          }}
        />
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 2, 
            color: 'text.secondary',
            fontWeight: 300,
            letterSpacing: 1,
          }}>
          Inicializando el configurador de joyas...
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 0, md: 2 },
        }}
      >
        {/* Progress Indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            px: { xs: 2, md: 4 },
            py: 2,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ConfiguratorProgress steps={CONFIGURATOR_STEPS} currentStep={currentStep} />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            mt: { xs: 8, md: 10 },
            position: 'relative',
          }}
        >
          {/* 3D Viewer */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              height: { xs: '50vh', md: 'auto' },
              minHeight: { xs: '50vh', md: 'calc(100vh - 200px)' },
              bgcolor: 'background.paper',
              borderRadius: { xs: 0, md: 2 },
              overflow: 'hidden',
              boxShadow: { xs: 'none', md: '0 4px 20px rgba(0,0,0,0.05)' },
            }}
          >
            <ConfiguratorViewer />
          </Box>

          {/* Controls Panel */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <Box
                  sx={{
                    width: { xs: '100%', md: '400px' },
                    height: { xs: '50vh', md: 'auto' },
                    position: { xs: 'relative', md: 'sticky' },
                    top: { md: 80 },
                    bgcolor: 'background.paper',
                    borderLeft: { md: 1 },
                    borderColor: { md: 'divider' },
                    overflow: 'auto',
                    boxShadow: { xs: 'none', md: '-4px 0 20px rgba(0,0,0,0.05)' },
                  }}
                >
                  <ConfiguratorControls options={options} isLoading={optionsLoading} />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Price Display */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            borderTop: 1,
            borderColor: 'divider',
            p: 2,
          }}
        >
          <ConfiguratorPrice />
        </Box>

        {/* Mobile Controls Toggle */}
        {isMobile && (
          <IconButton
            onClick={() => setShowControls(!showControls)}
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 16,
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'background.paper',
              },
            }}
          >
            <Settings />
          </IconButton>
        )}
      </Container>

      {/* Tutorial del configurador */}
      <ConfiguratorTutorial />
      
      {/* Navegación superior */}
      <Box 
        sx={{ 
          position: 'fixed',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: 2,
          p: 1,
        }}
      >
        <Button 
          startIcon={<ArrowLeft />} 
          onClick={() => navigate('/products')}
          variant="text"
          sx={{ color: 'text.primary' }}
        >
          Volver
        </Button>
        
        <Box>
          <Button
            startIcon={<Eye />}
            onClick={() => setIs3DViewActive(!is3DViewActive)}
            variant="text"
            sx={{ mr: 1, color: 'text.primary' }}
          >
            {is3DViewActive ? '2D' : '3D'}
          </Button>
          <Button
            startIcon={<Save />}
            variant="text"
            onClick={handleSaveToAtelier}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            Guardar
          </Button>
          <Button
            startIcon={<MessageSquare />}
            variant="contained"
            color="primary"
            onClick={() => setShowQuoteModal(true)}
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            Cotizar
          </Button>
        </Box>
      </Box>

      {/* Add Certification Viewer Modal */}
      <Modal
        open={showCertificate}
        onClose={handleCloseCertificate}
        aria-labelledby="certification-modal-title"
        aria-describedby="certification-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box sx={{ maxWidth: 900, width: '100%', maxHeight: '90vh', outline: 'none' }}>
          {selectedEmeraldId && (
            <CertificationViewer 
              productId={selectedEmeraldId} 
              productName={selectedEmeraldName || 'Esmeralda'} 
              onClose={handleCloseCertificate} 
            />
          )}
        </Box>
      </Modal>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        open={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        config={config}
      />
    </Box>
  );
};

export default CustomizerPage; 