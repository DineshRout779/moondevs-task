import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectDB from '@/configs/connectDB';
import jwt from 'jsonwebtoken';

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody: RequestBody = await request.json();
    const { username, password } = reqBody;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { _id: savedUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      token,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
