// src/app/api/players/rankings/route.js
import { NextResponse } from 'next/server';
import { getPlayerRankings } from '@/lib/database';

export async function GET(request) {
  try {
    const rankings = await getPlayerRankings();
    
    // Ranglijsten verrijken met extra gegevens voor de UI
    const enhancedRankings = rankings.map((player, index) => {
      // Bereken streak (in een echte app zou je dit uit de database halen)
      // Dit is een placeholder; in productie haal je de werkelijke streak op
      const randomStreak = Math.floor(Math.random() * 7) - 3;
      
      return {
        ...player,
        rank: index + 1, // Ranglijstpositie op basis van de sortering
        streak: randomStreak,
        winPercentage: player.win_percentage || 0,
        // Voeg andere velden toe die nodig zijn voor de UI
      };
    });
    
    return NextResponse.json(enhancedRankings);
    
  } catch (error) {
    console.error('Error retrieving player rankings:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve player rankings' },
      { status: 500 }
    );
  }
}