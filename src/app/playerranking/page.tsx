// src/app/playerranking/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { TabNav } from '../../components/ui/Tabs';
import { RankingPlayerItem } from '../../components/features/PlayerListItem';
import BottomNavigation from '@/components/layout/BottomNavigation';

export default function PlayerRanking() {
  const router = useRouter();
  // State for filter tabs
  const [filter, setFilter] = useState('all');
  
  // Mock data for player rankings
  const players = [
    {
      id: '1',
      name: 'Jessica K.',
      initial: 'J',
      avatarColor: 'yellow',
      rank: 1,
      wins: 23,
      losses: 9,
      streak: 2,
      winPercentage: 71.9
    },
    {
      id: '2',
      name: 'Edwart V.',
      initial: 'Y',
      avatarColor: 'indigo',
      rank: 2,
      wins: 24,
      losses: 12,
      streak: 3,
      winPercentage: 66.7,
      isCurrentUser: true
    },
    {
      id: '3',
      name: 'Michael T.',
      initial: 'M',
      avatarColor: 'purple',
      rank: 3,
      wins: 17,
      losses: 11,
      streak: -1,
      winPercentage: 60.7
    },
    {
      id: '4',
      name: 'Sandra L.',
      initial: 'S',
      avatarColor: 'green',
      rank: 4,
      wins: 24,
      losses: 17,
      streak: 1,
      winPercentage: 58.5
    },
    {
      id: '5',
      name: 'Thomas W.',
      initial: 'T',
      avatarColor: 'blue',
      rank: 5,
      wins: 14,
      losses: 11,
      streak: 4,
      winPercentage: 56.0
    },
    {
      id: '6',
      name: 'David M.',
      initial: 'D',
      avatarColor: 'red',
      rank: 6,
      wins: 16,
      losses: 14,
      streak: -2,
      winPercentage: 53.3
    },
    {
      id: '7',
      name: 'Emily R.',
      initial: 'E',
      avatarColor: 'pink',
      rank: 7,
      wins: 11,
      losses: 11,
      streak: 0,
      winPercentage: 50.0
    },
    {
      id: '8',
      name: 'Robert J.',
      initial: 'R',
      avatarColor: 'orange',
      rank: 8,
      wins: 8,
      losses: 10,
      streak: -3,
      winPercentage: 44.4
    },
    {
      id: '9',
      name: 'Lisa P.',
      initial: 'L',
      avatarColor: 'blue',
      rank: 9,
      wins: 0,
      losses: 0,
      streak: 0,
      winPercentage: 0.0,
      played: false
    },
    {
      id: '10',
      name: 'Chris B.',
      initial: 'C',
      avatarColor: 'teal',
      rank: 10,
      wins: 0,
      losses: 0,
      streak: 0,
      winPercentage: 0.0,
      played: false
    }
  ];

  // Filter players based on selected tab
  const filteredPlayers = players.filter(player => {
    if (filter === 'all') return true;
    if (filter === 'played') return player.played !== false;
    if (filter === 'notplayed') return player.played === false;
    return true;
  });

  // Navigate to player profile
  const viewPlayerProfile = (playerId: string) => {
    router.push(`/playerprofile?id=${playerId}`);
  };

  // Get user's position
  const currentUser = players.find(p => p.isCurrentUser);
  const userPosition = currentUser ? currentUser.rank : null;

  return (
    <AppLayout>
      <div className="px-5 flex flex-col h-full">
        <PageHeader 
          title="Player Rankings" 
          backUrl="/dashboard" 
        />

        {/* Filter Tabs
        <TabNav
          options={[
            { id: 'all', label: 'All Players' },
            { id: 'played', label: 'Played' },
            { id: 'notplayed', label: 'Not Played' }
          ]}
          activeId={filter}
          onChange={setFilter}
          variant="contained"
          className="mb-4"
        /> */}

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
          <div className="space-y-2">
            {filteredPlayers.map(player => (
              <RankingPlayerItem 
                key={player.id}
                player={player}
                onClick={() => viewPlayerProfile(player.id)}
              />
            ))}
          </div>
        </div>

       
      </div>
      <BottomNavigation />
    </AppLayout>
  );
}