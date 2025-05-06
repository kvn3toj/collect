const { PrismaClient } = require('@prisma/client');

async function testPrismaConnection(url, name) {
  console.log(`\n=======================================`);
  console.log(`Testing Prisma Connection: ${name}`);
  console.log(`URL: ${url}`);
  console.log(`=======================================`);

  // Create client with this specific URL
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('Attempting to connect...');
    
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT current_database(), current_timestamp`;
    console.log('✅ CONNECTION SUCCESSFUL!');
    console.log(`Database: ${result[0].current_database}`);
    console.log(`Timestamp: ${result[0].current_timestamp}`);
    
    // Try to test a simple model query if using the existing schema
    try {
      console.log('\nAttempting to query a model...');
      // This assumes there's a User model in your schema
      // If not, this part will fail but the connection test is still valid
      const users = await prisma.user.findMany({ take: 1 });
      console.log(`Found ${users.length} users`);
      if (users.length > 0) {
        console.log('First user id:', users[0].id);
      }
    } catch (modelErr) {
      console.log('Could not query user model:', modelErr.message);
    }
    
  } catch (err) {
    console.error('❌ CONNECTION FAILED');
    console.error(`Error message: ${err.message}`);
    // If it's a Prisma-specific error, log additional details
    if (err.code) {
      console.error(`Prisma error code: ${err.code}`);
    }
    if (err.meta) {
      console.error('Error metadata:', err.meta);
    }
  } finally {
    await prisma.$disconnect();
    console.log('Prisma client disconnected');
  }
}

async function main() {
  // Test with different connection strings
  const urls = [
    // 1. Direct connection (port 5432)
    {
      url: 'postgresql://postgres:Dios-Es_Mi_Guia@db.vzjysbwsqmiqljpwpjvt.supabase.co:5432/postgres?schema=public&sslmode=require',
      name: 'Direct Connection (5432)'
    },
    
    // 2. Connection pooler (port 6543)
    {
      url: 'postgresql://postgres.vzjysbwsqmiqljpwpjvt:Dios-Es_Mi_Guia@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&pool_timeout=0&sslmode=require',
      name: 'Connection Pooler (SA East)'
    },
    
    // 3. Try US East region
    {
      url: 'postgresql://postgres.vzjysbwsqmiqljpwpjvt:Dios-Es_Mi_Guia@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require',
      name: 'Connection Pooler (US East)'
    },
    
    // 4. Direct connection with simple username (no project ref in username)
    {
      url: 'postgresql://postgres:Dios-Es_Mi_Guia@db.vzjysbwsqmiqljpwpjvt.supabase.co:5432/postgres?schema=public&sslmode=require',
      name: 'Direct Connection (Simple Username)'
    }
  ];
  
  // Test each URL
  for (const { url, name } of urls) {
    await testPrismaConnection(url, name);
  }
  
  console.log('\n==== TESTING COMPLETE ====');
}

// Run the tests
main()
  .catch(error => {
    console.error('Error in main function:', error);
    process.exit(1);
  }); 