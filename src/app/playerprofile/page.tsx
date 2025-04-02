// src/app/playerprofile/page.tsx
'use client';

import { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeaderWithSubtitle } from '../../components/ui/PageHeader';
import { Card, StatCard } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TabNav } from '../../components/ui/Tabs';
import { ComparisonProgressBar } from '../../components/ui/ProgressBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

export default function PlayerProfile() {
  // State for tab navigation
  const [activeTab, setActiveTab] = useState('stats');
  
  // Mock data for player profile
  const playerProfile = {
    id: '1',
    name: 'Michael T.',
    initial: 'M',
    avatarColor: 'purple',
    lastActive: '2 days ago',
    rank: 3,
    matches: 28,
    wins: 17,
    losses: 11,
    winRate: 60.7,
    currentStreak: -1,
    consistencyRating: 4,
    challengingLevel: 'High',
    recordAgainst: {
      wins: 5,
      losses: 3,
      total: 8,
      percentage: 62.5
    }
  };

  // Mock data for recent performance
  const recentPerformance = ['W', 'L', 'W', 'W', 'L', 'W', 'L', 'W', 'W', 'L'];

  return (
    <AppLayout>
      <div className="px-5">
        {/* Header with Profile Info */}
        <PageHeaderWithSubtitle 
          title={playerProfile.name}
          subtitle={`Last active: ${playerProfile.lastActive}`}
          backUrl="/dashboard" 
          rightElement={
            <Badge color="gold" variant="filled" rounded="full">
              #{playerProfile.rank}
            </Badge>
          }
        />

        {/* Player Avatar */}
        <div className="flex items-center mb-6">
          <div className={`
            bg-${playerProfile.avatarColor}-500 text-white 
            flex items-center justify-center rounded-full 
            w-16 h-16 text-3xl font-semibold mr-4
          `}>
            {playerProfile.initial}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard 
            label="Matches" 
            value={playerProfile.matches}
          />
          <StatCard 
            label="Wins" 
            value={playerProfile.wins}
          />
          <StatCard 
            label="Win Rate" 
            value={`${playerProfile.winRate}%`}
          />
        </div>

        {/* Record vs This Player */}
        <Card className="p-4 mb-6">
          <h3 className="text-sm font-medium mb-2">Your Record vs {playerProfile.name}</h3>
          <ComparisonProgressBar
            value={playerProfile.recordAgainst.percentage}
            leftLabel={`${playerProfile.recordAgainst.wins} wins, ${playerProfile.recordAgainst.losses} losses in ${playerProfile.recordAgainst.total} matches`}
            rightLabel={`${playerProfile.recordAgainst.percentage}%`}
          />
        </Card>

        {/* Tabs */}
        <TabNav
          options={[
            { id: 'stats', label: 'Stats' },
            { id: 'matches', label: 'Match History' }
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
          variant="underline"
          className="mb-5"
        />

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <>
            {/* Performance Breakdown */}
            <div className="mb-5">
              <h3 className="text-sm font-medium mb-3">Performance Breakdown</h3>
              
              {/* Win Rate */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Win Rate</span>
                <div className="flex items-center">
                  <div className="w-36 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${playerProfile.winRate}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{playerProfile.winRate}%</span>
                </div>
              </div>
              
              {/* Current Streak */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Current Streak</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-red-500">{playerProfile.currentStreak}</span>
                </div>
              </div>
              
              {/* Consistency Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Consistency Rating</span>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${i < playerProfile.consistencyRating ? 'text-yellow-400' : 'text-gray-300'}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Challenging Level */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Challenging Level</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{playerProfile.challengingLevel}</span>
                </div>
              </div>
            </div>

            {/* Recent Performance */}
            <div className="mb-10">
              <h3 className="text-sm font-medium mb-3">Recent Performance</h3>
              <div className="flex space-x-2">
                {recentPerformance.map((result, index) => (
                  <div 
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                      result === 'W' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'matches' && (
          <div className="text-center py-10">
            <p className="text-gray-500">Match history will be shown here</p>
            <p className="text-gray-400 text-sm mt-2">Coming soon</p>
          </div>
        )}
      </div>
      <BottomNavigation />
    </AppLayout>
  );
}