import connectDB from '@/lib/mongodb';
import Projek from '@/models/projek';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Projek.find({});
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const created = await Projek.create(body);
    return NextResponse.json(created);
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "POST failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await connectDB();
    await Projek.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Projek deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: 'DELETE failed', error: error.message }, { status: 500 });
  }
}
