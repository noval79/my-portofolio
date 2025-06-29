import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('foto');

    if (!file || !(file instanceof File)) {
      console.error("❌ Tidak ada file yang dikirim atau file bukan tipe yang valid");
      return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'portofolio',
    });

    console.log("✅ Cloudinary result:", result);
    return NextResponse.json({ url: result.secure_url });
  } catch (err: unknown) {
    console.error("❌ ERROR DI /api/upload");

    if (err instanceof Error) {
      console.error("Nama:", err.name);
      console.error("Pesan:", err.message);
      console.error("Stack:", err.stack);
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Upload failed with unknown error' },
      { status: 500 }
    );
  }
}
