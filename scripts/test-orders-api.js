// Test script to check the orders API endpoint
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testOrdersApi() {
  console.log('🧪 Starting API test for orders endpoint');
  
  try {
    // 1. Get a collector user for testing
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
    
    // 2. Get listings for this collector
    const listings = await prisma.listing.findMany({
      where: {
        userId: collector.id
      },
      select: {
        id: true,
        title: true
      }
    });
    
    console.log(`📋 Found ${listings.length} listings for collector`);
    listings.forEach(listing => {
      console.log(`  - ${listing.title} (${listing.id})`);
    });
    
    // 3. Get orders for these listings
    const listingIds = listings.map(listing => listing.id);
    
    const orders = await prisma.order.findMany({
      where: {
        listingId: {
          in: listingIds
        }
      },
      include: {
        listing: {
          select: {
            title: true,
            wasteType: true,
            price: true
          }
        },
        buyer: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    console.log(`\n📊 Found ${orders.length} orders for collector listings`);
    
    if (orders.length > 0) {
      console.log('\n📝 Order details:');
      orders.forEach(order => {
        console.log(`\n  Order ID: ${order.id}`);
        console.log(`  Buyer: ${order.buyer.name}`);
        console.log(`  Listing: ${order.listing.title}`);
        console.log(`  Quantity: ${order.quantity}`);
        console.log(`  Total Price: $${order.totalPrice}`);
        console.log(`  Status: ${order.status}`);
        console.log(`  Created: ${order.createdAt}`);
      });
    } else {
      console.log('⚠️ No orders found for this collector');
    }
    
    console.log('\n✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testOrdersApi();
