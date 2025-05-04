import React from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import MicroTutorial, { useMicroTutorial, MicroTutorialTrigger, MicroTutorialConfig } from './MicroTutorial';

// Ejemplo de configuración de un microtutorial
const configuratorTutorialConfig: MicroTutorialConfig = {
  id: 'configurator-tutorial',
  title: 'Configurador de Joyas',
  description: 'Aprende a utilizar nuestro configurador para crear joyas únicas',
  trigger: 'manual', // Este tutorial se activa manualmente con un botón
  showOnce: false,    // Se puede mostrar múltiples veces
  steps: [
    {
      title: 'Selección de Esmeralda',
      description: 'Primero, elige la esmeralda que más te guste de nuestra colección. Cada piedra es única y tiene características especiales.',
      image: '/images/products/lote-10-4-piedras-muzo.jpg',
      action: 'Entendido'
    },
    {
      title: 'Tipo de Joya',
      description: 'Selecciona el tipo de joya que deseas crear: anillo, collar, pendientes o pulsera.',
      image: '/images/products/lote-2-7-piedras.jpg',
      action: 'Siguiente'
    },
    {
      title: 'Material y Acabado',
      description: 'Elige entre oro blanco, amarillo o rosa, y personaliza el acabado según tus preferencias.',
      image: '/images/products/lote-3-6-piedras.jpg',
      action: 'Siguiente'
    },
    {
      title: '¡Tu Diseño Único!',
      description: 'Revisa tu creación en 3D y haz los ajustes finales antes de solicitar un presupuesto personalizado.',
      image: '/images/products/lote-5-4-piedras.jpg',
      action: 'Comenzar'
    }
  ]
};

// Ejemplo de un microtutorial que se muestra automáticamente
const welcomeTutorialConfig: MicroTutorialConfig = {
  id: 'welcome-tutorial',
  title: 'Bienvenido a ARE Trüst',
  description: 'Descubre el mundo de las esmeraldas éticas',
  trigger: 'auto',  // Este tutorial se muestra automáticamente
  showOnce: true,   // Solo se muestra una vez
  steps: [
    {
      title: 'Esmeraldas Colombianas',
      description: 'Nuestras esmeraldas son extraídas éticamente de las minas de Muzo, Colombia, reconocidas mundialmente por su calidad excepcional.',
      image: '/images/products/lote-1-187-piedras.jpg'
    },
    {
      title: 'Certificación y Trazabilidad',
      description: 'Cada gema viene con certificación GIA y un registro completo de su procedencia, garantizando su autenticidad y valor.',
      image: '/images/products/lote-7-3-piedras.jpg'
    }
  ]
};

const MicroTutorialExample: React.FC = () => {
  // Usamos el hook para cada tipo de tutorial
  const configuratorTutorial = useMicroTutorial(configuratorTutorialConfig);
  const welcomeTutorial = useMicroTutorial(welcomeTutorialConfig);
  
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom fontFamily="'Playfair Display', serif">
        Ejemplos de MicroTutorial
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom fontFamily="'Playfair Display', serif">
          Tutorial Automático (Dialog)
        </Typography>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="body1" paragraph>
              Este tutorial se muestra automáticamente la primera vez que el usuario visita la página.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={welcomeTutorial.start}
              sx={{ mr: 2 }}
            >
              Mostrar Tutorial
            </Button>
            <Button 
              variant="text" 
              onClick={welcomeTutorial.reset}
            >
              Reiniciar (borrar localStorage)
            </Button>
          </CardContent>
        </Card>
        
        {/* Renderizamos el tutorial como un diálogo */}
        <MicroTutorial tutorial={welcomeTutorial} variant="dialog" />
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom fontFamily="'Playfair Display', serif" sx={{ display: 'flex', alignItems: 'center' }}>
          Tutorial Manual con Trigger 
          <MicroTutorialTrigger 
            tutorialId={configuratorTutorialConfig.id} 
            start={configuratorTutorial.start}
            tooltip="Ver tutorial del configurador"
            size="small"
          />
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1" paragraph>
              Este tutorial se muestra cuando el usuario hace clic en el botón de ayuda. También puedes activarlo con el botón de abajo.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={configuratorTutorial.start}
            >
              Iniciar Tutorial del Configurador
            </Button>
          </CardContent>
        </Card>
        
        {/* Renderizamos el tutorial como un overlay */}
        <MicroTutorial tutorial={configuratorTutorial} variant="overlay" />
      </Box>
      
      <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
        Nota: Estos son ejemplos de cómo implementar los diferentes tipos de tutoriales. 
        El tutorial "overlay" aparece en la esquina inferior derecha, mientras que el tutorial 
        "dialog" aparece como un modal centrado. También existe la variante "tooltip" que 
        se ancla a elementos específicos de la interfaz.
      </Typography>
    </Box>
  );
};

export default MicroTutorialExample; 