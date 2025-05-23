import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ordersFile = path.join(process.cwd(), 'public', 'data', 'orders.json');

export async function POST(req: Request) {
  try {
    const newOrder = await req.json();

    const fileData = await fs.readFile(ordersFile, 'utf-8');
    const orders = JSON.parse(fileData);

    orders.push(newOrder);
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
