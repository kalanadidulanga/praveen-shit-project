const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    console.log('🗑️  Clearing database...');
    
    // Delete all data
    await prisma.review.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.listing.deleteMany({});
    await prisma.collection.deleteMany({});
    await prisma.user.deleteMany({});
    
    console.log('✅ Database cleared successfully');
    
    console.log('🌱 Running seed script...');
    execSync('npm run seed', { stdio: 'inherit' });
    
    console.log('🎉 Database reset and seed completed successfully!');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase(); 