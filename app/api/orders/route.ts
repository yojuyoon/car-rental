import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const order = await req.json();
    const client = await clientPromise;
    const db = client.db('driveToday');
    const ordersCollection = db.collection('orders');
    const carsCollection = db.collection('cars');

    // 1. insert order
    const insertResult = await ordersCollection.insertOne(order);
    const orderId = insertResult.insertedId;

    // 2. update car availability
    const updateResult = await carsCollection.updateOne(
      { vin: order.vin },
      { $set: { available: false } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
