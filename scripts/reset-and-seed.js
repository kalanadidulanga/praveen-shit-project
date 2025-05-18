const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

async function resetAndSeed() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('plastic_management');
    
    console.log('Connected to database');
    
    // Clear existing collections
    await db.collection('products').deleteMany({});
    await db.collection('users').deleteMany({});
    
    console.log('Cleared existing data');

    // Create test users
    const users = [
      {
        _id: new ObjectId(),
        name: "EcoStore Business",
        email: "eco.store@example.com",
        userType: "business",
        isVerified: true
      },
      {
        _id: new ObjectId(),
        name: "Green Seller",
        email: "green.seller@example.com",
        userType: "seller",
        isVerified: true
      },
      {
        _id: new ObjectId(),
        name: "Sustainable Crafts",
        email: "sustainable.crafts@example.com",
        userType: "business",
        isVerified: true
      }
    ];

    const result = await db.collection('users').insertMany(users);
    console.log('Created users:', result.insertedCount);

    // Create products with more variety
    const products = [
      // Stationery Category
      {
        name: "Recycled Paper Notebook",
        price: 299,
        category: "stationery",
        description: "Eco-friendly notebook made from 100% recycled paper. Perfect for sustainable note-taking.",
        image: "https://images.unsplash.com/photo-1589203832113-de2c1f914c07?w=500&h=500&fit=crop",
        seller: users[0]._id,
        rating: 4.5,
        reviews: 12,
        inStock: true,
        isNew: true,
        discount: 0,
        createdAt: new Date()
      },
      {
        name: "Recycled Pencil Set",
        price: 150,
        category: "stationery",
        description: "Set of 12 pencils made from recycled newspaper and plastic.",
        image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500&h=500&fit=crop",
        seller: users[1]._id,
        rating: 4.3,
        reviews: 8,
        inStock: true,
        isNew: false,
        discount: 5,
        createdAt: new Date()
      },
      {
        name: "Eco File Folders",
        price: 199,
        category: "stationery",
        description: "Durable file folders made from recycled cardboard.",
        image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=500&fit=crop",
        seller: users[2]._id,
        rating: 4.0,
        reviews: 15,
        inStock: true,
        isNew: false,
        discount: 0,
        createdAt: new Date()
      },

      // Home & Living Category
      {
        name: "Recycled Plastic Plant Pot",
        price: 499,
        category: "home",
        description: "Beautiful plant pot made from recycled plastic. Helps plants and planet grow together.",
        image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=500&h=500&fit=crop",
        seller: users[0]._id,
        rating: 4.2,
        reviews: 18,
        inStock: true,
        isNew: false,
        discount: 10,
        createdAt: new Date()
      },
      {
        name: "Eco-Friendly Doormat",
        price: 899,
        category: "home",
        description: "Durable doormat made from recycled rubber tires.",
        image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500&h=500&fit=crop",
        seller: users[1]._id,
        rating: 4.7,
        reviews: 23,
        inStock: true,
        isNew: true,
        discount: 0,
        createdAt: new Date()
      },
      {
        name: "Recycled Glass Vase",
        price: 1299,
        category: "home",
        description: "Handcrafted vase made from recycled glass bottles.",
        image: "https://images.unsplash.com/photo-1602975301219-d2f9eb05a08c?w=500&h=500&fit=crop",
        seller: users[2]._id,
        rating: 4.8,
        reviews: 31,
        inStock: true,
        isNew: true,
        discount: 15,
        createdAt: new Date()
      },

      // Accessories Category
      {
        name: "Eco-Friendly Water Bottle",
        price: 799,
        category: "accessories",
        description: "Reusable water bottle made from recycled materials. Keeps drinks cold for 24 hours.",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
        seller: users[1]._id,
        rating: 4.8,
        reviews: 42,
        inStock: true,
        isNew: true,
        discount: 0,
        createdAt: new Date()
      },
      {
        name: "Recycled Plastic Sunglasses",
        price: 1499,
        category: "accessories",
        description: "Stylish sunglasses made from ocean-recovered plastic.",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        seller: users[0]._id,
        rating: 4.6,
        reviews: 27,
        inStock: true,
        isNew: true,
        discount: 10,
        createdAt: new Date()
      },
      {
        name: "Eco Tote Bag",
        price: 399,
        category: "accessories",
        description: "Durable shopping bag made from recycled PET bottles.",
        image: "https://images.unsplash.com/photo-1597873072045-28c7c6f6f4b0?w=500&h=500&fit=crop",
        seller: users[2]._id,
        rating: 4.4,
        reviews: 56,
        inStock: true,
        isNew: false,
        discount: 0,
        createdAt: new Date()
      },

      // Furniture Category
      {
        name: "Recycled Plastic Chair",
        price: 2999,
        category: "furniture",
        description: "Modern chair made from recycled ocean plastic.",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop",
        seller: users[0]._id,
        rating: 4.6,
        reviews: 15,
        inStock: true,
        isNew: false,
        discount: 15,
        createdAt: new Date()
      },
      {
        name: "Eco Coffee Table",
        price: 4999,
        category: "furniture",
        description: "Coffee table made from reclaimed wood and recycled metal.",
        image: "https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=500&h=500&fit=crop",
        seller: users[1]._id,
        rating: 4.9,
        reviews: 21,
        inStock: true,
        isNew: true,
        discount: 5,
        createdAt: new Date()
      },
      {
        name: "Recycled Bookshelf",
        price: 3499,
        category: "furniture",
        description: "Bookshelf crafted from recycled materials and sustainable wood.",
        image: "https://images.unsplash.com/photo-1588279102050-8fae5ddf9b07?w=500&h=500&fit=crop",
        seller: users[2]._id,
        rating: 4.7,
        reviews: 18,
        inStock: true,
        isNew: false,
        discount: 0,
        createdAt: new Date()
      },

      // Kitchen Category
      {
        name: "Recycled Kitchen Set",
        price: 1499,
        category: "kitchen",
        description: "Complete kitchen utensil set made from recycled materials.",
        image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&h=500&fit=crop",
        seller: users[0]._id,
        rating: 4.4,
        reviews: 19,
        inStock: true,
        isNew: true,
        discount: 5,
        createdAt: new Date()
      },
      {
        name: "Eco Food Containers",
        price: 899,
        category: "kitchen",
        description: "Set of 4 food containers made from recycled glass.",
        image: "https://images.unsplash.com/photo-1516847995948-c6523e129801?w=500&h=500&fit=crop",
        seller: users[1]._id,
        rating: 4.3,
        reviews: 25,
        inStock: true,
        isNew: false,
        discount: 0,
        createdAt: new Date()
      },
      {
        name: "Bamboo Cutting Board",
        price: 699,
        category: "kitchen",
        description: "Sustainable bamboo cutting board with recycled plastic elements.",
        image: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=500&h=500&fit=crop",
        seller: users[2]._id,
        rating: 4.5,
        reviews: 34,
        inStock: true,
        isNew: true,
        discount: 10,
        createdAt: new Date()
      }
    ];

    const productsResult = await db.collection('products').insertMany(products);
    console.log('Created products:', productsResult.insertedCount);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

resetAndSeed().catch(console.error); 