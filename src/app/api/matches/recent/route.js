// src/app/api/matches/recent/route.js
import { NextResponse } from 'next/server';
import { getRecentMatchesByPlayerId } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get('playerId');
    const limit = searchParams.get('limit') || 6;
    
    if (!playerId) {
      return NextResponse.json(
        { error: 'PlayerId is required' },
        { status: 400 }
      );
    }

    console.log(playerId, limit);
    
    const matches = await getRecentMatchesByPlayerId(playerId, Number(limit));
    
    // Bereken wanneer de wedstrijd was gespeeld (vandaag, gisteren, etc.)
    const enhancedMatches = matches.map(match => {
      const matchDate = new Date(match.match_date);
      const today = new Date();
      const diffDays = Math.floor((today - matchDate) / (1000 * 60 * 60 * 24));
      
      let when = '';
      if (diffDays === 0) {
        when = 'Today';
      } else if (diffDays === 1) {
        when = 'Yesterday';
      } else if (diffDays < 7) {
        when = `${diffDays} days ago`;
      } else {
        when = matchDate.toLocaleDateString();
      }
      
      // Genereer een willekeurige kleur voor de avatar (voor demo-doeleinden)
      // In een echte app zou je deze uit de database halen
      const colors = ['yellow', 'purple', 'green', 'red', 'blue', 'pink', 'orange', 'teal'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        ...match,
        when,
        color
      };
    });
    
    return NextResponse.json(enhancedMatches);
    
  } catch (error) {
    console.error('Error retrieving recent matches:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve recent matches' },
      { status: 500 }
    );
  }
}