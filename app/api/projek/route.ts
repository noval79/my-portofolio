import connectDB from '@/lib/mongodb';
import Projek from '@/models/projek';
import { NextResponse } from 'next/server';

// GET: Ambil semua data projek
export async function GET() {
  await connectDB();
  const data = await Projek.find({});
  return NextResponse.json(data);
}

// POST: Tambah data projek
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, deskripsi, gambar, link } = body as {
      nama?: string;
      deskripsi?: string;
      gambar?: string;
      link?: string;
    };

    if (!nama || !deskripsi || !gambar || !link) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    await connectDB();
    const created = await Projek.create({ nama, deskripsi, gambar, link });
    return NextResponse.json(created);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("POST Error:", error);
      return NextResponse.json({ message: "POST failed", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "POST failed", error: "Unknown error" }, { status: 500 });
  }
}

// DELETE: Hapus projek berdasarkan ID
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body as { id?: string };

    if (!id) {
      return NextResponse.json({ message: "ID diperlukan" }, { status: 400 });
    }

    await connectDB();
    await Projek.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Projek deleted' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'DELETE failed', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'DELETE failed', error: 'Unknown error' }, { status: 500 });
  }
}
