// @ts-nocheck
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/**
 * Función principal para poblar la base de datos con datos de ejemplo
 */
async function main() {
  console.log('🌱 Iniciando proceso de población de la base de datos con datos de ejemplo...');
  
  try {
    // Primero limpiamos los datos existentes en el orden correcto (debido a las relaciones)
    console.log('🧹 Limpiando datos existentes...');
    await limpiarDatos();
    
    console.log('📊 Insertando datos de ejemplo...');
    
    // 1. Insertar Productos
    await crearProductosEjemplo();
    
    console.log('✅ Datos insertados exitosamente!');
    
  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
    throw error;
  }
}

/**
 * Limpia los datos existentes en la base de datos
 */
async function limpiarDatos() {
  // Eliminar productos y esmeraldas (primero por dependencias)
  await prisma.itemCarrito.deleteMany({});
  await prisma.itemPedido.deleteMany({});
  await prisma.listaDeseos.deleteMany({});
  await prisma.esmeralda.deleteMany({});
  await prisma.producto.deleteMany({});
  
  console.log('✓ Datos existentes eliminados');
}

/**
 * Crea productos de ejemplo en la base de datos
 */
async function crearProductosEjemplo() {
  // Array de productos de ejemplo
  const productos = [
    {
      id: uuidv4(),
      codigo: 'ANILLO-ESM-001',
      nombre: 'Anillo de Esmeralda Colombiana con Diamantes',
      descripcion: 'Elegante anillo de compromiso con esmeralda colombiana de la mina de Muzo, certificada, rodeada de diamantes de corte brillante en oro blanco de 18K. Un símbolo de elegancia y distinción.',
      descripcionCorta: 'Anillo de compromiso con esmeralda colombiana y diamantes',
      tipoJoya: 'ANILLO',
      tipoMetal: 'ORO_BLANCO_18K',
      corteEsmeralda: 'EMERALD_CUT',
      calidadEsmeralda: 'PREMIUM',
      origenEsmeralda: 'COLOMBIA_MUZO',
      quilatesEsmeralda: 1.5,
      dimensionesEsmeralda: {
        largo: '7mm',
        ancho: '5mm',
        profundidad: '3mm'
      },
      precio: 12500.00,
      precioAnterior: 13800.00,
      stock: 1,
      enStock: true,
      destacado: true,
      imagenesPrincipales: [
        'https://example.com/images/anillo-esmeralda-1.jpg',
        'https://example.com/images/anillo-esmeralda-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/anillo-esmeralda-detalle-1.jpg',
        'https://example.com/images/anillo-esmeralda-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/anillo-esmeralda.mp4',
      certificadoURL: 'https://example.com/certificates/cert-001.pdf',
      slug: 'anillo-esmeralda-colombiana-diamantes',
      metaTitle: 'Anillo de Esmeralda Colombiana con Diamantes | ARE Trust',
      metaDescription: 'Exquisito anillo de compromiso con esmeralda colombiana de la mina de Muzo certificada, rodeada de diamantes en oro blanco de 18K.',
      tags: ['anillo', 'compromiso', 'esmeralda', 'colombiana', 'diamantes', 'lujo'],
      createdAt: new Date(),
      updatedAt: new Date(),
      imagen_url: 'https://example.com/images/anillo-esmeralda-principal.jpg'
    },
    {
      id: uuidv4(),
      codigo: 'COLLAR-ESM-001',
      nombre: 'Collar de Esmeralda Oval con Cadena de Oro',
      descripcion: 'Sofisticado collar con esmeralda oval de origen colombiano engarzada en un delicado diseño de oro amarillo de 18K. La piedra presenta un color verde intenso característico de las mejores esmeraldas de Chivor.',
      descripcionCorta: 'Collar con esmeralda oval colombiana en oro amarillo',
      tipoJoya: 'COLLAR',
      tipoMetal: 'ORO_AMARILLO_18K',
      corteEsmeralda: 'OVAL',
      calidadEsmeralda: 'ALTA',
      origenEsmeralda: 'COLOMBIA_CHIVOR',
      quilatesEsmeralda: 2.1,
      dimensionesEsmeralda: {
        largo: '10mm',
        ancho: '8mm',
        profundidad: '4mm'
      },
      precio: 9800.00,
      precioAnterior: 10500.00,
      stock: 2,
      enStock: true,
      destacado: true,
      imagenesPrincipales: [
        'https://example.com/images/collar-esmeralda-1.jpg',
        'https://example.com/images/collar-esmeralda-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/collar-esmeralda-detalle-1.jpg',
        'https://example.com/images/collar-esmeralda-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/collar-esmeralda.mp4',
      certificadoURL: 'https://example.com/certificates/cert-002.pdf',
      slug: 'collar-esmeralda-oval-oro',
      metaTitle: 'Collar de Esmeralda Oval con Cadena de Oro | ARE Trust',
      metaDescription: 'Elegante collar con esmeralda oval colombiana de Chivor montada en oro amarillo de 18K, pieza única de joyería de lujo.',
      tags: ['collar', 'esmeralda', 'oval', 'oro amarillo', 'lujo', 'colombia'],
      createdAt: new Date(),
      updatedAt: new Date(),
      imagen_url: 'https://example.com/images/collar-esmeralda-principal.jpg'
    },
    {
      id: uuidv4(),
      codigo: 'PENDIENTES-ESM-001',
      nombre: 'Pendientes de Esmeralda Pera y Diamantes',
      descripcion: 'Elegantes pendientes con esmeraldas de corte pera de origen colombiano, complementadas con pequeños diamantes de máxima pureza. Montados en oro blanco de 18K con sistema de cierre seguro.',
      descripcionCorta: 'Pendientes con esmeraldas de corte pera y diamantes',
      tipoJoya: 'PENDIENTES',
      tipoMetal: 'ORO_BLANCO_18K',
      corteEsmeralda: 'PERA',
      calidadEsmeralda: 'PREMIUM',
      origenEsmeralda: 'COLOMBIA_MUZO',
      quilatesEsmeralda: 3.0,
      dimensionesEsmeralda: {
        largo: '12mm',
        ancho: '8mm',
        profundidad: '4mm'
      },
      precio: 15300.00,
      precioAnterior: 16800.00,
      stock: 1,
      enStock: true,
      destacado: true,
      imagenesPrincipales: [
        'https://example.com/images/pendientes-esmeralda-1.jpg',
        'https://example.com/images/pendientes-esmeralda-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/pendientes-esmeralda-detalle-1.jpg',
        'https://example.com/images/pendientes-esmeralda-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/pendientes-esmeralda.mp4',
      certificadoURL: 'https://example.com/certificates/cert-003.pdf',
      slug: 'pendientes-esmeralda-pera-diamantes',
      metaTitle: 'Pendientes de Esmeralda Pera y Diamantes | ARE Trust',
      metaDescription: 'Sofisticados pendientes con esmeraldas colombianas de corte pera y diamantes en oro blanco de 18K, joyería de alto nivel.',
      tags: ['pendientes', 'aretes', 'esmeralda', 'pera', 'diamantes', 'lujo'],
      createdAt: new Date(),
      updatedAt: new Date(),
      imagen_url: 'https://example.com/images/pendientes-esmeralda-principal.jpg'
    },
    {
      id: uuidv4(),
      codigo: 'PULSERA-ESM-001',
      nombre: 'Pulsera Tennis de Esmeraldas y Diamantes',
      descripcion: 'Pulsera tipo tennis con 15 esmeraldas de corte redondo alternadas con diamantes de máxima pureza. Engarzada en platino de alta calidad con cierre de seguridad doble.',
      descripcionCorta: 'Pulsera tennis con esmeraldas redondas y diamantes',
      tipoJoya: 'PULSERA',
      tipoMetal: 'PLATINO',
      corteEsmeralda: 'REDONDO',
      calidadEsmeralda: 'ALTA',
      origenEsmeralda: 'COLOMBIA_COSCUEZ',
      quilatesEsmeralda: 4.5,
      dimensionesEsmeralda: {
        diametro: '4mm',
        profundidad: '3mm'
      },
      precio: 18700.00,
      precioAnterior: 21000.00,
      stock: 1,
      enStock: true,
      destacado: true,
      imagenesPrincipales: [
        'https://example.com/images/pulsera-tennis-1.jpg',
        'https://example.com/images/pulsera-tennis-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/pulsera-tennis-detalle-1.jpg',
        'https://example.com/images/pulsera-tennis-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/pulsera-tennis.mp4',
      certificadoURL: 'https://example.com/certificates/cert-004.pdf',
      slug: 'pulsera-tennis-esmeraldas-diamantes',
      metaTitle: 'Pulsera Tennis de Esmeraldas y Diamantes | ARE Trust',
      metaDescription: 'Lujosa pulsera tennis con esmeraldas colombianas de corte redondo alternadas con diamantes, montada en platino de alta calidad.',
      tags: ['pulsera', 'tennis', 'esmeraldas', 'diamantes', 'platino', 'lujo'],
      createdAt: new Date(),
      updatedAt: new Date(),
      imagen_url: 'https://example.com/images/pulsera-tennis-principal.jpg'
    },
    {
      id: uuidv4(),
      codigo: 'ANILLO-ESM-002',
      nombre: 'Anillo Cabochon con Esmeralda Colombiana',
      descripcion: 'Anillo con espectacular esmeralda cabochon de origen colombiano montada en oro rosa de 18K con pequeños diamantes laterales. Una pieza única con un diseño contemporáneo que realza la belleza natural de la gema.',
      descripcionCorta: 'Anillo con esmeralda cabochon en oro rosa',
      tipoJoya: 'ANILLO',
      tipoMetal: 'ORO_ROSA_18K',
      corteEsmeralda: 'CABOCHON',
      calidadEsmeralda: 'PREMIUM',
      origenEsmeralda: 'COLOMBIA_MUZO',
      quilatesEsmeralda: 5.2,
      dimensionesEsmeralda: {
        largo: '12mm',
        ancho: '10mm',
        altura: '7mm'
      },
      precio: 22500.00,
      precioAnterior: 25000.00,
      stock: 1,
      enStock: true,
      destacado: true,
      imagenesPrincipales: [
        'https://example.com/images/anillo-cabochon-1.jpg',
        'https://example.com/images/anillo-cabochon-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/anillo-cabochon-detalle-1.jpg',
        'https://example.com/images/anillo-cabochon-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/anillo-cabochon.mp4',
      certificadoURL: 'https://example.com/certificates/cert-005.pdf',
      slug: 'anillo-cabochon-esmeralda-colombiana',
      metaTitle: 'Anillo Cabochon con Esmeralda Colombiana | ARE Trust',
      metaDescription: 'Exclusivo anillo con esmeralda cabochon de Colombia montada en oro rosa de 18K, una pieza única de colección.',
      tags: ['anillo', 'cabochon', 'esmeralda', 'oro rosa', 'diamantes', 'lujo'],
      createdAt: new Date(),
      updatedAt: new Date(),
      imagen_url: 'https://example.com/images/anillo-cabochon-principal.jpg'
    }
  ];
  
  console.log(`⏳ Insertando ${productos.length} productos de ejemplo...`);
  
  // Insertar productos en la base de datos
  for (const producto of productos) {
    await prisma.producto.create({
      data: producto
    });
  }
  
  console.log(`✓ ${productos.length} productos insertados`);
  
  // Crear algunas esmeraldas sueltas de ejemplo
  const esmeraldas = [
    {
      id: uuidv4(),
      codigo: 'ESM-SUELTA-001',
      nombre: 'Esmeralda Colombiana de Muzo Talla Esmeralda',
      descripcion: 'Excepcional esmeralda de la mina de Muzo (Colombia) con talla esmeralda clásica. Color verde intenso, claridad excepcional y mínimo tratamiento con aceite. Certificada por GIA.',
      quilates: 2.34,
      corte: 'EMERALD_CUT',
      origen: 'COLOMBIA_MUZO',
      calidad: 'PREMIUM',
      color: 'Verde intenso',
      claridad: 'VS',
      tratamiento: 'Mínimo (aceite)',
      indiceRefraccion: '1.57-1.58',
      dimensiones: {
        largo: '9mm',
        ancho: '7mm',
        profundidad: '5mm'
      },
      certificadoNumero: 'GIA-2304567',
      entidadCertificadora: 'GIA',
      certificadoURL: 'https://example.com/certificates/gia-2304567.pdf',
      precio: 15800.00,
      precioTotal: 15800.00,
      disponible: true,
      imagenesPrincipales: [
        'https://example.com/images/esmeralda-muzo-1.jpg',
        'https://example.com/images/esmeralda-muzo-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/esmeralda-muzo-detalle-1.jpg',
        'https://example.com/images/esmeralda-muzo-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/esmeralda-muzo.mp4',
      slug: 'esmeralda-colombiana-muzo-talla-esmeralda',
      metaTitle: 'Esmeralda Colombiana de Muzo Talla Esmeralda | ARE Trust',
      metaDescription: 'Excepcional esmeralda de 2.34ct de la mina de Muzo con talla esmeralda clásica, color verde intenso y certificación GIA.',
      tags: ['esmeralda', 'colombiana', 'muzo', 'talla esmeralda', 'certificada', 'premium'],
      destacada: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      codigo: 'ESM-SUELTA-002',
      nombre: 'Esmeralda Colombiana de Chivor Talla Oval',
      descripcion: 'Magnífica esmeralda de la mina de Chivor (Colombia) con talla oval. Presenta un color verde azulado característico de esta mina, excelente claridad y tratamiento mínimo. Certificada por CGL.',
      quilates: 3.12,
      corte: 'OVAL',
      origen: 'COLOMBIA_CHIVOR',
      calidad: 'ALTA',
      color: 'Verde azulado',
      claridad: 'SI',
      tratamiento: 'Mínimo (aceite)',
      indiceRefraccion: '1.57-1.58',
      dimensiones: {
        largo: '11mm',
        ancho: '9mm',
        profundidad: '6mm'
      },
      certificadoNumero: 'CGL-7845231',
      entidadCertificadora: 'CGL',
      certificadoURL: 'https://example.com/certificates/cgl-7845231.pdf',
      precio: 18500.00,
      precioTotal: 18500.00,
      disponible: true,
      imagenesPrincipales: [
        'https://example.com/images/esmeralda-chivor-1.jpg',
        'https://example.com/images/esmeralda-chivor-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/esmeralda-chivor-detalle-1.jpg',
        'https://example.com/images/esmeralda-chivor-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/esmeralda-chivor.mp4',
      slug: 'esmeralda-colombiana-chivor-talla-oval',
      metaTitle: 'Esmeralda Colombiana de Chivor Talla Oval | ARE Trust',
      metaDescription: 'Excepcional esmeralda de 3.12ct de la mina de Chivor con talla oval, color verde azulado característico y certificación CGL.',
      tags: ['esmeralda', 'colombiana', 'chivor', 'talla oval', 'certificada', 'alta calidad'],
      destacada: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      codigo: 'ESM-SUELTA-003',
      nombre: 'Esmeralda Colombiana de Coscuez Talla Pera',
      descripcion: 'Hermosa esmeralda de la mina de Coscuez (Colombia) con talla pera. Presenta un color verde vibrante, buena claridad y tratamiento moderado. Certificada por AGL.',
      quilates: 1.87,
      corte: 'PERA',
      origen: 'COLOMBIA_COSCUEZ',
      calidad: 'ALTA',
      color: 'Verde vibrante',
      claridad: 'SI-I',
      tratamiento: 'Moderado (aceite)',
      indiceRefraccion: '1.57-1.58',
      dimensiones: {
        largo: '10mm',
        ancho: '7mm',
        profundidad: '4mm'
      },
      certificadoNumero: 'AGL-5621478',
      entidadCertificadora: 'AGL',
      certificadoURL: 'https://example.com/certificates/agl-5621478.pdf',
      precio: 9800.00,
      precioTotal: 9800.00,
      disponible: true,
      imagenesPrincipales: [
        'https://example.com/images/esmeralda-coscuez-1.jpg',
        'https://example.com/images/esmeralda-coscuez-2.jpg'
      ],
      imagenesDetalle: [
        'https://example.com/images/esmeralda-coscuez-detalle-1.jpg',
        'https://example.com/images/esmeralda-coscuez-detalle-2.jpg'
      ],
      video: 'https://example.com/videos/esmeralda-coscuez.mp4',
      slug: 'esmeralda-colombiana-coscuez-talla-pera',
      metaTitle: 'Esmeralda Colombiana de Coscuez Talla Pera | ARE Trust',
      metaDescription: 'Hermosa esmeralda de 1.87ct de la mina de Coscuez con talla pera, color verde vibrante y certificación AGL.',
      tags: ['esmeralda', 'colombiana', 'coscuez', 'talla pera', 'certificada', 'alta calidad'],
      destacada: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
  
  console.log(`⏳ Insertando ${esmeraldas.length} esmeraldas de ejemplo...`);
  
  // Insertar esmeraldas en la base de datos
  for (const esmeralda of esmeraldas) {
    await prisma.esmeralda.create({
      data: esmeralda
    });
  }
  
  console.log(`✓ ${esmeraldas.length} esmeraldas insertadas`);
}

// Ejecutar la función principal y cerrar la conexión al finalizar
main()
  .catch((e) => {
    console.error('❌ Error en el proceso de seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Cerrar la conexión de Prisma al finalizar
    await prisma.$disconnect();
    console.log('🔌 Conexión a la base de datos cerrada');
  }); 