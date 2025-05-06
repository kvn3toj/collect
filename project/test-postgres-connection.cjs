const postgres = require('postgres')
const dotenv = require('dotenv')

// Cargar variables de entorno
dotenv.config()

const connectionString = process.env.DATABASE_URL
console.log('Intentando conectar a:', connectionString.replace(/:([^:@]+)@/, ':****@')) // Ocultar contraseña en el log

async function testConnection() {
  try {
    const sql = postgres(connectionString, {
      idle_timeout: 20,
      max_lifetime: 60 * 30
    })

    // Intentar una consulta simple
    const result = await sql`SELECT current_timestamp`
    console.log('Conexión exitosa! Timestamp:', result[0].current_timestamp)
    
    // Cerrar la conexión
    await sql.end()
  } catch (error) {
    console.error('Error de conexión:', error.message)
    if (error.code) {
      console.error('Código de error:', error.code)
    }
    process.exit(1)
  }
}

testConnection() 