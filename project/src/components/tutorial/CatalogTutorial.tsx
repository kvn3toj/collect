import React from 'react';
import { Box } from '@mui/material';
import MicroTutorial, { useMicroTutorial, MicroTutorialTrigger } from './MicroTutorial';

// Configuración del tutorial del catálogo
const catalogTutorialConfig = {
  id: 'catalog',
  title: 'Catálogo de Joyas',
  description: 'Explora nuestra exclusiva colección',
  trigger: 'auto' as const,
  showOnce: true,
  priority: 1, // Prioridad media
  steps: [
    {
      title: 'Nuestra Colección',
      description: 'Bienvenido a la colección de ARE Trüst. Aquí encontrarás piezas únicas elaboradas con las más finas esmeraldas colombianas, todas éticas y certificadas.',
      image: '/images/tutorials/catalog-overview.jpg',
    },
    {
      title: 'Filtros de Búsqueda',
      description: 'Utiliza los filtros para encontrar piezas según categoría, tipo de esmeralda, precio o metal. Esto te ayudará a descubrir exactamente lo que buscas.',
      element: 'filter-panel',
    },
    {
      title: 'Detalles de la Joya',
      description: 'Cada ficha muestra información clave de la pieza: calidad de la esmeralda, pureza, origen y precio. Haz clic para ver información detallada.',
      element: 'product-card',
    },
    {
      title: 'Certificación GIA',
      description: 'Cada pieza incluye certificación GIA que garantiza la autenticidad y calidad de la esmeralda. Puedes ver el certificado completo en la página de detalle.',
      element: 'certification-badge',
    },
    {
      title: 'Información de Origen',
      description: 'Conoce la historia detrás de cada esmeralda: su origen, la mina de procedencia y cómo beneficia a las comunidades locales.',
      element: 'origin-info',
    },
    {
      title: 'Colecciones Especiales',
      description: 'Descubre nuestras colecciones temáticas exclusivas, diseñadas por maestros joyeros para ocasiones especiales.',
      element: 'special-collections',
      action: 'Explorar'
    }
  ]
};

// Componente principal del tutorial del catálogo
const CatalogTutorial: React.FC = () => {
  const tutorial = useMicroTutorial(catalogTutorialConfig);

  return (
    <>
      <MicroTutorial tutorial={tutorial} variant="tooltip" />
      
      {/* Botón de ayuda contextual que aparece en la página de catálogo */}
      {tutorial.completed && (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 10 }}>
          <MicroTutorialTrigger
            tutorialId={tutorial.tutorialId}
            start={tutorial.start}
            tooltip="Guía del catálogo"
          />
        </Box>
      )}
    </>
  );
};

export default CatalogTutorial; 