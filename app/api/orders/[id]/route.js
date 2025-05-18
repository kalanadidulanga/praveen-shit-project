import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`Fetching order details for ${params.id}`);

    const order = await prisma.order.findUnique({
      where: {
        id: params.id
      },
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
      }
    });

    if (!order) {
      console.log(`Order not found: ${params.id}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // For collectors, allow access to any order
    if (session.user.userType?.toUpperCase() !== 'COLLECTOR' && 
        order.buyerId !== session.user.id) {
      return NextResponse.json({ 
        error: "You don't have permission to view this order" 
      }, { status: 403 });
    }

    console.log(`Returning order details for ${params.id}`);
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    console.log(`📥 PATCH /api/orders/${params.id} - Request received`);
    
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log(`❌ PATCH /api/orders/${params.id} - Unauthorized access attempt`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    console.log(`📦 Update data:`, data);

    // Validate the order exists
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        listing: {
          select: {
            userId: true
          }
        }
      }
    });

    if (!order) {
      console.log(`❌ Order not found: ${params.id}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check authorization based on user type
    if (session.user.userType?.toUpperCase() === 'COLLECTOR') {
      // Collectors can update any order status - remove the restriction
      console.log(`✅ Collector ${session.user.id} updating order ${params.id}`);
    } 
    // For buyers, they should be the buyer of the order
    else if ((session.user.userType === 'INDIVIDUAL' || 
         session.user.userType === 'BUSINESS' || 
         session.user.userType === 'COMMUNITY') && 
        order.buyerId !== session.user.id) {
      console.log(`❌ Unauthorized: User ${session.user.id} is not the buyer of this order`);
      return NextResponse.json({ error: "You are not authorized to update this order" }, { status: 403 });
    }

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: {
        id: params.id
      },
      data: {
        status: data.status,
        // Add any other fields you want to update
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
            phoneNumber: true
          }
        }
      }
    });

    console.log(`✅ Order updated successfully: ${updatedOrder.id}`);
    console.log(`📊 New status: ${updatedOrder.status}`);

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
