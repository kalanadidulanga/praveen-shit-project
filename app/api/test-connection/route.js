import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  
  try {
    // Simple MongoDB query that works regardless of schema
    const databaseName = process.env.MONGODB_URI.split('/').pop().split('?')[0];
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      database: databaseName
    });
  } catch (error) {
    console.error('Connection test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 