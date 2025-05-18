import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { calculatePoints, distributePoints } from "@/lib/points";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Different query based on user type
    let ordersQuery = {};
    
    if (session.user.userType?.toUpperCase() === 'COLLECTOR') {
      // For collectors, show all orders in the system
      // This simplifies order management for collectors
      ordersQuery = {
        include: {
          listing: {
            select: {
              id: true,
              title: true,
              wasteType: true,
              price: true,
              userId: true
            }
          },
          buyer: {
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
      };
    } else {
      // For regular users, get their own orders
      ordersQuery = {
        where: {
          buyerId: session.user.id,
        },
        include: {
          listing: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      };
    }

    const orders = await prisma.order.findMany(ordersQuery);
    
    console.log(`Found ${orders.length} orders for user ${session.user.id} (${session.user.userType})`);

    return NextResponse.json({ 
      success: true,
      orders 
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch orders",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log('📥 POST /api/orders - Request received');
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('❌ POST /api/orders - Unauthorized access attempt');
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    console.log(`👤 User ID: ${session.user.id}, User Type: ${session.user.userType}`);
    console.log(`📦 Order data: ${JSON.stringify(data)}`);
    
    // Handle both listingId and productId for backward compatibility
    const listingId = data.listingId || data.productId;
    console.log(`🔍 Looking for listing with ID: ${listingId}`);
    console.log(`🔍 Original request data: ${JSON.stringify(data)}`);
    
    // Check if the ID is valid MongoDB ObjectId
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(listingId);
    console.log(`🔍 Is valid ObjectId format: ${isValidObjectId}`);
    
    if (!isValidObjectId) {
      console.log(`❌ Invalid ObjectId format: ${listingId}`);
      return NextResponse.json({ error: "Invalid listing ID format" }, { status: 400 });
    }
    
    // Validate the listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, userId: true, title: true }
    });
    
    if (!listing) {
      console.log(`❌ Listing not found: ${listingId}`);
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
    
    console.log(`📋 Found listing: ${listing.title} (${listing.id}) owned by user ${listing.userId}`);
    
    // Create the order
    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        listingId: listing.id,
        quantity: parseFloat(data.quantity) || 0,
        totalPrice: parseFloat(data.totalPrice) || 0,
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

    // If the buyer is a business user, calculate and distribute points
    if (session.user.userType === 'BUSINESS') {
      try {
        console.log('🎯 Business order detected - calculating points');
        const points = calculatePoints(order.quantity);
        
        if (points > 0) {
          console.log(`💫 Distributing ${points} points to individual users`);
          await distributePoints(prisma, points);
        }
      } catch (error) {
        console.error('Error handling points distribution:', error);
        // Don't fail the order creation if points distribution fails
      }
    }

    console.log(`✅ Order created successfully: ${order.id}`);
    console.log(`👤 Buyer: ${order.buyer.name} (${order.buyer.userType})`);
    console.log(`📦 Listing: ${order.listing.title} owned by ${order.listing.userId}`);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
} 