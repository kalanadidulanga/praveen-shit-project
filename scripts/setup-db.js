require('dotenv').config();
const { MongoClient } = require('mongodb');

async function setup() {
  const uri = process.env.MONGODB_URI;
  
  // Extract the database name
  const uriParts = uri.split('/');
  const connectionPart = uriParts.slice(0, uriParts.length - 1).join('/');
  const dbPart = uriParts[uriParts.length - 1].split('?')[0];
  const queryPart = uriParts[uriParts.length - 1].includes('?') 
    ? '?' + uriParts[uriParts.length - 1].split('?')[1] 
    : '';
  
  console.log('Connection string parts:');
  console.log('- Connection:', connectionPart);
  console.log('- Database:', dbPart);
  console.log('- Query:', queryPart);
  
  // Connect without database specified first
  const adminUri = `${connectionPart}/${queryPart}`;
  const client = new MongoClient(adminUri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB server');
    
    // Create the database if it doesn't exist by using it
    const db = client.db(dbPart);
    
    // Create a collection to ensure the database exists
    await db.createCollection('users');
    console.log(`Database '${dbPart}' created or verified`);
    
    // List all databases to confirm
    const adminDb = client.db().admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('Available databases:');
    dbInfo.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

setup(); 