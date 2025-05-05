import React from 'react';
import { Container, Typography, Box, Grid, Paper, alpha, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { ConsultationReservation } from '../components/premium/ConsultationReservation';

const AboutPage = () => {
  const theme = useTheme();
  const [showConsultation, setShowConsultation] = React.useState(false);
  
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

  // Handler for toggling consultation reservation form
  const toggleConsultation = () => {
    setShowConsultation(!showConsultation);
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
          About ARETrust.store
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
          Curating the finest selection of luxury watches and accessories for the discerning collector
        </Typography>
      </motion.div>
      
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
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
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: theme.palette.text.primary,
                    mb: 2,
                  }}
                >
                  Our Story
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Lato', sans-serif",
                    color: theme.palette.text.secondary,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  Founded with a passion for horological excellence, ARETrust.store has established itself as a premier destination for luxury timepieces and accessories. Our journey began with a simple yet profound mission: to connect discerning collectors with exceptional pieces that embody craftsmanship, heritage, and innovation.
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Lato', sans-serif",
                    color: theme.palette.text.secondary,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                  }}
                >
                  Each piece in our collection is carefully curated to ensure it meets our exacting standards of quality, authenticity, and historical significance. We believe that a luxury timepiece is more than just a watch—it's a testament to human ingenuity and a legacy to be passed down through generations.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
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
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: theme.palette.text.primary,
                    mb: 2,
                  }}
                >
                  Our Commitment
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Lato', sans-serif",
                    color: theme.palette.text.secondary,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  At ARETrust.store, we are committed to providing an unparalleled shopping experience. Our team of experts is dedicated to helping you find the perfect timepiece that resonates with your personal style and appreciation for fine craftsmanship.
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "'Lato', sans-serif",
                    color: theme.palette.text.secondary,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                  }}
                >
                  We take pride in our rigorous authentication process, ensuring that every watch and accessory in our collection is genuine and in pristine condition. Our commitment to excellence extends beyond our products—we strive to build lasting relationships with our clients through exceptional service and expertise.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 6 }}>
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
                align="center"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: theme.palette.text.primary,
                  mb: 3,
                }}
              >
                Why Choose ARETrust.store?
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        mb: 2,
                      }}
                    >
                      Curated Selection
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Each piece is carefully selected for its quality, heritage, and investment potential
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        mb: 2,
                      }}
                    >
                      Expert Authentication
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Rigorous verification process ensuring authenticity and condition
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        mb: 2,
                      }}
                    >
                      Personalized Service
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Lato', sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Dedicated support from our team of horological experts
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Box>
      </motion.div>

      <Box sx={{ mt: 8 }}>
        <motion.div variants={fadeInUp}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 0,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.5),
              textAlign: 'center'
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
                mb: 2,
              }}
            >
              Exclusive Consultation
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Lato', sans-serif",
                color: theme.palette.text.secondary,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 3,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Our team of expert gemologists and designers offers personalized consultations to help you find or create the perfect piece that speaks to your individual style and preferences.
            </Typography>
            
            {!showConsultation ? (
              <Button
                variant="contained"
                color="primary"
                onClick={toggleConsultation}
                sx={{
                  mt: 2,
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
                Schedule a Consultation
              </Button>
            ) : (
              <Box sx={{ mt: 4 }}>
                <ConsultationReservation />
                <Button
                  variant="text"
                  color="primary"
                  onClick={toggleConsultation}
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    fontFamily: "'Lato', sans-serif"
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default AboutPage; 