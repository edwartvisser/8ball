"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '../../components/layout/AppLayout';
import { StatCard } from '../../components/ui/Card';
import { PlayerListItem } from '@/components/features/PlayerListItem';
import BottomNavigation from '@/components/layout/BottomNavigation';

import { usePlayer } from '@/context/PlayerContext';
import PlayerSelectionDropdown from '@/components/features/PlayerSelectionDropdown';

export default function Dashboard() {
  const { currentPlayer, setCurrentPlayer } = usePlayer();
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  
  // Stats state toevoegen
  const [stats, setStats] = useState({
    total: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    currentStreak: 0
  });

  const handlePlayerChange = (newPlayer: { name: string }) => {
    //console.log(`Selected ${newPlayer.name} as player 1 for new matches`);
    setCurrentPlayer(newPlayer); // Update the current player in the context
  };

  // Spelersstatistieken ophalen
  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (!currentPlayer?.id) return;
      
      try {
        setStatsLoading(true);
        const response = await fetch(`/api/players/stats?playerId=${currentPlayer.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch player stats');
        }
        
        const data = await response.json();
        setStats({
          total: data.total || 0,
          wins: data.wins || 0,
          losses: data.losses || 0,
          winRate: parseFloat(data.winRate) || 0,
          currentStreak: data.currentStreak || 0
        });
      } catch (error) {
        console.error('Error fetching player stats:', error);
        // Behoud de huidige stats bij fouten
      } finally {
        setStatsLoading(false);
      }
    };
    
    fetchPlayerStats();
  }, [currentPlayer?.id]);

  // retrieve recent matches from the current player
  useEffect(() => {
    const fetchRecentMatches = async () => {
      if (!currentPlayer?.id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/matches/recent?playerId=${currentPlayer.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recent matches');
        }

        const data = await response.json();
        setRecentMatches(data);
      } catch (error) {
        console.error('Error fetching recent matches:', error); 
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMatches();
  }, [currentPlayer?.id]);

  return (
    <AppLayout>
      <div className="px-5 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-black">8 Ball Tracker</h1>
            <p className="text-sm text-gray-500">Hello, {currentPlayer?.name || 'Select a player'}</p>
          </div>
          <PlayerSelectionDropdown onChange={handlePlayerChange} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {statsLoading ? (
            // Skeletten tijdens het laden
            <>
              <div className="bg-white rounded-xl p-3 shadow-sm animate-pulse">
                <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 w-full bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm animate-pulse">
                <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm animate-pulse">
                <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm animate-pulse">
                <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              </div>
            </>
          ) : (
            <>
              <StatCard 
              label="Win Rate" 
              value={`${stats.winRate}%`}
              progress={{ 
                value: stats.winRate, 
                gradient: true 
              }}
              />
              
              <StatCard 
              label="Current Streak" 
              value={stats.currentStreak > 0 ? `+${stats.currentStreak}` : stats.currentStreak}
              subtext={
                stats.currentStreak > 0 
                ? "🔥 Keep it up!" 
                : stats.currentStreak < 0 
                ? "💔 Time to bounce back!" 
                : ""
              }
              />
              
              <StatCard 
              label="Wins" 
              value={stats.wins}
              />
              
              <StatCard 
              label="Losses" 
              value={stats.losses}
              />
            </>
          )}
        </div>

        {/* Record New Match Button */}
        <Link 
          href="/newmatch" 
          className={`block w-full font-semibold py-3 px-4 rounded-lg mb-4 text-center ${
            currentPlayer?.id > 0 
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={(e) => {
            if (!(currentPlayer?.id > 0)) {
              e.preventDefault(); // Prevent navigation if player ID is not valid
            }
          }}
        >
          Record New Match
        </Link>

        {/* Match List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent Matches</h2>

          {loading ? (
            // Laadanimatie
            <div className="py-8 flex justify-center">
              Select a player
              {/* <div className="w-6 h-6 border-2 border-indigo-500 rounded-full animate-spin border-t-transparent"></div> */}
            </div>
          ) : recentMatches.length > 0 ? (
            // Lijst van wedstrijden
            recentMatches.map((match) => (
              console.log(match),
              <PlayerListItem
                key={match.id}
                initial={match.opponent_name?.charAt(0) || 'X'}
                name={match.opponent_name || 'Unknown'}
                avatarColor={match.color}
                stats={
                  <div className="flex items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${match.result === 'win' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {match.result === 'win' ? 'Win' : 'Loss'}
                    </span>
                  </div>
                }
                subtitle={match.when}
                onClick={() => console.log(`Clicked on ${match.opponent_name}`)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              />
            ))
          ) : (
            // Geen wedstrijden gevonden
            <div className="py-8 text-center text-gray-500">
              No recent matches found
            </div>
          )}

        </div>
      </div>

      <BottomNavigation />
    </AppLayout>
  );
}