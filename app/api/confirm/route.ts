import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Missing orderId' },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db('driveToday');
    const ordersCollection = db.collection('orders');

    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: 'confirmed' } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error confirming order:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  } finally {
    await client.close();
  }
}
