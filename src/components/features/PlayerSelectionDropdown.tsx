"use client"
// src/components/features/PlayerSelectionDropdown.jsx
import { useState, useEffect, useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';

const PlayerSelectionDropdown = () => {
  const [players, setPlayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentPlayer, updateCurrentPlayer } = usePlayer();
  const dropdownRef = useRef(null);

  // Fetch players from API
  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        // In a real implementation with a working API
        const response = await fetch('/api/players');
        const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePlayerSelect = (player) => {
    updateCurrentPlayer(player);
    setIsOpen(false);
    
    // In a real application, we would also want to:
    // 1. Update user stats based on the selected player
    // 2. Fetch match history for this player
    console.log(`Selected ${player.name} as player 1 for new matches`);
  };

  // Avatar display with dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button 
        className="bg-indigo-500 text-white flex items-center justify-center rounded-full w-9 h-9 font-semibold focus:outline-none hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentPlayer.initial}
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
          <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b">
            Select Player
          </div>
          
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">Loading players...</div>
          ) : players.length > 0 ? (
            players.map((player) => (
              <button
                key={player.id}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => handlePlayerSelect(player)}
              >
                {/* <div className={`bg-${player.avatarColor}-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2`}>
                  {player.name.charAt(0)}
                </div> */}
                <span>{player.name}</span>
                {player.name === currentPlayer.name && (
                  <svg className="ml-auto h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">No players found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerSelectionDropdown;