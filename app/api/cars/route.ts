// app/api/cars/route.ts (Next.js 13 이상 app dir 기준)
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('driveToday');
    const cars = await db.collection('cars').find({}).toArray();

    return NextResponse.json(cars);
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
