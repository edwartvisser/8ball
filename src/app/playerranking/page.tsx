// src/app/playerranking/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { TabNav } from '../../components/ui/Tabs';
import { RankingPlayerItem } from '../../components/features/PlayerListItem';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { usePlayer } from '@/context/PlayerContext';

export default function PlayerRanking() {
  const router = useRouter();
  const { currentPlayer } = usePlayer();
  
  // Verwijder de niet gebruikte filter state
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Ophalen van de spelerranglijsten
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/players/rankings');
        
        if (!response.ok) {
          throw new Error('Failed to fetch player rankings');
        }
        
        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error('Error fetching player rankings:', error);
        // Fallback naar een lege lijst
        setRankings([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRankings();
  }, []);

  // Gebruik alle spelers zonder filter
  const filteredPlayers = rankings;

  // Navigate to player profile
  const viewPlayerProfile = (playerId: string) => {
    router.push(`/playerprofile?id=${playerId}`);
  };

  return (
    <AppLayout>
      <div className="px-5 flex flex-col h-full">
        <PageHeader 
          title="Player Rankings" 
          backUrl="/dashboard" 
        />

        {/* Rankings Table Header */}
        <div className="mb-2">
          <div className="grid grid-cols-12 text-sm text-gray-500 font-medium pb-1">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Player</div>
            <div className="col-span-2 text-center">W/L</div>
            <div className="col-span-2 text-center">Streak</div>
            <div className="col-span-2 text-right">Win %</div>
          </div>
        </div>

        {/* Rankings List */}
        <div className="overflow-y-auto flex-1 pb-20">
          {loading ? (
            // Toon laad-indicators
            <div className="space-y-3">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-1">
                      <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="col-span-5">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPlayers.length > 0 ? (
            <div className="space-y-2">
              {filteredPlayers.map(player => (
                <RankingPlayerItem 
                  key={player.id}
                  player={{
                    id: player.id,
                    name: player.name,
                    initial: player.name.charAt(0),
                    rank: player.rank,
                    wins: player.wins,
                    losses: player.losses || (player.total_matches - player.wins),
                    streak: player.streak,
                    winPercentage: parseFloat(player.winPercentage || player.win_percentage).toFixed(1),
                    isCurrentUser: currentPlayer?.id === player.id
                  }}
                  onClick={() => viewPlayerProfile(player.id)}
                />
              ))}
            </div>
          ) : (
            // Toon bericht als er geen spelers zijn
            <div className="py-8 text-center text-gray-500">
              No players found
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </AppLayout>
  );
}