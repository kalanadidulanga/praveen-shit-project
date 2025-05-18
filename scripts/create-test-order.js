// Script to create a test order in the database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTestOrder() {
  console.log('🧪 Starting to create test order');
  
  try {
    // 1. Find a collector user
    const collector = await prisma.user.findFirst({
      where: {
        userType: 'COLLECTOR'
      }
    });
    
    if (!collector) {
      console.log('❌ No collector user found in the database');
      return;
    }
    
    console.log(`👤 Found collector: ${collector.name} (${collector.id})`);
    
    // 2. Find a listing from this collector
    const listing = await prisma.listing.findFirst({
      where: {
        userId: collector.id
      }
    });
    
    if (!listing) {
      console.log('❌ No listing found for this collector');
      return;
    }
    
    console.log(`📦 Found listing: ${listing.title} (${listing.id})`);
    
    // 3. Find a buyer (non-collector user)
    const buyer = await prisma.user.findFirst({
      where: {
        userType: {
          not: 'COLLECTOR'
        }
      }
    });
    
    if (!buyer) {
      console.log('❌ No buyer user found in the database');
      return;
    }
    
    console.log(`👤 Found buyer: ${buyer.name} (${buyer.id})`);
    
    // 4. Create a test order
    const order = await prisma.order.create({
      data: {
        listingId: listing.id,
        buyerId: buyer.id,
        quantity: 10,
        totalPrice: listing.price * 10,
        status: 'PENDING'
      },
      include: {
        listing: true,
        buyer: true
      }
    });
    
    console.log('\n✅ Successfully created test order:');
    console.log(`  Order ID: ${order.id}`);
    console.log(`  Listing: ${order.listing.title}`);
    console.log(`  Buyer: ${order.buyer.name}`);
    console.log(`  Quantity: ${order.quantity}`);
    console.log(`  Total Price: $${order.totalPrice}`);
    console.log(`  Status: ${order.status}`);
    
  } catch (error) {
    console.error('❌ Error creating test order:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestOrder();
