import { NextResponse } from "next/server";
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Return early if this is the create route
    if (id === 'create') {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    let productId;
    try {
      productId = new ObjectId(id);
    } catch (error) {
      console.error('Invalid ObjectId:', id);
      return NextResponse.json({ error: 'Invalid product ID format' }, { status: 400 });
    }

    const db = await getDb();
    const product = await db.collection('Product').findOne({ _id: productId });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get seller information if sellerId exists
    let seller = null;
    if (product.sellerId) {
      // Changed collection name from 'users' to 'User' to be consistent
      seller = await db.collection('User').findOne(
        { _id: new ObjectId(product.sellerId) },
        { projection: { name: 1, userType: 1 } }
      );
    }

    // Format the response
    const formattedProduct = {
      ...product,
      _id: product._id.toString(),
      sellerId: product.sellerId?.toString(),
      seller: seller ? {
        name: seller.name,
        id: seller._id.toString(),
        userType: seller.userType
      } : {
        name: 'Unknown Seller',
        id: null,
        userType: 'unknown'
      },
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString()
    };

    return NextResponse.json({ product: formattedProduct });
    
  } catch (error) {
    console.error('Error in GET product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productId = params.id;
    
    // Verify the product exists and belongs to the user
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.sellerId !== session.user.id) {
      return NextResponse.json({ error: "You can only delete your own products" }, { status: 403 });
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: productId }
    });

    return NextResponse.json({ 
      success: true,
      message: "Product deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to delete product",
        details: error.message 
      },
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

    const productId = params.id;
    const data = await request.json();
    
    // Verify the product exists and belongs to the user
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (existingProduct.sellerId !== session.user.id) {
      return NextResponse.json({ error: "You can only update your own products" }, { status: 403 });
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
        image: data.image,
        quantity: parseInt(data.quantity),
        unit: data.unit || "kg",
        plasticType: data.plasticType,
        discount: parseInt(data.discount) || 0,
        rewardPoints: parseInt(data.rewardPoints) || 0,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to update product",
        details: error.message 
      },
      { status: 500 }
    );
  }
} 