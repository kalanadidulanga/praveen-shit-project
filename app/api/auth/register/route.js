import bcrypt from 'bcryptjs';
import { getDb } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Log connection info
    console.log('Registration API called');
    
    const body = await request.json();
    const { name, email, password, userType } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    try {
      // Get MongoDB connection
      const db = await getDb();
      const usersCollection = db.collection('User');
      
      // Check if user exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const result = await usersCollection.insertOne({
        name,
        email,
        password: hashedPassword,
        userType: userType || 'INDIVIDUAL',
        profileImage: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        points: 0,
        phoneNumber: null,
        address: null,
        district: null,
        isVerified: false
      });

      // Get the created user
      const user = await usersCollection.findOne({ _id: result.insertedId });
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      return NextResponse.json(
        { message: 'User created successfully', user: userWithoutPassword },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database error: ' + dbError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong: ' + error.message },
      { status: 500 }
    );
  }
} 