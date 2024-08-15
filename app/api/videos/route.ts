import { getVideos } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const videos = await getVideos();
  return NextResponse.json(videos);
}

