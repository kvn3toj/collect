import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  IconButton,
  Fade,
  Zoom,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { X, Check, Phone, Mail, User, Clock, MessageSquare } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { quoteService, QuoteRequest } from '../../services/quote.service';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteRequestForm {
  fullName: string;
  email: string;
  phone: string;
  timezone: string;
  message: string;
}

interface QuoteRequestModalProps {
  open: boolean;
  onClose: () => void;
  customization: QuoteRequest['customization'];
}

const timezones = [
  { value: 'America/Mexico_City', label: 'Ciudad de México (GMT-6)' },
  { value: 'America/New_York', label: 'Nueva York (GMT-5)' },
  { value: 'America/Los_Angeles', label: 'Los Ángeles (GMT-8)' },
  { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
  { value: 'Europe/London', label: 'Londres (GMT+0)' },
];

const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  open,
  onClose,
  customization
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSuccess, setIsSuccess] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<QuoteRequestForm>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      timezone: '',
      message: ''
    }
  });

  const quoteMutation = useMutation({
    mutationFn: (data: QuoteRequestForm) => 
      quoteService.requestQuote({
        ...data,
        customization
      }),
    onSuccess: () => {
      setIsSuccess(true);
    }
  });

  const onSubmit = (data: QuoteRequestForm) => {
    quoteMutation.mutate(data);
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          boxShadow: 'none',
          overflow: 'hidden'
        }
      }}
    >
      <DialogContent sx={{ p: 0, height: '100%' }}>
        <Box sx={{ 
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}>
          {/* Header */}
          <Box sx={{ 
            p: { xs: 2, md: 3 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography 
              variant="h5" 
              fontFamily="Playfair Display"
              sx={{ 
                fontWeight: 500,
                letterSpacing: 0.5
              }}
            >
              Solicitar Cotización Privada
            </Typography>
            <IconButton 
              onClick={handleClose}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  color: 'text.primary',
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <X size={24} />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden'
          }}>
            {/* Left: 3D Preview */}
            <Box sx={{ 
              flex: 1,
              p: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              borderRight: { md: '1px solid' },
              borderBottom: { xs: '1px solid', md: 'none' },
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}>
              <Typography 
                variant="h6" 
                fontFamily="Playfair Display" 
                gutterBottom
                sx={{ 
                  fontWeight: 500,
                  letterSpacing: 0.5
                }}
              >
                Tu Diseño
              </Typography>
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: 'Lato',
                    fontWeight: 300,
                    letterSpacing: 0.5
                  }}
                >
                  Visualización 3D en desarrollo
                </Typography>
              </Box>
              <Box sx={{ 
                mt: 2,
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 1
              }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: 'Lato',
                    fontWeight: 300,
                    letterSpacing: 0.5,
                    mb: 1
                  }}
                >
                  • Tipo: {customization.type}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: 'Lato',
                    fontWeight: 300,
                    letterSpacing: 0.5,
                    mb: 1
                  }}
                >
                  • Metal: {customization.metal.type} ({customization.metal.weight}g)
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: 'Lato',
                    fontWeight: 300,
                    letterSpacing: 0.5,
                    mb: 1
                  }}
                >
                  • Esmeralda: {customization.emerald.quality} de {customization.emerald.origin} ({customization.emerald.carats}ct)
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: 'Lato',
                    fontWeight: 300,
                    letterSpacing: 0.5,
                    mb: 1
                  }}
                >
                  • Engaste: {customization.setting.style}
                  {customization.setting.accentStones && customization.setting.accentStoneType && 
                    ` con ${customization.setting.accentStoneType}`}
                </Typography>
                {customization.engraving?.text && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontFamily: 'Lato',
                      fontWeight: 300,
                      letterSpacing: 0.5
                    }}
                  >
                    • Grabado: "{customization.engraving.text}" ({customization.engraving.font})
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Right: Form */}
            <Box sx={{ 
              flex: 1,
              p: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper'
            }}>
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: 'Campo requerido' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Nombre Completo"
                            variant="standard"
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <User size={20} color={theme.palette.text.secondary} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ 
                              mb: 3,
                              '& .MuiInputLabel-root': {
                                fontFamily: 'Lato',
                                fontWeight: 400,
                                fontSize: '0.875rem'
                              },
                              '& .MuiInputBase-root': {
                                fontFamily: 'Lato',
                                fontWeight: 300
                              }
                            }}
                          />
                        )}
                      />

                      <Controller
                        name="email"
                        control={control}
                        rules={{ 
                          required: 'Campo requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email inválido'
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Email"
                            variant="standard"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Mail size={20} color={theme.palette.text.secondary} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ 
                              mb: 3,
                              '& .MuiInputLabel-root': {
                                fontFamily: 'Lato',
                                fontWeight: 400,
                                fontSize: '0.875rem'
                              },
                              '& .MuiInputBase-root': {
                                fontFamily: 'Lato',
                                fontWeight: 300
                              }
                            }}
                          />
                        )}
                      />

                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: 'Campo requerido' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Teléfono"
                            variant="standard"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Phone size={20} color={theme.palette.text.secondary} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ 
                              mb: 3,
                              '& .MuiInputLabel-root': {
                                fontFamily: 'Lato',
                                fontWeight: 400,
                                fontSize: '0.875rem'
                              },
                              '& .MuiInputBase-root': {
                                fontFamily: 'Lato',
                                fontWeight: 300
                              }
                            }}
                          />
                        )}
                      />

                      <Controller
                        name="timezone"
                        control={control}
                        rules={{ required: 'Campo requerido' }}
                        render={({ field }) => (
                          <FormControl 
                            fullWidth 
                            variant="standard"
                            error={!!errors.timezone}
                            sx={{ mb: 3 }}
                          >
                            <InputLabel 
                              sx={{ 
                                fontFamily: 'Lato',
                                fontWeight: 400,
                                fontSize: '0.875rem'
                              }}
                            >
                              Zona Horaria
                            </InputLabel>
                            <Select
                              {...field}
                              startAdornment={
                                <InputAdornment position="start">
                                  <Clock size={20} color={theme.palette.text.secondary} />
                                </InputAdornment>
                              }
                              sx={{ 
                                fontFamily: 'Lato',
                                fontWeight: 300
                              }}
                            >
                              {timezones.map((timezone) => (
                                <MenuItem 
                                  key={timezone.value} 
                                  value={timezone.value}
                                  sx={{ 
                                    fontFamily: 'Lato',
                                    fontWeight: 300
                                  }}
                                >
                                  {timezone.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />

                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Mensaje Adicional"
                            variant="standard"
                            multiline
                            rows={3}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <MessageSquare size={20} color={theme.palette.text.secondary} />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ 
                              mb: 4,
                              '& .MuiInputLabel-root': {
                                fontFamily: 'Lato',
                                fontWeight: 400,
                                fontSize: '0.875rem'
                              },
                              '& .MuiInputBase-root': {
                                fontFamily: 'Lato',
                                fontWeight: 300
                              }
                            }}
                          />
                        )}
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={quoteMutation.isPending}
                        sx={{
                          bgcolor: '#D4AF37',
                          color: 'white',
                          '&:hover': {
                            bgcolor: '#B8960C'
                          },
                          height: 48,
                          borderRadius: 1,
                          textTransform: 'none',
                          fontFamily: 'Lato',
                          fontWeight: 500,
                          letterSpacing: 0.5,
                          boxShadow: 'none',
                          '&:disabled': {
                            bgcolor: 'rgba(212, 175, 55, 0.5)',
                            color: 'white'
                          }
                        }}
                      >
                        {quoteMutation.isPending ? (
                          <CircularProgress 
                            size={24} 
                            color="inherit"
                            sx={{ opacity: 0.8 }}
                          />
                        ) : (
                          'Solicitar Cotización'
                        )}
                      </Button>
                    </Box>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ 
                      textAlign: 'center',
                      py: 4
                    }}>
                      <Box sx={{ 
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: '#D4AF37',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.2)'
                      }}>
                        <Check size={32} color="white" />
                      </Box>
                      <Typography 
                        variant="h5" 
                        fontFamily="Playfair Display" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 500,
                          letterSpacing: 0.5
                        }}
                      >
                        Solicitud Enviada
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        paragraph
                        sx={{ 
                          fontFamily: 'Lato',
                          fontWeight: 300,
                          letterSpacing: 0.5,
                          maxWidth: 400,
                          mx: 'auto'
                        }}
                      >
                        Gracias por tu interés. Nuestro equipo te contactará pronto con una cotización detallada.
                      </Typography>
                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{
                          borderColor: '#D4AF37',
                          color: '#D4AF37',
                          '&:hover': {
                            borderColor: '#B8960C',
                            bgcolor: 'rgba(212, 175, 55, 0.04)'
                          },
                          textTransform: 'none',
                          fontFamily: 'Lato',
                          fontWeight: 500,
                          letterSpacing: 0.5,
                          px: 4
                        }}
                      >
                        Cerrar
                      </Button>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal; 