import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let password = '';
    let file: File | null = null;
    let url = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      password = formData.get('password') as string;
      file = formData.get('file') as File;
    } else if (contentType.includes('application/json')) {
      const body = await request.json();
      password = body.password;
      url = body.url;
    }

    if (password !== 'CreamyWeamy') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let uploadFile: File | null = file;
    let filename = '';

    if (!uploadFile && url) {
      // Download the file from the URL
      const res = await fetch(url);
      if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch file from URL' }, { status: 400 });
      }
      const arrayBuffer = await res.arrayBuffer();
      const urlParts = url.split('/');
      filename = urlParts[urlParts.length - 1];
      uploadFile = new File([arrayBuffer], filename);
    }

    if (!uploadFile) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    filename = filename || uploadFile.name;

    const { url: blobUrl } = await put(`media/${filename}`, uploadFile, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ success: true, url: blobUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 