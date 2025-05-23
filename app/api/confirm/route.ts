import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ordersFile = path.join(process.cwd(), 'public', 'data', 'orders.json');

export async function POST(req: Request) {
  try {
    const updatedOrder = await req.json();
    const { vin, email } = updatedOrder;

    const fileData = await fs.readFile(ordersFile, 'utf-8');
    const orders = JSON.parse(fileData);

    const index = orders.findIndex(
      (order: any) => order.vin === vin && order.email === email
    );

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    orders[index] = { ...orders[index], status: 'confirmed' };

    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error confirming order:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
