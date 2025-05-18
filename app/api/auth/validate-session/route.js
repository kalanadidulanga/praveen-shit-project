import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ valid: false });
    }

    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        id: true
      }
    });

    return NextResponse.json({ 
      valid: !!user 
    });
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ valid: false });
  }
} 