import React from 'react';
import { Box } from '@mui/material';
import MicroTutorial, { useMicroTutorial, MicroTutorialTrigger } from './MicroTutorial';

// Configuración del tutorial de proceso de pago
const checkoutTutorialConfig = {
  id: 'checkout',
  title: 'Proceso de Pago Seguro',
  description: 'Guía para completar tu compra',
  trigger: 'auto' as const,
  showOnce: true,
  priority: 3, // Máxima prioridad
  steps: [
    {
      title: 'Proceso de Pago',
      description: 'Estás a pocos pasos de adquirir tu pieza exclusiva de ARE Trüst. Te guiaremos en cada etapa para garantizar una experiencia segura.',
      image: '/images/tutorials/checkout-overview.jpg',
    },
    {
      title: 'Revisa tu Carrito',
      description: 'Confirma que todos los detalles de tu pedido son correctos. Puedes ajustar cantidades o eliminar artículos si lo necesitas.',
      element: 'cart-review',
    },
    {
      title: 'Información de Envío',
      description: 'Proporciona los datos de entrega para tu pedido. Ofrecemos envío asegurado con seguimiento internacional para total tranquilidad.',
      element: 'shipping-form',
    },
    {
      title: 'Método de Pago',
      description: 'Selecciona tu método de pago preferido. Todas nuestras transacciones están protegidas con encriptación de nivel bancario.',
      element: 'payment-method',
    },
    {
      title: 'Certificación y Garantía',
      description: 'Cada pieza incluye certificado GIA de autenticidad, garantía internacional y seguimiento de origen ético de la esmeralda.',
      element: 'certificate-info',
    },
    {
      title: 'Confirmación Final',
      description: 'Revisa todos los detalles antes de confirmar. Recibirás un correo electrónico con la confirmación y detalles de seguimiento.',
      element: 'final-review',
      action: 'Entendido'
    }
  ]
};

// Componente principal del tutorial de checkout
const CheckoutTutorial: React.FC = () => {
  const tutorial = useMicroTutorial(checkoutTutorialConfig);

  return (
    <>
      <MicroTutorial tutorial={tutorial} variant="dialog" />
      
      {/* Botón de ayuda contextual que aparece en la página de checkout */}
      {tutorial.completed && (
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <MicroTutorialTrigger
            tutorialId={tutorial.tutorialId}
            start={tutorial.start}
            tooltip="Ver guía de pago"
          />
        </Box>
      )}
    </>
  );
};

export default CheckoutTutorial; 