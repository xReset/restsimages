import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const gifsDir = path.join(process.cwd(), 'public', 'gifs');
  const files = fs.readdirSync(gifsDir);
  const gifFiles = files.filter(file => /\.(gif|png|jpg|jpeg)$/i.test(file));
  return NextResponse.json(gifFiles);
} 