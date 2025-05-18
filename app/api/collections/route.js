import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const collections = await prisma.collection.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        userId: true,
        type: true,
        date: true,
        status: true,
        address: true,
        wasteType: true,
        quantity: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
            email: true,
            userType: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true,
      collections 
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch collections",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    const { productId, ...collectionData } = data;
    
    const collection = await prisma.collection.create({
      data: {
        ...collectionData,
        userId: session.user.id,
        status: "SCHEDULED",
        type: data.type.toUpperCase()
      }
    });

    return NextResponse.json({ 
      success: true,
      collection 
    });
  } catch (error) {
    console.error('Error creating collection:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to create collection",
        details: error.message 
      },
      { status: 500 }
    );
  }
} 