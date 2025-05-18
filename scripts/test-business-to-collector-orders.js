// Test script to create a business order and verify it shows up for the collector
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testBusinessToCollectorOrders() {
  console.log('🧪 Starting test for business-to-collector orders');
  
  try {
    // 1. Get a business user
    const business = await prisma.user.findFirst({
      where: {
        userType: 'BUSINESS'
      }
    });
    
    if (!business) {
      console.log('❌ No business user found in the database');
      return;
    }
    
    console.log(`👤 Found business user: ${business.name} (${business.id})`);
    
    // 2. Get a collector user
    const collector = await prisma.user.findFirst({
      where: {
        userType: 'COLLECTOR'
      }
    });
    
    if (!collector) {
      console.log('❌ No collector user found in the database');
      return;
    }
    
    console.log(`👤 Found collector user: ${collector.name} (${collector.id})`);
    
    // 3. Get a listing owned by the collector
    const listing = await prisma.listing.findFirst({
      where: {
        userId: collector.id
      }
    });
    
    if (!listing) {
      console.log('❌ No listing found for the collector');
      // Create a listing for the collector if none exists
      console.log('📝 Creating a new listing for the collector...');
      const newListing = await prisma.listing.create({
        data: {
          userId: collector.id,
          title: "Test Plastic Waste Collection",
          description: "Test listing for plastic waste collection",
          wasteType: "Mixed",
          quantity: 100.0,
          price: 45.0,
          location: "Test Location",
          isActive: true
        }
      });
      console.log(`✅ Created new listing: ${newListing.title} (${newListing.id})`);
      listing = newListing;
    } else {
      console.log(`📋 Found listing: ${listing.title} (${listing.id})`);
    }
    
    // 4. Create a test order from the business to the collector's listing
    console.log('📝 Creating a test order from business to collector...');
    const order = await prisma.order.create({
      data: {
        buyerId: business.id,
        listingId: listing.id,
        quantity: 25.0,
        totalPrice: listing.price * 25.0,
        status: "PENDING"
      },
      include: {
        buyer: {
          select: {
            name: true,
            userType: true
          }
        },
        listing: {
          select: {
            title: true,
            userId: true
          }
        }
      }
    });
    
    console.log(`✅ Created order: ${order.id}`);
    console.log(`👤 Buyer: ${order.buyer.name} (${order.buyer.userType})`);
    console.log(`📦 Listing: ${order.listing.title} owned by ${order.listing.userId}`);
    
    // 5. Verify the order can be retrieved for the collector
    console.log('\n🔍 Verifying order retrieval for collector...');
    
    // Get all listings for the collector
    const collectorListings = await prisma.listing.findMany({
      where: {
        userId: collector.id
      },
      select: {
        id: true
      }
    });
    
    const listingIds = collectorListings.map(l => l.id);
    console.log(`📋 Collector has ${listingIds.length} listings: ${JSON.stringify(listingIds)}`);
    
    // Get orders for these listings
    const collectorOrders = await prisma.order.findMany({
      where: {
        listingId: {
          in: listingIds
        }
      },
      include: {
        buyer: {
          select: {
            name: true,
            userType: true
          }
        },
        listing: {
          select: {
            title: true
          }
        }
      }
    });
    
    console.log(`📊 Found ${collectorOrders.length} orders for collector listings`);
    
    if (collectorOrders.length > 0) {
      console.log('\n📝 Order details:');
      collectorOrders.forEach(order => {
        console.log(`\n  Order ID: ${order.id}`);
        console.log(`  Buyer: ${order.buyer.name} (${order.buyer.userType})`);
        console.log(`  Listing: ${order.listing.title}`);
        console.log(`  Quantity: ${order.quantity}`);
        console.log(`  Total Price: $${order.totalPrice}`);
        console.log(`  Status: ${order.status}`);
        console.log(`  Created: ${order.createdAt}`);
      });
      
      // Check if our new order is in the results
      const foundNewOrder = collectorOrders.some(o => o.id === order.id);
      if (foundNewOrder) {
        console.log('\n✅ SUCCESS: The new business order was found in the collector\'s orders!');
      } else {
        console.log('\n❌ FAILURE: The new business order was NOT found in the collector\'s orders!');
      }
    } else {
      console.log('❌ No orders found for the collector\'s listings');
    }
    
    console.log('\n✅ Test completed');
  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testBusinessToCollectorOrders();
