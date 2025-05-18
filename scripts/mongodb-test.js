require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI;
  console.log('MongoDB URI:', uri);
  
  // Extract database name to verify it's present
  const uriParts = uri.split('/');
  const dbPart = uriParts[uriParts.length - 1].split('?')[0];
  console.log('Database name from URI:', dbPart);
  
  if (!dbPart) {
    console.error('ERROR: No database name found in connection string');
    return;
  }
  
  // Create a new MongoClient
  const client = new MongoClient(uri);
  
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    // List databases
    const adminDb = client.db().admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('Available databases:');
    dbInfo.databases.forEach(db => console.log(` - ${db.name}`));
    
    // Try to use the specific database
    const db = client.db(dbPart);
    const collections = await db.listCollections().toArray();
    console.log(`Collections in database '${dbPart}':`);
    collections.forEach(coll => console.log(` - ${coll.name}`));
    
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

main(); 