import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const headers = request.headers;

    console.log('headers: ', headers);

    return NextResponse.json({
      message: 'User fetched successfully!',
      user: null,
    });
  } catch (error) {
    console.error('Error while fetching user:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
