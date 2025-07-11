import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';

export async function POST(request: Request) {
  const { password, filename } = await request.json();
  if (password !== 'CreamyWeamy') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!filename) {
    return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
  }
  try {
    await del(`media/${filename}`, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 