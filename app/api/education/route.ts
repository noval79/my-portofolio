import connectDB from '@/lib/mongodb';
import Education from '@/models/education';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Education.find({});
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
    const created = await Education.create({ nama, tahun, deskripsi, gambar });
    return NextResponse.json(created);
  } catch (error: any) {
    return NextResponse.json({ message: "POST failed", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectDB();
  await Education.findByIdAndDelete(id);
  return NextResponse.json({ message: "Education deleted" });
}
