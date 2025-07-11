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
      console.error('Upload failed: Unauthorized password');
      return NextResponse.json({ error: 'Unauthorized: Incorrect password.' }, { status: 401 });
    }

    let uploadFile: File | null = file;
    let filename = '';

    if (!uploadFile && url) {
      // Download the file from the URL
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Upload failed: Could not fetch file from URL', url, res.status, res.statusText);
        return NextResponse.json({ error: `Failed to fetch file from URL. Status: ${res.status} ${res.statusText}` }, { status: 400 });
      }
      const arrayBuffer = await res.arrayBuffer();
      const urlParts = url.split('/');
      filename = urlParts[urlParts.length - 1];
      uploadFile = new File([arrayBuffer], filename);
    }

    if (!uploadFile) {
      console.error('Upload failed: No file provided');
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    filename = filename || uploadFile.name;

    try {
      const { url: blobUrl } = await put(`media/${filename}`, uploadFile, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        allowOverwrite: true,
      });
      return NextResponse.json({ success: true, url: blobUrl });
    } catch (putErr: any) {
      console.error('Upload failed: Error saving to Vercel Blob', putErr);
      return NextResponse.json({ error: 'Failed to save file to Vercel Blob: ' + (putErr.message || putErr.toString()) }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Upload failed: Unknown error', err);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 