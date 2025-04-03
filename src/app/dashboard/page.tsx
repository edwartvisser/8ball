"use client"
// src/app/dashboard/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '../../components/layout/AppLayout';
// import { TabNav } from '../../components/ui/Tabs';
import { StatCard } from '../../components/ui/Card';
import {PlayerListItem} from '@/components/features/PlayerListItem';
import BottomNavigation from '@/components/layout/BottomNavigation';

export default function Dashboard() {
  // For client-side state with tabs
  const [activeTab, setActiveTab] = useState('recent');
  
  // Mock data
  const userStats = {
    name: 'Edwart',
    winRate: 67,
    currentStreak: 3,
    wins: 24,
    losses: 12
  };

  // Recent matches data
  const recentMatches = [
    { id: 1, opponent: 'Jessica K.', initial: 'J', color: 'yellow', result: 'win', when: 'Today' },
    { id: 2, opponent: 'Michael T.', initial: 'M', color: 'purple', result: 'win', when: 'Today' },
    { id: 3, opponent: 'Sandra L.', initial: 'S', color: 'green', result: 'loss', when: 'Yesterday' },
    { id: 4, opponent: 'David M.', initial: 'D', color: 'red', result: 'win', when: '2 days ago' },
    { id: 5, opponent: 'Emily R.', initial: 'E', color: 'blue', result: 'loss', when: '3 days ago' },
    { id: 6, opponent: 'Chris P.', initial: 'C', color: 'orange', result: 'win', when: '4 days ago' },
    { id: 7, opponent: 'Laura H.', initial: 'L', color: 'pink', result: 'loss', when: '5 days ago' },
    { id: 8, opponent: 'Tom W.', initial: 'T', color: 'teal', result: 'win', when: '6 days ago' }
  ];

  return (
    <AppLayout>
      <div className="px-5 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-black">8 Ball Tracker</h1>
            <p className="text-sm text-gray-500">Hello, {userStats.name}</p>
          </div>
          <div className="bg-indigo-500 text-white flex items-center justify-center rounded-full w-9 h-9 font-semibold">
            {userStats.name.charAt(0)}
          </div>
        </div>


        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard 
            label="Win Rate" 
            value={`${userStats.winRate}%`}
            progress={{ 
              value: userStats.winRate, 
              gradient: true 
            }}
          />
          
          <StatCard 
            label="Current Streak" 
            value={`+${userStats.currentStreak}`}
            subtext="🔥 Keep it up!"
          />
          
          <StatCard 
            label="Wins" 
            value={userStats.wins}
          />
          
          <StatCard 
            label="Losses" 
            value={userStats.losses}
          />
        </div>

        {/* Record New Match Button */}
        <Link 
          href="/newmatch" 
          className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg mb-4 text-center"
        >
          Record New Match
        </Link>

        {/* Tabs */}
        {/* Match List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Recent Matches</h2>
            {recentMatches.slice(0, 6).map((match) => (
              
              <PlayerListItem
                key={match.id}
                initial={match.initial}
                name={match.opponent}
                avatarColor={match.color}
                stats={
                  <div className="flex items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${match.result === 'win' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {match.result === 'win' ? 'Win' : 'Loss'}
                    </span>
                  </div>
                }
                subtitle={match.when}
                onClick={() => console.log(`Clicked on ${match.opponent}`)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              />

              
            ))}
          </div>
        
      </div>

      <BottomNavigation />
    </AppLayout>
  );
}