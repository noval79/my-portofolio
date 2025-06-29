import connectDB from '@/lib/mongodb';
import Experience from '@/models/experience';
import { NextResponse } from 'next/server';

// GET all experience data
export async function GET() {
  await connectDB();
  const data = await Experience.find({});
  return NextResponse.json(data);
}

// POST: Tambah data experience
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
    const created = await Experience.create({ nama, tahun, deskripsi, gambar });
    return NextResponse.json(created);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("POST Error:", error);
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
    await Experience.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Experience deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'DELETE failed', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'DELETE failed', error: 'Unknown error' }, { status: 500 });
  }
}
