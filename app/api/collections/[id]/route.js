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

    const collection = await prisma.collection.findUnique({
      where: {
        id: params.id
      },
      include: {
        user: true
      }
    });

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }

    if (collection.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ collection });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Failed to fetch collection" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    
    const collection = await prisma.collection.update({
      where: {
        id: params.id,
        userId: session.user.id
      },
      data: data
    });

    return NextResponse.json({ collection });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Failed to update collection" },
      { status: 500 }
    );
  }
} 