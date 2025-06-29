import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Hapus cookie dengan overwrite dan maxAge = 0
  response.cookies.set('auth', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
