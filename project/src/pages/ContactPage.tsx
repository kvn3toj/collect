import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Typography, Box, Grid, Paper, TextField, Button, Alert, CircularProgress, alpha, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { ConsultationReservation } from '../components/premium/ConsultationReservation';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConsultation, setShowConsultation] = useState(false);
  
  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // TODO: Implement contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSuccess(true);
      reset();
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      setErrorMessage(
        error.response?.data?.message || 
        'Unable to send message. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Contact Us
        </Typography>
        
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            color: theme.palette.text.secondary,
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          We're here to help with any questions about our luxury timepieces and services
        </Typography>
      </motion.div>
      
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  borderRadius: 0,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.5),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Mail size={32} color={theme.palette.primary.main} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    Email Us
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    info@aretrust.store
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Phone size={32} color={theme.palette.primary.main} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    Call Us
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <MapPin size={32} color={theme.palette.primary.main} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    Visit Us
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Lato', sans-serif",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    123 Luxury Avenue<br />
                    New York, NY 10001
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <motion.div variants={fadeInUp}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.5),
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: theme.palette.text.primary,
                    mb: 3,
                  }}
                >
                  Send Us a Message
                </Typography>
                
                {errorMessage && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 0,
                      '& .MuiAlert-icon': {
                        color: theme.palette.error.main,
                      },
                    }}
                  >
                    {errorMessage}
                  </Alert>
                )}
                
                {success && (
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 0,
                      '& .MuiAlert-icon': {
                        color: theme.palette.success.main,
                      },
                    }}
                  >
                    Thank you for your message. We'll get back to you shortly.
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name"
                        fullWidth
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 0,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha(theme.palette.primary.main, 0.5),
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: '1px',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 0,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha(theme.palette.primary.main, 0.5),
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: '1px',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Subject"
                        fullWidth
                        {...register("subject", { required: "Subject is required" })}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 0,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha(theme.palette.primary.main, 0.5),
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: '1px',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Message"
                        multiline
                        rows={4}
                        fullWidth
                        {...register("message", { required: "Message is required" })}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 0,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: alpha(theme.palette.primary.main, 0.5),
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: '1px',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        sx={{ 
                          py: 1.5,
                          borderRadius: 0,
                          backgroundColor: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
      
      <motion.div variants={fadeInUp} sx={{ mt: 8 }}>
        <Divider sx={{ mb: 6 }} />
        
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Premium Consultation
        </Typography>
        
        <Typography
          variant="h6"
          align="center"
          sx={{
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400,
            color: theme.palette.text.secondary,
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Schedule a personalized consultation with our jewelry experts
        </Typography>
        
        {!showConsultation ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Calendar />}
              onClick={() => setShowConsultation(true)}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 0,
                textTransform: 'none',
                fontFamily: "'Lato', sans-serif",
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Reserve Your Consultation
            </Button>
          </Box>
        ) : (
          <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
            <ConsultationReservation />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => setShowConsultation(false)}
                sx={{
                  textTransform: 'none',
                  fontFamily: "'Lato', sans-serif"
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default ContactPage; 