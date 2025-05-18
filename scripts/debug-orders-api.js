// Debug script for the orders API
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugOrdersApi() {
  console.log('🔍 Starting debug for orders API');
  
  try {
    // 1. Get all listings to verify they exist
    const listings = await prisma.listing.findMany({
      select: {
        id: true,
        title: true,
        userId: true,
        user: {
          select: {
            name: true,
            userType: true
          }
        }
      }
    });
    
    console.log(`📋 Found ${listings.length} listings in the database:`);
    listings.forEach(listing => {
      console.log(`  - ID: ${listing.id}`);
      console.log(`    Title: ${listing.title}`);
      console.log(`    Owner: ${listing.user.name} (${listing.user.userType})`);
      console.log('');
    });
    
    if (listings.length === 0) {
      console.log('❌ No listings found in the database. Creating a test listing...');
      
      // Find a collector user
      const collector = await prisma.user.findFirst({
        where: { userType: 'COLLECTOR' }
      });
      
      if (!collector) {
        console.log('❌ No collector user found. Cannot create test listing.');
        return;
      }
      
      // Create a test listing
      const newListing = await prisma.listing.create({
        data: {
          userId: collector.id,
          title: "Test Plastic Waste Collection",
          description: "Debug test listing for plastic waste collection",
          wasteType: "Mixed",
          quantity: 100.0,
          price: 45.0,
          location: "Test Location",
          isActive: true
        }
      });
      
      console.log(`✅ Created test listing: ${newListing.title} (${newListing.id})`);
      listings.push(newListing);
    }
    
    // 2. Get all orders to check if they're associated with listings
    const orders = await prisma.order.findMany({
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            userId: true
          }
        },
        buyer: {
          select: {
            id: true,
            name: true,
            userType: true
          }
        }
      }
    });
    
    console.log(`\n📊 Found ${orders.length} orders in the database:`);
    orders.forEach(order => {
      console.log(`  - Order ID: ${order.id}`);
      console.log(`    Buyer: ${order.buyer.name} (${order.buyer.userType})`);
      console.log(`    Listing: ${order.listing ? order.listing.title : 'NULL'} (${order.listingId})`);
      console.log(`    Quantity: ${order.quantity}`);
      console.log(`    Total Price: $${order.totalPrice}`);
      console.log(`    Status: ${order.status}`);
      console.log('');
    });
    
    // 3. Test creating an order with the first listing
    if (listings.length > 0) {
      const testListing = listings[0];
      console.log(`\n🧪 Testing order creation with listing: ${testListing.title} (${testListing.id})`);
      
      // Find a business user
      const business = await prisma.user.findFirst({
        where: { userType: 'BUSINESS' }
      });
      
      if (!business) {
        console.log('❌ No business user found for testing.');
        return;
      }
      
      // Create a test order
      const testOrder = await prisma.order.create({
        data: {
          listingId: testListing.id,
          buyerId: business.id,
          quantity: 10.0,
          totalPrice: testListing.price * 10.0,
          status: "PENDING"
        },
        include: {
          listing: {
            select: {
              title: true,
              userId: true
            }
          },
          buyer: {
            select: {
              name: true,
              userType: true
            }
          }
        }
      });
      
      console.log(`\n✅ Test order created successfully:`);
      console.log(`  - Order ID: ${testOrder.id}`);
      console.log(`  - Buyer: ${testOrder.buyer.name} (${testOrder.buyer.userType})`);
      console.log(`  - Listing: ${testOrder.listing.title} (${testOrder.listingId})`);
      console.log(`  - Listing Owner ID: ${testOrder.listing.userId}`);
      console.log(`  - Quantity: ${testOrder.quantity}`);
      console.log(`  - Total Price: $${testOrder.totalPrice}`);
      console.log(`  - Status: ${testOrder.status}`);
      
      // 4. Verify the order is visible to the collector
      const collectorListings = await prisma.listing.findMany({
        where: {
          userId: testOrder.listing.userId
        },
        select: {
          id: true
        }
      });
      
      const listingIds = collectorListings.map(l => l.id);
      
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
      
      console.log(`\n📊 Found ${collectorOrders.length} orders for the collector:`);
      
      // Check if our new order is in the results
      const foundNewOrder = collectorOrders.some(o => o.id === testOrder.id);
      
      if (foundNewOrder) {
        console.log('✅ SUCCESS: The new test order was found in the collector\'s orders!');
      } else {
        console.log('❌ FAILURE: The new test order was NOT found in the collector\'s orders!');
      }
    }
    
    console.log('\n✅ Debug completed');
  } catch (error) {
    console.error('❌ Error during debug:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugOrdersApi();
