import connectDB from '@/lib/mongodb';
import Education from '@/models/education';
import { NextResponse } from 'next/server';

// GET all education data
export async function GET() {
  await connectDB();
  const data = await Education.find({});
  return NextResponse.json(data);
}

// POST: Tambah data education
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, tahun, deskripsi, gambar } = body as {
      nama?: string;
      tahun?: string;
      deskripsi?: string;
      gambar?: string;
    };

    if (!nama || !tahun || !deskripsi || !gambar) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    await connectDB();
    const created = await Education.create({ nama, tahun, deskripsi, gambar });
    return NextResponse.json(created);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "POST failed", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "POST failed", error: "Unknown error" }, { status: 500 });
  }
}

// DELETE: Hapus data berdasarkan ID
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body as { id?: string };

    if (!id) {
      return NextResponse.json({ message: "ID diperlukan" }, { status: 400 });
    }

    await connectDB();
    await Education.findByIdAndDelete(id);
    return NextResponse.json({ message: "Education deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "DELETE failed", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "DELETE failed", error: "Unknown error" }, { status: 500 });
  }
}
