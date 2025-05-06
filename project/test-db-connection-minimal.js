import pg from 'pg';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Extraer DATABASE_URL para el test
const DATABASE_URL = process.env.DATABASE_URL;

console.log('Verificando conexión a la base de datos...');
console.log('URL de conexión:', DATABASE_URL);

// Crear cliente con timeout para evitar esperar demasiado
const client = new pg.Client({
  connectionString: DATABASE_URL,
  connectionTimeoutMillis: 10000, // 10 segundos de timeout
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Conexión exitosa a la base de datos!');
    
    // Ejecutar una consulta simple para verificar
    const result = await client.query('SELECT current_database() as database, current_user as user');
    console.log('Información de la base de datos:');
    console.log(`- Base de datos: ${result.rows[0].database}`);
    console.log(`- Usuario conectado: ${result.rows[0].user}`);
    
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:');
    console.error(`- Mensaje: ${error.message}`);
    console.error(`- Código: ${error.code || 'N/A'}`);
    
    // Información adicional para errores específicos
    if (error.message.includes('Tenant or user not found')) {
      console.error('\nEl error "Tenant or user not found" generalmente indica:');
      console.error('1. El nombre de usuario en la URL de conexión es incorrecto');
      console.error('2. La contraseña en la URL de conexión es incorrecta');
      console.error('3. El proyecto Supabase podría estar pausado o eliminado');
      console.error('\nRecomendaciones:');
      console.error('- Verificar en el dashboard de Supabase que el proyecto está activo');
      console.error('- Confirmar el formato correcto del usuario en la URL: ¿postgres o postgres.tenant?');
      console.error('- Reestablecer la contraseña de la base de datos desde el dashboard de Supabase');
    }
  } finally {
    await client.end().catch(() => {});
  }
}

testConnection(); 