import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        sellerId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Error fetching user products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        details: error.message
      },
      { status: 500 }
    );
  }
} 