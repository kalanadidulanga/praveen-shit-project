require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createTestUser() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Extract database name
    const dbName = uri.split('/').pop().split('?')[0];
    const db = client.db(dbName);
    
    // Check if User collection exists
    const collections = await db.listCollections({ name: 'User' }).toArray();
    if (collections.length === 0) {
      console.log('Creating User collection');
      await db.createCollection('User');
    }
    
    const usersCollection = db.collection('User');
    
    // Check if the test user already exists
    const existingUser = await usersCollection.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }
    
    // Create a test user
    const passwordHash = await bcrypt.hash('password123', 10);
    
    const result = await usersCollection.insertOne({
      name: 'Test User',
      email: 'test@example.com',
      password: passwordHash,
      userType: 'INDIVIDUAL',
      profileImage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      points: 0,
      phoneNumber: null,
      address: null,
      district: null,
      isVerified: false
    });
    
    console.log(`Test user created with ID: ${result.insertedId}`);
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

createTestUser(); 