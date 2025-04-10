'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { OpponentSelectItem } from '../../components/features/PlayerListItem';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { usePlayer } from '@/context/PlayerContext';

export default function NewMatch() {
  const router = useRouter();
  const { currentPlayer } = usePlayer();
  const [step, setStep] = useState(1);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<'win' | 'loss' | null>(null);
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players'); // Replace with your actual endpoint
        const data = await response.json();
        const filteredPlayers = data
          .filter((player: any) => player.id !== currentPlayer.id)
          .map((player: any) => ({
            ...player,
            initial: player.name.charAt(0).toUpperCase(), // Add 'initial' property
            avatarColor: player.avatarColor || 'indigo', // Default avatarColor if missing
          }));
        setPlayers(filteredPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, [currentPlayer.id]);

  const handleOpponentSelect = (opponentId: string) => {
    setSelectedOpponent(opponentId);
    setStep(2);
  };

  const handleResultSelect = async (result: 'win' | 'loss') => {
    setMatchResult(result);
    const opponent = players.find(o => o.id === selectedOpponent);

    if (!opponent) {
      console.error('Opponent not found');
      return;
    }

    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player1_id: currentPlayer.id,
          player2_id: opponent.id,
          winner_id: result === 'win' ? currentPlayer.id : opponent.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save match result');
      }

      console.log(`Match saved: ${currentPlayer.name} vs ${opponent.name} - Result: ${result}`);

      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Error saving match result:', error);
    }
  };

  return (
    <AppLayout>
      <div className="px-5">
        <PageHeader title="Record New Match" backUrl="/dashboard" />

        {/* Step 1: Select Opponent */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div
              className={`
                flex items-center justify-center
                w-7 h-7 rounded-full
                ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}
                font-semibold text-sm mr-3
              `}
            >
              1
            </div>
            <div>
              <h2 className="font-semibold">Select Opponent</h2>
              <p className="text-sm text-gray-500">Who did you play against?</p>
            </div>
          </div>

          {/* Current Player Indicator */}
          <div className="flex items-center p-3 bg-indigo-50 rounded-lg mb-4 border border-indigo-100">
            <div
              className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3"
            >
              {currentPlayer.initial}
            </div>
            <div>
              <p className="font-medium text-sm">{currentPlayer.name}</p>
              <p className="text-xs text-indigo-600">This is you</p>
            </div>
          </div>

          {/* Opponents List */}
          <p className="text-sm font-medium text-gray-500 mb-2">Available Opponents</p>

          <div className="space-y-2">
            {players.slice(0, 6).map(opponent => (
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
            <div
              className={`
                flex items-center justify-center
                w-7 h-7 rounded-full
                ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}
                font-semibold text-sm mr-3
              `}
            >
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