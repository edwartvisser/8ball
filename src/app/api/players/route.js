// src/app/api/players/route.js
import { NextResponse } from 'next/server';
import { getPlayers, getPlayerById, getPlayerStats } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('id');
    
    if (playerId) {
      // Get a specific player with their stats
      const player = await getPlayerById(playerId);
      
      if (!player || player.length === 0) {
        return NextResponse.json(
          { error: 'Player not found' },
          { status: 404 }
        );
      }
      
      const stats = await getPlayerStats(playerId);
      
      return NextResponse.json({
        ...player[0],
        ...stats
      });
    } else {
      // Get all players
      const players = await getPlayers();
      return NextResponse.json(players);
    }
    
  } catch (error) {
    console.error('Error retrieving players:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve players' },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new player
export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;
    
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Import dynamically to avoid circular dependencies
    const { executeQuery } = await import('@/lib/database');
    
    const result = await executeQuery({
      query: 'INSERT INTO players (name) VALUES (?)',
      values: [name]
    });
    
    return NextResponse.json({
      id: result.insertId,
      name
    });
    
  } catch (error) {
    console.error('Error creating player:', error);
    
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
}