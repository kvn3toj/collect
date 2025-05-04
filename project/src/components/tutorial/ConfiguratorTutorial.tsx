import React from 'react';
import { Box } from '@mui/material';
import MicroTutorial, { useMicroTutorial, MicroTutorialTrigger } from './MicroTutorial';

// Configuración del tutorial del configurador
const configuratorTutorialConfig = {
  id: 'configurator',
  title: 'Configurador de Joyas',
  description: 'Aprende a crear tu joya personalizada',
  trigger: 'auto' as const,
  showOnce: true,
  priority: 2, // Alta prioridad
  steps: [
    {
      title: 'Bienvenido al Configurador',
      description: 'Aquí podrás diseñar tu joya ideal con esmeraldas éticas colombianas. Te guiaremos paso a paso en el proceso.',
      image: '/images/tutorials/configurator-overview.jpg',
    },
    {
      title: 'Selecciona tu Esmeralda',
      description: 'Elige entre diferentes tamaños, tonalidades y calidades de esmeraldas. Cada una cuenta con certificación GIA que garantiza su autenticidad.',
      element: 'gemstone-selector',
      image: '/images/tutorials/emerald-selection.jpg',
    },
    {
      title: 'Elige el Metal',
      description: 'Decide entre oro amarillo, oro blanco o platino para tu pieza. El material afectará tanto la apariencia como el precio final.',
      element: 'metal-selector',
    },
    {
      title: 'Diseño de la Montura',
      description: 'Selecciona el estilo de engaste que mejor realce tu esmeralda. Cada estilo ha sido diseñado por nuestros maestros artesanos.',
      element: 'setting-selector',
    },
    {
      title: 'Visualización 3D',
      description: 'Observa en tiempo real cómo queda tu diseño. Puedes rotar y hacer zoom para apreciar cada detalle antes de confirmar.',
      element: 'preview-3d',
    },
    {
      title: 'Personalización Adicional',
      description: 'Añade grabados, piedras adicionales o selecciona acabados especiales para hacer tu joya verdaderamente única.',
      element: 'additional-options',
    },
    {
      title: '¡Tu Diseño Está Completo!',
      description: 'Revisa todos los detalles de tu creación. Recuerda que cada pieza se elabora artesanalmente tras tu confirmación.',
      action: 'Finalizar'
    }
  ]
};

// Componente principal del tutorial del configurador
const ConfiguratorTutorial: React.FC = () => {
  const tutorial = useMicroTutorial(configuratorTutorialConfig);

  return (
    <>
      <MicroTutorial tutorial={tutorial} variant="overlay" />
      
      {/* Botón de ayuda contextual que aparece en la esquina superior derecha del configurador */}
      {tutorial.completed && (
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <MicroTutorialTrigger
            tutorialId={tutorial.tutorialId}
            start={tutorial.start}
            tooltip="Ver guía del configurador"
          />
        </Box>
      )}
    </>
  );
};

export default ConfiguratorTutorial; 