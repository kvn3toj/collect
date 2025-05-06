// Test connection script for Supabase
import postgres from 'postgres';
import dotenv from 'dotenv';
import { writeFileSync } from 'fs';

// Load environment variables
dotenv.config();

// Try different AWS regions
const AWS_REGIONS = [
  'us-east-1',
  'us-west-1',
  'eu-west-1',
  'ap-southeast-1',
  'sa-east-1',
  'ap-south-1'
];

// Try different connection formats
function getConnectionFormats() {
  const formats = [];
  
  // Project ID from the database connection strings
  const projectId = 'vzjysbwsqmiqljpwpjvt';
  const password = 'Dios-Es_Mi_Guia';
  
  // Test each region
  for (const region of AWS_REGIONS) {
    // Format 1: Using the postgres.PROJECT_ID format (recommended for Supavisor)
    formats.push({
      name: `Formato Supavisor (postgres.projectId) - Región ${region}`,
      url: `postgresql://postgres.${projectId}:${password}@aws-0-${region}.pooler.supabase.com:6543/postgres?sslmode=no-verify`
    });
    
    // Format 2: Direct connection (non-pooled)
    formats.push({
      name: `Conexión directa - Región ${region}`,
      url: `postgresql://postgres.${projectId}:${password}@aws-0-${region}.pooler.supabase.com:5432/postgres?sslmode=no-verify`
    });
  }
  
  return formats;
}

// Function to test a connection URL
async function testConnection(connectionConfig) {
  console.log(`\n\nProbando conexión: ${connectionConfig.name}`);
  console.log(`URL (enmascarada): ${connectionConfig.url.replace(/:[^:]*@/, ':****@')}`);
  
  try {
    // Create connection with postgres client
    const sql = postgres(connectionConfig.url, { 
      ssl: { rejectUnauthorized: false },
      connect_timeout: 10,
      idle_timeout: 3
    });
    
    // Execute simple query
    console.log('Ejecutando consulta...');
    const result = await sql`SELECT current_timestamp, current_database()`;
    
    console.log('✅ Conexión exitosa!');
    console.log('Resultado:', result[0]);
    
    // Close connection
    await sql.end();
    return true;
  } catch (error) {
    console.error('❌ Error de conexión:');
    console.error('   Mensaje:', error.message);
    if (error.code) console.error('   Código:', error.code);
    return false;
  }
}

// Update .env file with correct connection format
function updateEnvFile(correctUrl) {
  try {
    const envContent = `DATABASE_URL="${correctUrl}"
DIRECT_URL="${correctUrl.replace(':6543', ':5432')}"`;
    
    console.log('\n\nActualizando archivo .env con las URLs correctas...');
    writeFileSync('.env', envContent);
    console.log('✅ Archivo .env actualizado correctamente.');
  } catch (error) {
    console.error('❌ Error al actualizar el archivo .env:', error.message);
  }
}

// Main function
async function main() {
  console.log('='.repeat(80));
  console.log(' DIAGNÓSTICO DE CONEXIÓN A SUPABASE');
  console.log('='.repeat(80));
  
  let successfulUrl = null;
  const connectionFormats = getConnectionFormats();

  // Test each connection format
  for (const config of connectionFormats) {
    const success = await testConnection(config);
    if (success) {
      successfulUrl = config.url;
      console.log('\n✅ Encontrado un formato de conexión funcional. Deteniendo pruebas...');
      break;
    }
  }
  
  // If we found a working connection, update the .env file
  if (successfulUrl) {
    updateEnvFile(successfulUrl);
    
    console.log('\n\n' + '='.repeat(80));
    console.log(' PRÓXIMOS PASOS');
    console.log('='.repeat(80));
    console.log('1. Ejecuta "npx prisma validate" para verificar que el schema es válido');
    console.log('2. Ejecuta "npx prisma generate" para generar el cliente Prisma');
    console.log('3. Ejecuta "npx prisma db pull" para obtener el schema de la base de datos');
    console.log('='.repeat(80));
  } else {
    console.log('\n\n' + '='.repeat(80));
    console.log(' NO SE PUDO CONECTAR CON NINGÚN FORMATO');
    console.log('='.repeat(80));
    console.log('Recomendaciones:');
    console.log('1. Verifica que el ID del proyecto sea correcto (vzjysbwsqmiqljpwpjvt)');
    console.log('2. Verifica que la contraseña sea correcta');
    console.log('3. Revisa si el proyecto de Supabase está activo (no pausado/eliminado)');
    console.log('4. Revisa si necesitas comprar el add-on de IPv4 ($4/mes) si estás en una red sin soporte IPv6');
    console.log('5. Contacta al soporte de Supabase para verificar si hay problemas con tu proyecto');
    console.log('='.repeat(80));
  }
}

main().catch(console.error); 