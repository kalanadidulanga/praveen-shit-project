import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    console.log('📥 GET /api/listings - Request received');
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const wasteType = searchParams.get('wasteType');
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    // Build filter conditions
    const where = {
      isActive: true,
    };
    
    if (wasteType) {
      where.wasteType = wasteType;
    }
    
    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      };
    }
    
    if (minPrice) {
      where.price = {
        ...where.price,
        gte: parseFloat(minPrice)
      };
    }
    
    if (maxPrice) {
      where.price = {
        ...where.price,
        lte: parseFloat(maxPrice)
      };
    }
    
    // Get listings
    const listings = await prisma.listing.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            address: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`📋 Found ${listings.length} listings`);
    
    return NextResponse.json({
      success: true,
      listings
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log('📥 POST /api/listings - Request received');
    const session = await getServerSession(authOptions);
    
    if (!session) {
      console.log('❌ POST /api/listings - Unauthorized access attempt');
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    console.log(`👤 User ID: ${session.user.id}, User Type: ${session.user.userType}`);
    console.log(`📦 Listing data: ${JSON.stringify(data)}`);
    
    // Create the listing
    const listing = await prisma.listing.create({
      data: {
        userId: session.user.id,
        title: data.title,
        description: data.description,
        wasteType: data.wasteType,
        quantity: parseFloat(data.quantity),
        price: parseFloat(data.price),
        location: data.location,
        isActive: true
      }
    });
    
    console.log(`✅ Listing created successfully: ${listing.id}`);
    
    return NextResponse.json({
      success: true,
      message: "Listing created successfully",
      listing
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
