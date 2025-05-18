require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function testConnection() {
  try {
    console.log('Testing MongoDB connection with Prisma...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    // Extract database name
    const dbName = process.env.MONGODB_URI.split('/').pop().split('?')[0];
    console.log('Database name:', dbName);
    
    // Try to count users
    const userCount = await prisma.user.count();
    console.log('Connection successful!');
    console.log('User count:', userCount);
    
    return true;
  } catch (error) {
    console.error('Connection error:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 