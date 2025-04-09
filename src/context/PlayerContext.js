"use client" 

// src/context/PlayerContext.js
import { createContext, useState, useContext, useEffect } from 'react';

// Create context
const PlayerContext = createContext();

// Context provider component
export function PlayerProvider({ children }) {
  const [currentPlayer, setCurrentPlayer] = useState({ 
    name: 'Select a player', 
    initial: 'X', 
    avatarcolor: 'indigo',
    id: null
  });

  // Load saved player on mount
  useEffect(() => {
    const savedPlayer = localStorage.getItem('currentPlayer');
    if (savedPlayer) {
      try {
        setCurrentPlayer(JSON.parse(savedPlayer));
      } catch (error) {
        console.error('Error parsing saved player:', error);
      }
    }
  }, []);

  // Update player and save to localStorage
  const updateCurrentPlayer = (player) => {
    const playerData = {
      ...player,
      initial: player.name.charAt(0)
    };
    
    setCurrentPlayer(playerData);
    localStorage.setItem('currentPlayer', JSON.stringify(playerData));
  };

  return (
    <PlayerContext.Provider value={{ currentPlayer, updateCurrentPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

// Custom hook for using the context
export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

export default PlayerContext;