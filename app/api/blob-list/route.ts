import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'media/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ files: blobs });
  } catch (err: any) {
    console.error('Failed to list blobs:', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 