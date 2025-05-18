import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      authenticated: !!session,
      session,
      env: {
        nextAuthUrl: process.env.NEXTAUTH_URL,
        // Mask sensitive information
        dbUrl: process.env.MONGODB_URI ? 
          process.env.MONGODB_URI.replace(/\/\/(.+?):(.+?)@/, '//***:***@') : 
          null,
      }
    });
  } catch (error) {
    console.error('Auth status error:', error);
    return NextResponse.json({
      authenticated: false,
      error: error.message,
    }, { status: 500 });
  }
} 