// src/components/features/PlayerListItem.tsx
import { ReactNode } from 'react';
import { Avatar } from '../ui/Avatar';
import { RankBadge } from '../ui/Badge';

interface PlayerListItemProps {
  name: string;
  initial: string;
  avatarColor?: string;
  subtitle?: string;
  rank?: number;
  stats?: ReactNode;
  rightElement?: ReactNode;
  isSelected?: boolean;
  isCurrentUser?: boolean;
  onClick?: () => void;
  className?: string;
}

export const PlayerListItem = ({
  name,
  initial,
  avatarColor = 'indigo',
  subtitle,
  rank,
  stats,
  rightElement,
  isSelected,
  isCurrentUser = false,
  onClick,
  className = '',
}: PlayerListItemProps) => {
  return (
    <div 
      className={`
        flex items-center justify-between 
        bg-white rounded-lg p-3 
        ${isSelected ? 'border-2 border-indigo-500' : 'border border-gray-100'} 
        ${isCurrentUser ? 'bg-indigo-50' : 'bg-white'}
        ${onClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''} 
        shadow-sm
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center">
        {rank !== undefined && (
          <div className="mr-3">
            <RankBadge rank={rank} />
          </div>
        )}
        <Avatar initial={initial} color={avatarColor} size="sm" className="mr-3" />
        <div>
          <div className="flex items-center">
            <p className="font-medium text-sm">{name}</p>
            {isCurrentUser && (
              <span className="ml-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-md">
                You
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center">
        {stats && <div className="mr-4">{stats}</div>}
        {rightElement}
      </div>
    </div>
  );
};

// Specialized variant for rankings list
interface RankingPlayerItemProps {
  player: {
    id: string;
    name: string;
    initial: string;
    avatarColor?: string;
    rank: number;
    wins: number;
    losses: number;
    streak: number;
    winPercentage: number;
    isCurrentUser?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export const RankingPlayerItem = ({
  player,
  onClick,
  className = '',
}: RankingPlayerItemProps) => {
  // Helper to determine streak styling
  const getStreakElement = (streak: number) => {
    if (streak > 0) {
      return <span className="text-center text-sm text-green-600">+{streak}</span>;
    } else if (streak < 0) {
      return <span className="text-center text-sm text-red-600">{streak}</span>;
    } else {
      return <span className="text-center text-sm text-gray-400">-</span>;
    }
  };

  return (
    <div className="grid grid-cols-12 items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="col-span-1">
        <RankBadge rank={player.rank} />
      </div>
      
      <div className="ml-2 col-span-5 flex items-center">
        
        <div className="font-medium text-sm">{player.name}</div>
        {player.isCurrentUser && (
          <span className="ml-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-md">
            You
          </span>
        )}
      </div>
      <div className="col-span-2 text-center text-sm">
        {player.wins}-{player.losses}
      </div>
      <div className="col-span-2 text-center">
        {getStreakElement(player.streak)}
      </div>
      <div className="col-span-2 text-right text-sm font-medium">
        {player.winPercentage}%
      </div>
    </div>
  );
};

// Specialized variant for opponent selection
interface OpponentSelectItemProps {
  player: {
    id: string;
    name: string;
    initial: string;
    avatarColor?: string;
    winRate?: number;
    subtitle?: string;
  };
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

export const OpponentSelectItem = ({
  player,
  isSelected = false,
  onClick,
  className = '',
}: OpponentSelectItemProps) => {
  return (
    <PlayerListItem
      name={player.name}
      initial={player.initial}
      avatarColor={player.avatarColor}
      subtitle={player.subtitle || (player.winRate !== undefined ? `Win rate: ${player.winRate}%` : undefined)}
      isSelected={isSelected}
      onClick={onClick}
      rightElement={
        <div className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${isSelected 
            ? 'border-indigo-600' 
            : 'border-gray-300'
          }
        `}>
          {isSelected && (
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
          )}
        </div>
      }
      className={className}
    />
  );
};

export default PlayerListItem;