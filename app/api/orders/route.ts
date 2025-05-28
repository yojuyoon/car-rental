import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('driveToday');
    const result = await db.collection('orders').insertOne(data);

    return NextResponse.json(
      { success: true, orderId: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
