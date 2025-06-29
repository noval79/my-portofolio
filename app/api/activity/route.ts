import connectDB from '@/lib/mongodb';
import Activity from '@/models/activity';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Activity.find({});
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
    const created = await Activity.create({ nama, tahun, deskripsi, gambar });
    return NextResponse.json(created);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "POST failed", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "POST failed", error: "Unknown error" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID tidak ditemukan" }, { status: 400 });
    }

    await connectDB();
    await Activity.findByIdAndDelete(id);

    return NextResponse.json({ message: "Activity deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "DELETE failed", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "DELETE failed", error: "Unknown error" }, { status: 500 });
  }
}
