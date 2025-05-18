const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  try {
    // Clear existing data
    await prisma.review.deleteMany();
    await prisma.order.deleteMany();
    await prisma.listing.deleteMany();
    await prisma.collection.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    console.log('Cleared existing data');

    // Create users with different roles
    const users = await Promise.all([
      // Individual User
      prisma.user.create({
        data: {
          name: "John Doe",
          email: "john@example.com",
          password: await bcrypt.hash("password123", 10),
          userType: "INDIVIDUAL",
          points: 100,
          phoneNumber: "+94771234567",
          address: "123 Green Street",
          district: "Colombo",
          isVerified: true
        }
      }),
      // Community User
      prisma.user.create({
        data: {
          name: "Green Community",
          email: "community@green.com",
          password: await bcrypt.hash("password123", 10),
          userType: "COMMUNITY",
          points: 500,
          phoneNumber: "+94777654321",
          address: "45 Eco Park Road",
          district: "Gampaha",
          isVerified: true
        }
      }),
      // Business User
      prisma.user.create({
        data: {
          name: "EcoRecycle Business",
          email: "business@eco.com",
          password: await bcrypt.hash("password123", 10),
          userType: "BUSINESS",
          points: 1000,
          phoneNumber: "+94712345678",
          address: "78 Industrial Zone",
          district: "Kalutara",
          isVerified: true
        }
      }),
      // Collector User
      prisma.user.create({
        data: {
          name: "Waste Collectors Ltd",
          email: "collector@eco.com",
          password: await bcrypt.hash("password123", 10),
          userType: "COLLECTOR",
          points: 750,
          phoneNumber: "+94765432109",
          address: "90 Collection Center",
          district: "Galle",
          isVerified: true
        }
      })
    ]);

    console.log(`Created ${users.length} users`);

    // Create collections
    const collections = await Promise.all([
      prisma.collection.create({
        data: {
          userId: users[0].id,
          type: "PICKUP",
          date: new Date(Date.now() + 86400000), // Tomorrow
          status: "SCHEDULED",
          address: "123 Green Street, Colombo",
          wasteType: "PET Bottles",
          quantity: 5.5,
          notes: "Please collect before noon"
        }
      }),
      prisma.collection.create({
        data: {
          userId: users[1].id,
          type: "DROPOFF",
          date: new Date(Date.now() + 172800000), // Day after tomorrow
          status: "SCHEDULED",
          address: "45 Eco Park Road, Gampaha",
          wasteType: "Mixed Plastics",
          quantity: 10.0,
          notes: "Community cleanup collection"
        }
      })
    ]);

    console.log(`Created ${collections.length} collections`);

    // Create listings
    const listings = await Promise.all([
      prisma.listing.create({
        data: {
          userId: users[2].id,
          title: "Bulk PET Bottles",
          description: "Clean PET bottles available for recycling",
          wasteType: "PET",
          quantity: 100.0,
          price: 50.0,
          location: "Kalutara Industrial Zone",
          isActive: true
        }
      }),
      prisma.listing.create({
        data: {
          userId: users[3].id,
          title: "Mixed Plastic Waste",
          description: "Assorted plastic waste for recycling",
          wasteType: "Mixed",
          quantity: 75.0,
          price: 35.0,
          location: "Galle Collection Center",
          isActive: true
        }
      })
    ]);

    console.log(`Created ${listings.length} listings`);

    // Create products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: "Recycled PET Flakes",
          price: 75.0,
          category: "Raw Materials",
          description: "High-quality recycled PET flakes",
          image: "https://images.unsplash.com/photo-1605600659925-0ef719419d41",
          sellerId: users[2].id,
          rating: 4.5,
          reviews: 12,
          inStock: true,
          isNew: true,
          discount: 0,
          quantity: 1000,
          unit: "kg",
          plasticType: "PET",
          rewardPoints: 50
        }
      }),
      prisma.product.create({
        data: {
          name: "Recycled HDPE Granules",
          price: 65.0,
          category: "Raw Materials",
          description: "Processed HDPE granules for manufacturing",
          image: "https://images.unsplash.com/photo-1584263347416-85a696b4eda7",
          sellerId: users[2].id,
          rating: 4.3,
          reviews: 8,
          inStock: true,
          isNew: false,
          discount: 5,
          quantity: 800,
          unit: "kg",
          plasticType: "HDPE",
          rewardPoints: 40
        }
      })
    ]);

    console.log(`Created ${products.length} products`);

    // Create orders with different statuses
    const orderStatuses = ['PENDING', 'ACCEPTED', 'PAID', 'DELIVERED', 'COMPLETED', 'CANCELLED'];
    const orderData = [];
    
    // Create 10 orders with different combinations
    for (let i = 0; i < 10; i++) {
      const buyerIndex = i % 2; // Alternate between first two users
      const listingIndex = i % listings.length;
      const status = orderStatuses[i % orderStatuses.length];
      const quantity = Math.floor(Math.random() * 50) + 5; // Random quantity between 5-55
      const price = listings[listingIndex].price;
      
      orderData.push({
        listingId: listings[listingIndex].id,
        buyerId: users[buyerIndex].id,
        quantity: quantity,
        totalPrice: price * quantity,
        status: status,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within last 30 days
      });
    }
    
    // Create the orders in the database
    const orders = await Promise.all(
      orderData.map(data => prisma.order.create({ data }))
    );

    console.log(`Created ${orders.length} orders`);

    // Create reviews
    const reviews = await Promise.all([
      prisma.review.create({
        data: {
          orderId: orders[0].id,
          userId: users[1].id,
          rating: 4,
          comment: "Good quality materials and prompt delivery"
        }
      })
    ]);

    console.log(`Created ${reviews.length} reviews`);

  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  }); 