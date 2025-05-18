// Test script to check the collector dashboard API endpoint
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testCollectorDashboard() {
  console.log('🧪 Starting API test for collector dashboard');
  
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
    
    // 3. Get orders for these listings directly from the database
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
            email: true,
            userType: true
          }
        }
      }
    });
    
    console.log(`\n📊 Found ${orders.length} orders for collector listings`);
    
    if (orders.length > 0) {
      console.log('\n📝 Order details:');
      orders.forEach(order => {
        console.log(`\n  Order ID: ${order.id}`);
        console.log(`  Buyer: ${order.buyer.name} (${order.buyer.userType || 'Unknown type'})`);
        console.log(`  Listing: ${order.listing.title}`);
        console.log(`  Quantity: ${order.quantity}`);
        console.log(`  Total Price: $${order.totalPrice}`);
        console.log(`  Status: ${order.status}`);
        console.log(`  Created: ${order.createdAt}`);
      });
      
      // Group orders by buyer type
      const ordersByBuyerType = orders.reduce((acc, order) => {
        const buyerType = order.buyer.userType || 'UNKNOWN';
        if (!acc[buyerType]) {
          acc[buyerType] = [];
        }
        acc[buyerType].push(order);
        return acc;
      }, {});
      
      console.log('\n📊 Orders by buyer type:');
      for (const [type, typeOrders] of Object.entries(ordersByBuyerType)) {
        console.log(`  ${type}: ${typeOrders.length} orders`);
      }
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

testCollectorDashboard();
