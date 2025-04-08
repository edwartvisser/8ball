// src/app/api/matches/route.js
import { NextResponse } from 'next/server';
import { createMatch } from '@/lib/database';

export async function POST(request) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Extract match data
    // const { player1Id, player2Id, winnerId } = body;
    const player1Id = body.player1_id;
    const player2Id = body.player2_id;
    const winnerId = body.winner_id;
    
    // Validate required fields
    if (!player1Id || !player2Id || !winnerId) {
      return NextResponse.json(
        { error: 'Missing required fields: player1Id, player2Id, winnerId' },
        { status: 400 }
      );
    }
    
    // Validate that winnerId is either player1Id or player2Id
    if (winnerId !== player1Id && winnerId !== player2Id) {
      return NextResponse.json(
        { error: 'Winner must be one of the players' },
        { status: 400 }
      );
    }
    
    // Create the match in the database
    const result = await createMatch(player1Id, player2Id, winnerId);
    
    // Return success response
    return NextResponse.json({ 
      message: 'Match recorded successfully',
      matchId: result.insertId 
    });
    
  } catch (error) {
    console.error('Error saving match:', error);
    
    return NextResponse.json(
      { error: 'Failed to save match' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve match history
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('playerId');
    
    let matches;
    if (playerId) {
      // If playerId is provided, get matches for specific player
      const { getMatchesByPlayerId } = await import('@/lib/database');
      matches = await getMatchesByPlayerId(playerId);
    } else {
      // Otherwise get all matches
      const { executeQuery } = await import('@/lib/database');
      matches = await executeQuery({
        query: `
          SELECT m.*, 
                 p1.name as player1_name, 
                 p2.name as player2_name,
                 w.name as winner_name
          FROM matches m
          JOIN players p1 ON m.player1_id = p1.id
          JOIN players p2 ON m.player2_id = p2.id
          JOIN players w ON m.winner_id = w.id
          ORDER BY m.match_date DESC
          LIMIT 50
        `
      });
    }
    
    return NextResponse.json(matches);
    
  } catch (error) {
    console.error('Error retrieving matches:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve matches' },
      { status: 500 }
    );
  }
}