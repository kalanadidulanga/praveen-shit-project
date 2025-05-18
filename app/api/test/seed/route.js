import { NextResponse } from "next/server";
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db = await getDb();
    
    // Create a test seller
    const seller = await db.collection('User').insertOne({
      name: "Test Seller",
      email: "seller@test.com",
      userType: "collector",
      createdAt: new Date()
    });

    // Create a test product
    const product = await db.collection('Product').insertOne({
      name: "Recycled Plastic Bottles",
      description: "High-quality recycled PET bottles",
      price: 100,
      category: "PET",
      image: "https://images.unsplash.com/photo-1571727153934-b9e0059b7ab2",
      rating: 4.5,
      reviews: 10,
      inStock: true,
      isNew: true,
      discount: 0,
      quantity: 100,
      unit: "kg",
      plasticType: "PET",
      rewardPoints: 50,
      sellerId: seller.insertedId,
      createdAt: new Date()
    });

    return NextResponse.json({ 
      message: "Test data seeded successfully",
      productId: product.insertedId 
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 