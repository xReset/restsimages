import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.lanyard.rest/v1/users/716965617231724571');
  const data = await res.json();
  console.log('Vercel Discord API response:', JSON.stringify(data));
  return NextResponse.json(data);
} 