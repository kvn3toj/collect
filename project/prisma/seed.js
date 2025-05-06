const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  try {
    // Crear usuario de prueba
    console.log('Creating test user...');
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        supabaseUserId: 'test-supabase-user-id',
      },
    });
    console.log('Created test user with ID:', testUser.id);

    // Crear diseños de joyería
    console.log('Creating jewelry designs...');
    const designs = [
      {
        name: 'Anillo de Compromiso Clásico',
        description: 'Un elegante anillo de compromiso con diamante central',
        parameters: {
          type: 'ring',
          metal: 'white_gold',
          metalPurity: '18k',
          stone: 'diamond',
          stoneCut: 'brilliant',
          stoneCarat: 1.5,
          stoneClarity: 'VS1',
          stoneColor: 'D',
        },
        userId: testUser.id,
      },
      {
        name: 'Anillo de Esmeralda',
        description: 'Anillo con esmeralda colombiana de alta calidad',
        parameters: {
          type: 'ring',
          metal: 'yellow_gold',
          metalPurity: '18k',
          stone: 'emerald',
          stoneCut: 'emerald',
          stoneCarat: 2.0,
          stoneClarity: 'VS',
          stoneColor: 'Deep Green',
          origin: 'Colombia',
        },
        userId: testUser.id,
      },
      {
        name: 'Collar de Perlas',
        description: 'Collar de perlas cultivadas de agua dulce',
        parameters: {
          type: 'necklace',
          material: 'pearl',
          pearlType: 'freshwater',
          pearlSize: '8mm',
          pearlColor: 'White',
          pearlLuster: 'High',
          clasp: '14k_gold',
        },
        userId: testUser.id,
      }
    ];

    for (const designData of designs) {
      const design = await prisma.design.create({ data: designData });
      console.log('Created design:', design.name);
    }

    // Crear una consulta de prueba
    console.log('Creating test consultation...');
    const consultation = await prisma.consultation.create({
      data: {
        preferredDate: new Date('2024-04-01T10:00:00Z'),
        topic: 'Diseño de Anillo de Compromiso',
        notes: 'Interesado en un diseño personalizado con diamante central',
        userId: testUser.id,
        contactEmail: 'test@example.com',
        contactName: 'Usuario de Prueba',
        contactPhone: '+1234567890',
      },
    });
    console.log('Created consultation with ID:', consultation.id);

    // Crear un certificado de prueba
    console.log('Creating test certificate...');
    const certificate = await prisma.certificate.create({
      data: {
        certificateNumber: 'CERT-001',
        issuer: 'GIA',
        itemType: 'jewelry',
        itemDetails: {
          type: 'Anillo',
          material: 'Oro blanco 18k',
          stone: 'Diamante',
          carat: 1.5,
          cut: 'Brillante',
          clarity: 'VS1',
          color: 'D',
        },
        fileUrl: 'https://example.com/certificates/CERT-001.pdf',
        userId: testUser.id,
      },
    });
    console.log('Created certificate with ID:', certificate.id);

    console.log('Seeding finished successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('Error during seeding:', e);
  process.exit(1);
}); 