import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Biodata from '@/models/biodata';

// GET all biodata
export async function GET() {
  await connectDB();
  const data = await Biodata.find({});
  return NextResponse.json(data);
}

// POST: Tambah atau update biodata (jika hanya 1 yang boleh ada)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const existing = await Biodata.findOne(); // hanya 1 data
    if (existing) {
      const updated = await Biodata.findByIdAndUpdate(existing._id, body, { new: true });
      return NextResponse.json(updated);
    }

    const created = await Biodata.create(body);
    return NextResponse.json(created);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("POST Error:", error);
      return NextResponse.json({ message: "POST failed", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "POST failed", error: "Unknown error" }, { status: 500 });
  }
}

// DELETE: Hapus satu biodata berdasarkan id
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = body as { id?: string };

    if (!id) {
      return NextResponse.json({ message: 'ID diperlukan' }, { status: 400 });
    }

    await Biodata.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Biodata dihapus' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'DELETE failed', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'DELETE failed', error: 'Unknown error' }, { status: 500 });
  }
}
