// app/api/article/route.ts

import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Article from '@/models/article';

export async function GET() {
  try {
    await connectMongo();
    const articles = await Article.find(); // misalnya ini data Mongo
    return NextResponse.json(articles);
  } catch (err) {
    console.error('[GET /api/articles] Error:', err);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
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
  } catch (err ) {
    return NextResponse.json({ error: err+'Failed to delete article' }, { status: 500 });
  }
}