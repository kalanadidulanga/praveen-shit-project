import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import prisma from "@/lib/prisma";

// Get all products with pagination and sorting
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const db = await getDb();
    
    // Build query
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Get products
    const products = await db.collection('Product')
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'User',
            localField: 'sellerId',
            foreignField: '_id',
            as: 'sellerInfo'
          }
        },
        { $unwind: '$sellerInfo' },
        {
          $project: {
            _id: 1,
            name: 1,
            price: 1,
            category: 1,
            description: 1,
            image: 1,
            inStock: 1,
            isNew: 1,
            discount: 1,
            quantity: 1,
            unit: 1,
            plasticType: 1,
            rewardPoints: 1,
            seller: {
              name: '$sellerInfo.name',
              id: '$sellerInfo._id',
              userType: '$sellerInfo.userType'
            }
          }
        }
      ]).toArray();

    // Convert ObjectId to string
    const formattedProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      seller: {
        ...product.seller,
        id: product.seller.id.toString()
      },
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString()
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// Create new product
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication and role
    if (!session || !session.user || 
        !(session.user.userType?.toUpperCase() === 'INDIVIDUAL' || 
          session.user.userType?.toUpperCase() === 'COLLECTOR')) {
      return NextResponse.json(
        { error: 'Unauthorized - Only individuals and collectors can create products' }, 
        { status: 403 }
      );
    }

    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'category', 'description', 'image', 'quantity', 'plasticType'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create product with proper data structure matching Prisma schema
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
        image: data.image,
        sellerId: session.user.id,
        quantity: parseInt(data.quantity),
        unit: data.unit || "kg",
        plasticType: data.plasticType,
        inStock: true,
        isNew: true,
        discount: parseInt(data.discount) || 0,
        rewardPoints: parseInt(data.rewardPoints) || 0
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create product',
        details: error.message
      },
      { status: 500 }
    );
  }
} 