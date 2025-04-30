import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import Adjust from '@mui/icons-material/Adjust';
import Image from 'next/image';
import Layout from '../components/Layout';

// Componente simple para línea de acento
const AccentLine = () => (
  <Divider sx={{ borderColor: 'secondary.main', borderWidth: 1, width: '80px', mx: 'auto', my: 2 }} />
);

export default function NosotrosPage() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Nuestra Filosofía y Proceso
        </Typography>
        <AccentLine />
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Construyendo valor ético y confianza a través de esmeraldas colombianas excepcionales.
        </Typography>

        {/* Sección: Nuestro Enfoque */}
        <Box sx={{ my: 6 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom color="primary">
                Nuestro Enfoque
              </Typography>
              <Typography variant="body1" paragraph>
                ARE Trüst nace de la alianza entre empresarios e inversionistas con propósitos y vínculos de confianza compartidos. Nos centramos en crear piezas certificadas de Alta Joyería, adquiriendo esmeraldas en bruto directamente de mineros campesinos, asegurando una compensación justa y eliminando intermediarios.
              </Typography>
              <Typography variant="body1" paragraph>
                Destinamos el 50% de nuestras ganancias netas a potenciar la soberanía de comunidades rurales y urbanas, invirtiendo en desarrollo tecnológico y proyectos para el bienestar común y el cuidado de la vida.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', width: '100%', height: 300, borderRadius: 1, overflow: 'hidden' }}>
                <Image 
                  src="/images/about/enfoque.jpg" 
                  alt="Nuestro Enfoque" 
                  layout="fill" 
                  objectFit="cover"
                  priority
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Sección: Especialización Alta Joyería */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="primary" sx={{mb: 4}}>
            Especializados en Alta Joyería
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Las esmeraldas colombianas son reconocidas mundialmente. Nos enfocamos en las de mayor calidad, aquellas que requieren poco o ningún tratamiento de aceite:
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Typography align="center"><b>No-Oil:</b> $50k - $150k USD/Ct</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography align="center"><b>Insignificant:</b> $15k - $45k USD/Ct</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography align="center"><b>Minor:</b> $6k - $20k USD/Ct</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography align="center"><b>Moderate:</b> $3k - $8k USD/Ct</Typography>
            </Grid>
          </Grid>
          <Box sx={{ position: 'relative', width: '80%', height: 400, mx: 'auto', mt: 4, borderRadius: 1, overflow: 'hidden' }}>
            <Image 
              src="/images/about/joyeria-alta-calidad.jpg" 
              alt="Joyeria de Alta Calidad" 
              layout="fill" 
              objectFit="cover"
              priority
            />
          </Box>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Sección: Cadena de Valor */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="primary" sx={{mb: 4}}>
            Toda la Cadena de Valor
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon><CheckCircleOutline color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="Asociación Minera" 
                    secondary="Pertenecemos a una asociación de 9 familias con licencias mineras (370 Ha), garantizando suministro sostenible." 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleOutline color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="Taller Propio" 
                    secondary="Contamos con taller de joyería y bóvedas propias, asegurando calidad y seguridad." 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleOutline color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="Certificación GIA" 
                    secondary="Nuestras gemas son certificadas por el GIA, garantizando autenticidad y calidad internacional." 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleOutline color="secondary" /></ListItemIcon>
                  <ListItemText 
                    primary="Banca y Monetización" 
                    secondary="Convenios con proveedores de banca en EEUU y Europa para servicios de bóveda y monetización." 
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', width: '100%', height: 350, borderRadius: 1, overflow: 'hidden' }}>
                <Image 
                  src="/images/about/bovedas-newport-beach.jpg" 
                  alt="Bovedas Newport Beach" 
                  layout="fill" 
                  objectFit="cover"
                  priority
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 8, 
                    left: 8, 
                    color: 'white', 
                    bgcolor: 'rgba(0,0,0,0.6)', 
                    px: 1, 
                    borderRadius: 1 
                  }}
                >
                  Imagen real: Bóvedas en Newport Beach, CA
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* Sección: Modelo de Operación */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" color="primary" sx={{mb: 4}}>
            Nuestro Modelo de Operación
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>1. Producción (3 sem)</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Lapidación de esmeraldas en bruto." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Fabricación de monturas en oro." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Ensamblaje en Alta Joyería." />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>2. Transporte y Valoración (2 sem)</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Transporte seguro de Valores a EEUU." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Certificación GIA (Nueva York)." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Avalúo por Perito en Alta Joyería." />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>3. Custodia y Monetización</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Aseguramiento en bóvedas certificadas (3 días)." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Venta Directa (1-8 sem)." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Venta a Distribuidores (2 sem)." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{minWidth: 30}}>
                    <Adjust fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Venta en Subastas (4-12 sem)." />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
} 