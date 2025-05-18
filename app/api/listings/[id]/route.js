import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    console.log(`📥 GET /api/listings/${params.id} - Request received`);
    
    // Get the listing
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
            userType: true
          }
        }
      }
    });
    
    if (!listing) {
      console.log(`❌ Listing not found: ${params.id}`);
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }
    
    console.log(`📋 Found listing: ${listing.title} (${listing.id})`);
    
    return NextResponse.json({
      success: true,
      listing
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    
    // Update the listing
    const listing = await prisma.listing.update({
      where: {
        id: params.id
      },
      data: {
        title: data.title,
        description: data.description,
        wasteType: data.wasteType,
        quantity: parseFloat(data.quantity),
        price: parseFloat(data.price),
        location: data.location,
        isActive: data.isActive
      }
    });
    
    return NextResponse.json({
      success: true,
      listing
    });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // Delete the listing
    await prisma.listing.delete({
      where: {
        id: params.id
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "Listing deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
