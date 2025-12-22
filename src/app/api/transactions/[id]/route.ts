// src/app/api/transactions/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';
import Item from '@/models/Item';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const transactionId = params.id;
    
    // หา Transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (transaction.status === 'COMPLETED') {
        return NextResponse.json({ error: 'Already completed' }, { status: 400 });
    }

    // อัปเดตสต็อกจริง
    const item = await Item.findById(transaction.itemId);
    if (item) {
        item.quantity += transaction.quantity;
        // ถ้าตอนแรกเป็น Category "รอตรวจสอบ" ให้เปลี่ยนกลับเป็น default หรือปล่อยไว้ให้ admin แก้ทีหลัง
        if (item.category === 'รอตรวจสอบ') item.category = 'ของบริจาคทั่วไป';
        await item.save();
    }

    // อัปเดตสถานะ Transaction
    transaction.status = 'COMPLETED';
    await transaction.save();

    return NextResponse.json({ message: 'Approved successfully' });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}