const { Pool } = require('pg');
require('dotenv').config();

async function testConnection(config, name) {
  console.log(`\nAttempting to connect using ${name}...`);
  const pool = new Pool(config);
  try {
    const client = await pool.connect();
    console.log(`${name} connection successful!`);
    const result = await client.query('SELECT NOW()');
    console.log(`Current time from database: ${result.rows[0].now}`);
    client.release();
  } catch (err) {
    console.error(`${name} connection failed:`, err.message);
    // console.error(err); // Uncomment for full error details
  } finally {
    await pool.end();
    console.log(`${name} pool ended.`);
  }
}

async function main() {
  // Hardcoded URLs for testing
  const hardcodedDirectUrl = 'postgresql://postgres:Dios-Es_Mi_Guia@db.vzjysbwsqmiqljpwpjvt.supabase.co:5432/postgres?schema=public&sslmode=require';
  const hardcodedPoolerUrl = 'postgresql://postgres.vzjysbwsqmiqljpwpjvt:Dios-Es_Mi_Guia@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&pool_timeout=0&sslmode=require';
  
  const directConfigHardcoded = { 
    connectionString: hardcodedDirectUrl, 
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000 // 10 seconds timeout
  };
  
  const poolerConfigHardcoded = { 
    connectionString: hardcodedPoolerUrl, 
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000 // 10 seconds timeout
  };

  // Test with direct connection first
  await testConnection(directConfigHardcoded, 'Direct Connection (Hardcoded)');
  
  // Then test with pooler connection
  await testConnection(poolerConfigHardcoded, 'Pooler Connection (Hardcoded)');
}

// Execute the main function
main().catch(err => {
  console.error('Error in main function:', err);
  process.exit(1);
}); 