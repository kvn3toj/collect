const { Pool } = require('pg');
require('dotenv').config();

const TIMEOUT_MS = 15000; // 15 seconds timeout

// Test multiple connection configurations
async function testConnection(config, name) {
  console.log(`\n=============================================`);
  console.log(`Testing ${name}...`);
  console.log(`Connection string: ${config.connectionString}`);
  console.log(`=============================================`);
  
  const pool = new Pool({
    ...config,
    connectionTimeoutMillis: TIMEOUT_MS
  });
  
  try {
    console.log(`Attempting to connect...`);
    const client = await pool.connect();
    console.log(`✅ CONNECTION SUCCESSFUL!`);
    
    // Try to query
    console.log('Running test query...');
    const result = await client.query('SELECT current_timestamp, current_database(), version()');
    console.log(`Database time: ${result.rows[0].current_timestamp}`);
    console.log(`Database name: ${result.rows[0].current_database}`);
    console.log(`PostgreSQL version: ${result.rows[0].version}`);
    
    // Try to list schemas
    console.log('\nListing available schemas:');
    const schemas = await client.query(`
      SELECT schema_name FROM information_schema.schemata 
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
    `);
    schemas.rows.forEach(row => console.log(`- ${row.schema_name}`));
    
    client.release();
  } catch (err) {
    console.error(`❌ CONNECTION FAILED:`);
    console.error(`Error message: ${err.message}`);
    console.error(`Error code: ${err.code}`);
    if (err.code === 'ETIMEDOUT') {
      console.error('Connection timed out - possible network or firewall issue');
    } else if (err.code === 'ENOTFOUND') {
      console.error('Host not found - check hostname spelling');
    } else if (err.code === '28P01') {
      console.error('Authentication failed - check username/password');
    } else if (err.code === '3D000') {
      console.error('Database does not exist - check database name');
    }
  } finally {
    await pool.end();
    console.log(`Connection pool ended.`);
  }
}

async function main() {
  // Connection 1: Direct connection with full host domain
  const directConnection = { 
    connectionString: 'postgresql://postgres:Dios-Es_Mi_Guia@db.vzjysbwsqmiqljpwpjvt.supabase.co:5432/postgres?schema=public',
    ssl: { rejectUnauthorized: false }
  };
  
  // Connection 2: Pooler connection with project ref in username
  const poolerConnection = { 
    connectionString: 'postgresql://postgres.vzjysbwsqmiqljpwpjvt:Dios-Es_Mi_Guia@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    ssl: { rejectUnauthorized: false }
  };
  
  // Connection 3: Direct with explicit parameters (no connection string)
  const explicitParamsConnection = {
    connectionString: null,
    host: 'db.vzjysbwsqmiqljpwpjvt.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Dios-Es_Mi_Guia',
    ssl: { rejectUnauthorized: false }
  };
  
  // Connection 4: Direct with simple username (no project ref)
  const simpleUsernameConnection = {
    connectionString: 'postgresql://postgres:Dios-Es_Mi_Guia@db.vzjysbwsqmiqljpwpjvt.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
  };
  
  // Connection 5: Pooler with different region
  const usEastPoolerConnection = {
    connectionString: 'postgresql://postgres.vzjysbwsqmiqljpwpjvt:Dios-Es_Mi_Guia@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
    ssl: { rejectUnauthorized: false }
  };

  // Run all tests sequentially
  await testConnection(directConnection, 'Direct Connection (Full URL)');
  await testConnection(poolerConnection, 'Pooler Connection (SA East Region)');
  await testConnection(explicitParamsConnection, 'Explicit Parameters (No Connection String)');
  await testConnection(simpleUsernameConnection, 'Simple Username (Direct)');
  await testConnection(usEastPoolerConnection, 'US East Pooler Connection');
  
  console.log('\n\n==== TESTING COMPLETE ====');
}

// Execute main function
main().catch(err => {
  console.error('Main execution error:', err);
  process.exit(1);
}); 