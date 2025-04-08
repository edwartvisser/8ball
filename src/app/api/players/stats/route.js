// src/app/api/players/stats/route.js
import { NextResponse } from 'next/server';
import { getPlayerStats } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('playerId');
    
    if (!playerId) {
      return NextResponse.json(
        { error: 'PlayerId is required' },
        { status: 400 }
      );
    }
    
    const stats = await getPlayerStats(playerId);
    
    return NextResponse.json(stats);
    
  } catch (error) {
    console.error('Error retrieving player stats:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve player stats' },
      { status: 500 }
    );
  }
}