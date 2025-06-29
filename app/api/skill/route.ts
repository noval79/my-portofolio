import connectDB from '@/lib/mongodb';
import Skill from '@/models/skill';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Skill.find({});
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, deskripsi, gambar } = body;

    if (!nama || !deskripsi) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    await connectDB();
    const created = await Skill.create({ nama, deskripsi, gambar });
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
    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Skill deleted' });
  } catch (error: any) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: 'DELETE failed', error: error.message }, { status: 500 });
  }
}
