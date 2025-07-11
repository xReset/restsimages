import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const { message } = await request.json();
  const logPath = path.join(process.cwd(), 'website.log');
  const logEntry = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logPath, logEntry);
  return NextResponse.json({ success: true });
} 