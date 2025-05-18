import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return error for business users
    if (session.user.userType === 'BUSINESS') {
      return NextResponse.json(
        { error: "Points system not available for business accounts" },
        { status: 403 }
      );
    }

    const db = await getDb();
    const user = await db.collection("User").findOne({
      _id: new ObjectId(session.user.id)
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ points: user.points || 0 });
  } catch (error) {
    console.error("Error fetching user points:", error);
    return NextResponse.json(
      { error: "Failed to fetch points" },
      { status: 500 }
    );
  }
} 