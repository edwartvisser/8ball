"use client"
// src/app/dashboard/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '../../components/layout/AppLayout';
import { Tabs, TabNav } from '../../components/ui/Tabs';
import { StatCard } from '../../components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
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
    { id: 4, opponent: 'David M.', initial: 'D', color: 'red', result: 'win', when: '2 days ago' }
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
        <TabNav
          options={[
            { id: 'recent', label: 'Recent Matches' },
            { id: 'history', label: 'History' }
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
          variant="underline"
          className="mb-5"
        />

        {/* Tab Content */}
        <div>
          {activeTab === 'recent' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-medium">Recent Matches</h2>
                <Link href="/matchhistory" className="text-xs text-gray-500">
                  See All
                </Link>
              </div>

              {/* Match List */}
              <div className="space-y-3">
                {recentMatches.map((match) => (
                  
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
          )}

          {activeTab === 'history' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-medium">Match History</h2>
                <Link href="/matchhistory" className="text-xs text-gray-500">
                  View All
                </Link>
              </div>

              {/* Alternative view of matches by time */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Today</h3>
                  <div className="space-y-2">
                    {recentMatches.filter(m => m.when === 'Today').map((match) => (
                      <div key={match.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center">
                          <div 
                            className={`w-7 h-7 rounded-full bg-${match.color}-500 text-white flex items-center justify-center text-xs font-semibold mr-3`}
                          >
                            {match.initial}
                          </div>
                          <p className="font-medium text-sm">{match.opponent}</p>
                        </div>
                        <div 
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            match.result === 'win' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {match.result === 'win' ? 'Win' : 'Loss'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 mb-2">Yesterday</h3>
                  <div className="space-y-2">
                    {recentMatches.filter(m => m.when === 'Yesterday').map((match) => (
                      <div key={match.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center">
                          <div 
                            className={`w-7 h-7 rounded-full bg-${match.color}-500 text-white flex items-center justify-center text-xs font-semibold mr-3`}
                          >
                            {match.initial}
                          </div>
                          <p className="font-medium text-sm">{match.opponent}</p>
                        </div>
                        <div 
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            match.result === 'win' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {match.result === 'win' ? 'Win' : 'Loss'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </AppLayout>
  );
}