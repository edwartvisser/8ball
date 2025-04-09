// src/app/api/players/rankings/route.js
import { NextResponse } from 'next/server';
import { getPlayerRankings, executeQuery } from '@/lib/database';

export async function GET(request) {
  try {
    // Get the base player rankings
    const rankings = await getPlayerRankings();
    
    // Process each player to add the streak information
    const enhancedRankings = await Promise.all(rankings.map(async (player, index) => {
      // Get the player's recent matches to calculate their streak
      const recentMatches = await executeQuery({
        query: `
          SELECT 
            m.winner_id = ? as won
          FROM matches m
          WHERE m.player1_id = ? OR m.player2_id = ?
          ORDER BY m.match_date DESC
          LIMIT 10
        `,
        values: [player.id, player.id, player.id]
      });
      
      // Calculate the streak
      let currentStreak = 0;
      for (let match of recentMatches) {
        if (match.won === 1 && currentStreak >= 0) {
          currentStreak++;
        } else if (match.won === 0 && currentStreak <= 0) {
          currentStreak--;
        } else {
          break;
        }
      }
      
      return {
        ...player,
        rank: index + 1, // Ranking position based on sorting
        streak: currentStreak,
        winPercentage: player.win_percentage || 0,
      };
    }));
    
    return NextResponse.json(enhancedRankings);
    
  } catch (error) {
    console.error('Error retrieving player rankings:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve player rankings' },
      { status: 500 }
    );
  }
}