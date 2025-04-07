// src/app/matchhistory/page.tsx
'use client';

import { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card, StatCard } from '../../components/ui/Card';
import { TabNav } from '../../components/ui/Tabs';
import { Avatar } from '../../components/ui/Avatar';
import { BottomNavigation } from '../../components/layout/BottomNavigation';

export default function MatchHistory() {
  // State for tab filter
  const [filter, setFilter] = useState('all');
  
  // Mock data
  const matchStats = {
    total: 12,
    wins: 7,
    losses: 5
  };

  // Match history data grouped by date
  const matchHistory = [
    {
      date: 'Today',
      time: '3:45 PM',
      matches: [
        { 
          id: '1', 
          opponentName: 'Jessica K.', 
          opponentInitial: 'J', 
          opponentColor: 'yellow', 
          result: 'win' as const, 
          score: '1-0',
          time: '3:45 PM'
        },
        { 
          id: '2', 
          opponentName: 'Michael T.', 
          opponentInitial: 'M', 
          opponentColor: 'purple', 
          result: 'win' as const, 
          score: '1-0',
          time: '2:20 PM'
        }
      ]
    },
    {
      date: 'Yesterday',
      time: '7:30 PM',
      matches: [
        { 
          id: '3', 
          opponentName: 'Sandra L.', 
          opponentInitial: 'S', 
          opponentColor: 'green', 
          result: 'loss' as const, 
          score: '0-1',
          time: '7:30 PM'
        }
      ]
    },
    {
      date: '2 days ago',
      matches: [
        { 
          id: '4', 
          opponentName: 'David M.', 
          opponentInitial: 'D', 
          opponentColor: 'red', 
          result: 'win' as const, 
          score: '1-0'
        }
      ]
    },
    {
      date: '3 days ago',
      matches: [
        { 
          id: '5', 
          opponentName: 'Michael T.', 
          opponentInitial: 'M', 
          opponentColor: 'purple', 
          result: 'win' as const, 
          score: '1-0'
        },
        { 
          id: '6', 
          opponentName: 'Jessica K.', 
          opponentInitial: 'J', 
          opponentColor: 'yellow', 
          result: 'loss' as const, 
          score: '0-1'
        }
      ]
    }
  ];

  // Filter matches based on selected tab
  const filteredHistory = matchHistory.map(group => ({
    ...group,
    matches: group.matches.filter(match => {
      if (filter === 'all') return true;
      if (filter === 'wins') return match.result === 'win';
      if (filter === 'losses') return match.result === 'loss';
      return true;
    })
  })).filter(group => group.matches.length > 0);

  return (
    <AppLayout>
      <div className="px-5">
        <PageHeader 
          title="Match History" 
          backUrl="/dashboard" 
        />

        {/* Summary Stats */}
        <div className="mb-6">
          <div className="flex justify-between bg-white rounded-xl p-4 shadow-sm">
            <StatCard 
              label="Total Matches" 
              value={matchStats.total} 
              className="flex-1 border-0 shadow-none p-0"
            />
            <StatCard 
              label="Wins" 
              value={matchStats.wins} 
              className="flex-1 border-0 shadow-none p-0 text-green-600"
            />
            <StatCard 
              label="Losses" 
              value={matchStats.losses} 
              className="flex-1 border-0 shadow-none p-0 text-red-600"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <TabNav
          options={[
            { id: 'all', label: 'All Matches' },
            { id: 'wins', label: 'Wins' },
            { id: 'losses', label: 'Losses' }
          ]}
          activeId={filter}
          onChange={setFilter}
          variant="contained"
          className="mb-4"
        />

        {/* Match History List */}
        <div className="pb-20">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((group, index) => (
              <div key={`${group.date}-${index}`} className="mb-4">
                <div className="flex justify-between items-center mb-2 py-2 sticky top-0 z-10">
                  <h3 className="font-medium text-sm text-gray-500">{group.date}</h3>
                </div>
                
                <div className="space-y-3">
                  {group.matches.map(match => (
                    <MatchItem key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No matches found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </AppLayout>
  );
}

// Match item component
interface MatchItemProps {
  match: {
    id: string;
    opponentName: string;
    opponentInitial: string;
    opponentColor: string;
    result: 'win' | 'loss';
    score: string;
    time?: string;
  };
}

const MatchItem = ({ match }: MatchItemProps) => {
  return (
    <Card className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar initial="E" color="indigo" size="sm" className="mr-2" />
          <div className="font-medium text-sm">Edwart V.</div>
        </div>
        
        <div className="flex items-center">
          <div className={`font-bold text-lg mx-2 ${
            match.result === 'win' ? 'text-green-600' : 'text-red-600'
          }`}>
            {match.score}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="font-medium text-sm text-right">{match.opponentName}</div>
          <Avatar 
            initial={match.opponentInitial} 
            color={match.opponentColor} 
            size="sm" 
            className="ml-2" 
          />
        </div>
      </div>
    </Card>
  );
};