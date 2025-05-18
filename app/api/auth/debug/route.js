import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Test database connection
    const userCount = await prisma.user.count();
    
    return NextResponse.json({
      databaseConnected: true,
      userCount,
      session,
      env: {
        nextAuthUrl: process.env.NEXTAUTH_URL,
        databaseUrl: process.env.MONGODB_URI ? 
          process.env.MONGODB_URI.replace(/\/\/(.+?):(.+?)@/, '//***:***@') : 
          null,
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
} 