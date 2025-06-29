import connectDB from '@/lib/mongodb';
import Experience from '@/models/experience';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Experience.find({});
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, tahun, deskripsi, gambar } = body;

    if (!nama || !tahun || !deskripsi || !gambar) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    await connectDB();
    const created = await Experience.create(body);
    return NextResponse.json(created);
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "POST failed", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await connectDB();
    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Experience deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: 'DELETE failed', error: error.message }, { status: 500 });
  }
}
