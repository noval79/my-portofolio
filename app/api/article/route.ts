// app/api/article/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Article from '@/models/article';

export async function GET() {
  await connectMongo();
  const articles = await Article.find();
  return NextResponse.json(articles);
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json();
  const newArticle = await Article.create(body);
  return NextResponse.json(newArticle);
}

// DELETE /api/article/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectMongo();

  try {
    await Article.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}