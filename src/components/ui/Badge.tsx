// src/components/ui/Badge.tsx
import { ReactNode } from 'react';

// Move the color variant classes outside of the component so both components can access it
const colorVariantClasses = {
  default: {
    filled: 'bg-gray-500 text-white',
    outlined: 'border border-gray-500 text-gray-500',
    light: 'bg-gray-100 text-gray-800',
  },
  primary: {
    filled: 'bg-indigo-600 text-white',
    outlined: 'border border-indigo-600 text-indigo-600',
    light: 'bg-indigo-100 text-indigo-800',
  },
  success: {
    filled: 'bg-green-600 text-white',
    outlined: 'border border-green-600 text-green-600',
    light: 'bg-green-100 text-green-800',
  },
  warning: {
    filled: 'bg-yellow-500 text-white',
    outlined: 'border border-yellow-500 text-yellow-500',
    light: 'bg-yellow-100 text-yellow-800',
  },
  error: {
    filled: 'bg-red-600 text-white',
    outlined: 'border border-red-600 text-red-600',
    light: 'bg-red-100 text-red-800',
  },
  info: {
    filled: 'bg-blue-600 text-white',
    outlined: 'border border-blue-600 text-blue-600',
    light: 'bg-blue-100 text-blue-800',
  },
  gold: {
    filled: 'bg-yellow-500 text-black',
    outlined: 'border border-yellow-500 text-yellow-500',
    light: 'bg-yellow-100 text-yellow-800',
  },
  silver: {
    filled: 'bg-gray-300 text-black',
    outlined: 'border border-gray-300 text-gray-600',
    light: 'bg-gray-100 text-gray-800',
  },
  bronze: {
    filled: 'bg-amber-700 text-white',
    outlined: 'border border-amber-700 text-amber-700',
    light: 'bg-amber-100 text-amber-800',
  },
};

interface BadgeProps {
  children: ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gold' | 'silver' | 'bronze';
  variant?: 'filled' | 'outlined' | 'light';
  size?: 'xs' | 'sm' | 'md';
  rounded?: 'full' | 'md';
  className?: string;
}

export const Badge = ({
  children,
  color = 'default',
  variant = 'filled',
  size = 'sm',
  rounded = 'md',
  className = '',
}: BadgeProps) => {
  // Size classes
  const sizeClasses = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  // Rounded classes
  const roundedClasses = {
    full: 'rounded-full',
    md: 'rounded-md',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-medium
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${colorVariantClasses[color][variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

// Rank badge variant
interface RankBadgeProps {
  rank: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const RankBadge = ({
  rank,
  size = 'md',
  className = '',
}: RankBadgeProps) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-5 h-5 text-xs',
    sm: 'w-6 h-6 text-xs',
    md: 'w-7 h-7 text-sm',
    lg: 'w-8 h-8 text-base',
  };

  // Determine color based on rank
  let color: BadgeProps['color'] = 'default';
  if (rank === 1) color = 'gold';
  else if (rank === 2) color = 'silver';
  else if (rank === 3) color = 'bronze';

  return (
    <span
      className={`
        flex items-center justify-center
        rounded-full font-semibold
        ${sizeClasses[size]}
        ${rank <= 3 
          ? colorVariantClasses[color].filled 
          : 'bg-gray-200 text-gray-700'}
        ${className}
      `}
    >
      {rank}
    </span>
  );
};

// Status badge variant
interface StatusBadgeProps {
  status: 'win' | 'loss' | 'active' | 'inactive';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const StatusBadge = ({
  status,
  size = 'sm',
  className = '',
}: StatusBadgeProps) => {
  const statusMap = {
    win: { color: 'success', text: 'Win' },
    loss: { color: 'error', text: 'Loss' },
    active: { color: 'primary', text: 'Active' },
    inactive: { color: 'default', text: 'Inactive' },
  };

  return (
    <Badge
      color={statusMap[status].color as BadgeProps['color']}
      variant="light"
      size={size}
      className={className}
    >
      {statusMap[status].text}
    </Badge>
  );
};

export default Badge;