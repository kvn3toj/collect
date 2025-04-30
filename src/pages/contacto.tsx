import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Layout from '../components/Layout';

// Componente simple para línea de acento
const AccentLine = () => (
  <Divider sx={{ borderColor: 'secondary.main', borderWidth: 1, width: '80px', mx: 'auto', my: 2 }} />
);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  error: string | null;
  success: string | null;
}

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    error: null,
    success: null
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    try {
      // --- SIMULACIÓN DE ENVÍO ---
      // Aquí iría la lógica real para enviar el formulario a un backend o servicio
      console.log('Enviando formulario:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula espera de red
      
      // Simulación de resultado exitoso
      setStatus({
        loading: false,
        error: null,
        success: 'Mensaje enviado con éxito. Nos pondremos en contacto pronto.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Limpiar formulario
    } catch (error) {
      setStatus({
        loading: false,
        error: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
        success: null
      });
    }
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Contacto
        </Typography>
        <AccentLine />
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
          ¿Interesado en una pieza o en invertir con nosotros? Déjanos tu mensaje.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nombre Completo"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status.loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status.loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="subject"
                label="Asunto"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={status.loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="message"
                label="Mensaje"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                disabled={status.loading}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {status.loading && <CircularProgress color="secondary" sx={{ mb: 2 }} />}
              {status.error && <Alert severity="error" sx={{ mb: 2 }}>{status.error}</Alert>}
              {status.success && <Alert severity="success" sx={{ mb: 2 }}>{status.success}</Alert>}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                disabled={status.loading}
                sx={{ px: 5, py: 1.5 }}
              >
                Enviar Mensaje
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            También puedes contactarnos en:
          </Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 'medium' }}>
            info@aretrust.com
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
} 