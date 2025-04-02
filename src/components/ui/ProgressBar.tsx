// src/components/ui/ProgressBar.tsx
import { ReactNode } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  height?: 'xs' | 'sm' | 'md';
  color?: 'default' | 'success' | 'error' | 'warning';
  gradient?: boolean;
  showLabel?: boolean;
  label?: ReactNode;
  className?: string;
}

export const ProgressBar = ({
  value,
  max = 100,
  height = 'sm',
  color = 'default',
  gradient = false,
  showLabel = false,
  label,
  className = '',
}: ProgressBarProps) => {
  // Calculate the percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  // Height classes
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  // Background color classes
  const backgroundClasses = {
    default: gradient 
      ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
      : 'bg-indigo-600',
    success: gradient 
      ? 'bg-gradient-to-r from-green-400 to-green-500' 
      : 'bg-green-500',
    error: gradient 
      ? 'bg-gradient-to-r from-red-400 to-red-500' 
      : 'bg-red-500',
    warning: gradient 
      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
      : 'bg-yellow-500',
  };

  return (
    <div className={`${className}`}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} ${backgroundClasses[color]} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs">
          {label ? label : <span className="font-medium">{percentage.toFixed(1)}%</span>}
        </div>
      )}
    </div>
  );
};

// ComparisonProgressBar variant for head-to-head records
interface ComparisonProgressBarProps {
  value: number;
  max?: number;
  height?: 'xs' | 'sm' | 'md';
  leftLabel?: ReactNode;
  rightLabel?: ReactNode;
  className?: string;
}

export const ComparisonProgressBar = ({
  value,
  max = 100,
  height = 'md',
  leftLabel,
  rightLabel,
  className = '',
}: ComparisonProgressBarProps) => {
  // Calculate the percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  // Height classes
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
  };

  return (
    <div className={`${className}`}>
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} bg-indigo-600 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-1 text-xs">
          {leftLabel && <div>{leftLabel}</div>}
          {rightLabel && <div>{rightLabel}</div>}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;