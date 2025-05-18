import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    
    // Test database connection
    const productsCount = await db.collection('products').countDocuments();
    const usersCount = await db.collection('users').countDocuments();
    
    return NextResponse.json({
      success: true,
      counts: {
        products: productsCount,
        users: usersCount
      },
      dbName: db.databaseName
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 