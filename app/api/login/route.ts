import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === '12345') {
    const response = NextResponse.json({ success: true });

    response.cookies.set('auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
