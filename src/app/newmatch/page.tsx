// src/app/newmatch/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { OpponentSelectItem } from '../../components/features/PlayerListItem';
import BottomNavigation from '@/components/layout/BottomNavigation';

export default function NewMatch() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<'win' | 'loss' | null>(null);

  // Mock data for recent opponents
  const colors = ['yellow', 'purple', 'green', 'blue', 'pink', 'orange', 'red', 'teal', 'cyan'];

  const recentOpponents = [
    { id: '1', name: 'Jessica K.', initial: 'J', avatarColor: colors[0 % colors.length], winRate: 38 },
    { id: '2', name: 'Michael T.', initial: 'M', avatarColor: colors[1 % colors.length], winRate: 52 },
    { id: '3', name: 'Sandra L.', initial: 'S', avatarColor: colors[2 % colors.length], winRate: 45 },
    { id: '4', name: 'David P.', initial: 'D', avatarColor: colors[3 % colors.length], winRate: 60 },
    { id: '5', name: 'Emily R.', initial: 'E', avatarColor: colors[4 % colors.length], winRate: 47 },
    { id: '6', name: 'Chris B.', initial: 'C', avatarColor: colors[5 % colors.length], winRate: 50 },
    { id: '7', name: 'Laura H.', initial: 'L', avatarColor: colors[6 % colors.length], winRate: 42 },
    { id: '8', name: 'James W.', initial: 'J', avatarColor: colors[7 % colors.length], winRate: 55 },
    { id: '9', name: 'Sophia N.', initial: 'S', avatarColor: colors[8 % colors.length], winRate: 49 },
    { id: '10', name: 'Daniel G.', initial: 'D', avatarColor: colors[9 % colors.length], winRate: 53 },
    { id: '11', name: 'Olivia F.', initial: 'O', avatarColor: colors[10 % colors.length], winRate: 46 },
    { id: '12', name: 'Ethan C.', initial: 'E', avatarColor: colors[11 % colors.length], winRate: 51 },
    { id: '13', name: 'Ava M.', initial: 'A', avatarColor: colors[12 % colors.length], winRate: 44 },
    { id: '14', name: 'Liam J.', initial: 'L', avatarColor: colors[13 % colors.length], winRate: 57 },
    { id: '15', name: 'Isabella K.', initial: 'I', avatarColor: colors[14 % colors.length], winRate: 48 },
    { id: '16', name: 'Noah V.', initial: 'N', avatarColor: colors[15 % colors.length], winRate: 54 },
    { id: '17', name: 'Mia Z.', initial: 'M', avatarColor: colors[16 % colors.length], winRate: 43 },
    { id: '18', name: 'Alexander T.', initial: 'A', avatarColor: colors[17 % colors.length], winRate: 56 },
    { id: '19', name: 'Charlotte Q.', initial: 'C', avatarColor: colors[18 % colors.length], winRate: 50 },
    { id: '20', name: 'Benjamin L.', initial: 'B', avatarColor: colors[19 % colors.length], winRate: 58 },
    { id: '21', name: 'Amelia Y.', initial: 'A', avatarColor: colors[20 % colors.length], winRate: 41 },
    { id: '22', name: 'Lucas R.', initial: 'L', avatarColor: colors[21 % colors.length], winRate: 59 },
    { id: '23', name: 'Harper D.', initial: 'H', avatarColor: colors[22 % colors.length], winRate: 45 }
  ];

  // Handle opponent selection
  const handleOpponentSelect = (opponentId: string) => {
    setSelectedOpponent(opponentId);
    setStep(2);
  };

  // Handle result selection
  const handleResultSelect = (result: 'win' | 'loss') => {
    setMatchResult(result);
    // In a real app, you would save the match here
    
    // Simulate saving and redirect after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="px-5">
        <PageHeader 
          title="Record New Match" 
          backUrl="/dashboard" 
        />

        {/* Step 1: Select Opponent */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className={`
              flex items-center justify-center
              w-7 h-7 rounded-full
              ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}
              font-semibold text-sm mr-3
            `}>
              1
            </div>
            <div>
              <h2 className="font-semibold">Select Opponent</h2>
              <p className="text-sm text-gray-500">Who did you play against?</p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search player..." 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Recent Opponents */}
          <p className="text-sm font-medium text-gray-500 mb-2">Recent Opponents</p>
          
            <div className="space-y-2">
            {recentOpponents.slice(0, 6).map(opponent => (
              <OpponentSelectItem
              key={opponent.id}
              player={opponent}
              isSelected={selectedOpponent === opponent.id}
              onClick={() => handleOpponentSelect(opponent.id)}
              />
            ))}
            </div>
        </div>

        {/* Step 2: Match Result */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className={`
              flex items-center justify-center
              w-7 h-7 rounded-full
              ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}
              font-semibold text-sm mr-3
            `}>
              2
            </div>
            <div>
              <h2 className={`font-semibold ${step === 1 ? 'text-gray-400' : ''}`}>Match Result</h2>
              <p className={`text-sm ${step === 1 ? 'text-gray-400' : 'text-gray-500'}`}>Did you win or lose?</p>
            </div>
          </div>

          {/* Result Selection */}
          <div className={`flex justify-between ${step === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
            <button
              className={`
                flex-1 flex items-center justify-center
                mr-2 py-3 rounded-lg font-medium
                ${matchResult === 'win' 
                  ? 'bg-green-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }
                transition-colors
              `}
              onClick={() => handleResultSelect('win')}
              disabled={step === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              I Won
            </button>
            <button
              className={`
                flex-1 flex items-center justify-center
                ml-2 py-3 rounded-lg font-medium
                ${matchResult === 'loss' 
                  ? 'bg-red-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }
                transition-colors
              `}
              onClick={() => handleResultSelect('loss')}
              disabled={step === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              I Lost
            </button>
          </div>
          
          {/* Confirmation Message */}
          {matchResult && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-medium">
                Recording match result...
              </p>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </AppLayout>
  );
}