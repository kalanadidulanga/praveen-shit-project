const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
  console.log('Testing MongoDB connection...');
  
  // Capture original connection string
  const originalConnectionString = process.env.MONGODB_URI;
  console.log('Original connection string:', originalConnectionString);
  
  // Extract database name to verify it's present
  const parts = originalConnectionString.split('/');
  const dbPart = parts[parts.length - 1].split('?')[0];
  console.log('Database name from connection string:', dbPart);
  
  try {
    // Try to connect
    const client = new MongoClient(originalConnectionString);
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    // List available databases
    const dbList = await client.db().admin().listDatabases();
    console.log('Available databases:');
    dbList.databases.forEach(db => console.log(` - ${db.name}`));
    
    // Close connection
    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

main(); 