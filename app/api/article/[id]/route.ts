import connectDB from '@/lib/mongodb';
import Article from '@/models/article';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const articles = await Article.find({});
    return NextResponse.json(articles);
  } catch (err) {
    console.error('GET /api/article error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
