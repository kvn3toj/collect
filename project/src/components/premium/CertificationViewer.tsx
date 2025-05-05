import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  alpha,
  useTheme,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { Download, X, FileText, CheckCircle } from 'lucide-react';
import { usePremiumStore } from '../../stores/premiumStore';
import { Certification } from '../../types/premium.types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

interface CertificationViewerProps {
  productId: string;
  open: boolean;
  onClose: () => void;
}

export const CertificationViewer: React.FC<CertificationViewerProps> = ({
  productId,
  open,
  onClose
}) => {
  const theme = useTheme();
  const { fetchCertification, downloadCertification, isLoading, error, resetError } = usePremiumStore();
  const [certification, setCertification] = useState<Certification | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (open && productId) {
      fetchCertification(productId).then(setCertification);
    }
  }, [open, productId]);

  const handleDownload = async () => {
    if (!productId) return;

    try {
      setDownloading(true);
      const blob = await downloadCertification(productId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certification-${productId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      // Error is handled by the store
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              zIndex: 1,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              '&:hover': {
                bgcolor: alpha(theme.palette.background.paper, 0.9)
              }
            }}
          >
            <X size={20} />
          </IconButton>

          {isLoading ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ p: 4 }}>
              <Alert
                severity="error"
                onClose={resetError}
                sx={{
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
                }}
              >
                {error}
              </Alert>
            </Box>
          ) : certification ? (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
            >
              <Stack spacing={4} sx={{ p: 4 }}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Playfair Display',
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      mb: 1
                    }}
                  >
                    Certificate of Authenticity
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary
                    }}
                  >
                    This certificate verifies the authenticity and quality of your gem.
                  </Typography>
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    bgcolor: alpha(theme.palette.background.paper, 0.5)
                  }}
                >
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FileText size={24} color={theme.palette.primary.main} />
                      <Typography variant="h6" sx={{ fontFamily: 'Inter', fontWeight: 500 }}>
                        Certificate Details
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Certificate Number
                        </Typography>
                        <Typography variant="body1">
                          {certification.certificateNumber}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Issue Date
                        </Typography>
                        <Typography variant="body1">
                          {new Date(certification.issueDate).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Valid Until
                        </Typography>
                        <Typography variant="body1">
                          {new Date(certification.validity).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Gem Details
                        </Typography>
                        <Typography variant="body1">
                          Type: {certification.metadata.gemType}
                        </Typography>
                        <Typography variant="body1">
                          Weight: {certification.metadata.weight} carats
                        </Typography>
                        <Typography variant="body1">
                          Dimensions: {certification.metadata.dimensions}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Paper>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleDownload}
                    disabled={downloading}
                    startIcon={downloading ? <CircularProgress size={20} /> : <Download size={20} />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4]
                      }
                    }}
                  >
                    {downloading ? 'Downloading...' : 'Download Certificate'}
                  </Button>
                </Box>
              </Stack>
            </motion.div>
          ) : null}
        </Box>
      </DialogContent>
    </Dialog>
  );
}; 