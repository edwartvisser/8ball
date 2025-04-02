// src/components/ui/Card.tsx
import { ReactNode } from 'react';

// Import the ProgressBar component
import { ProgressBar, ComparisonProgressBar } from './ProgressBar';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'sm' | 'md';
  progress?: {
    value: number;
    max?: number;
    color?: 'default' | 'success' | 'error' | 'warning';
    gradient?: boolean;
    showLabel?: boolean;
    label?: ReactNode;
  };
  comparisonProgress?: {
    value: number;
    max?: number;
    leftLabel?: ReactNode;
    rightLabel?: ReactNode;
  };
}

export const Card = ({ 
  children, 
  className = '',
  onClick,
  padding = 'medium',
  shadow = 'sm',
  progress,
  comparisonProgress
}: CardProps) => {
  const paddingClasses = {
    none: '',
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow'
  };

  return (
    <div 
      className={`
        bg-white 
        rounded-xl 
        ${paddingClasses[padding]} 
        ${shadowClasses[shadow]} 
        ${onClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''} 
        ${className}
      `}
      onClick={onClick}
    >
      {children}
      
      {progress && (
        <div className={children ? 'mt-2' : ''}>
          <ProgressBar 
            value={progress.value}
            max={progress.max}
            color={progress.color}
            gradient={progress.gradient}
            showLabel={progress.showLabel}
            label={progress.label}
          />
        </div>
      )}
      
      {comparisonProgress && (
        <div className={children ? 'mt-2' : ''}>
          <ComparisonProgressBar 
            value={comparisonProgress.value}
            max={comparisonProgress.max}
            leftLabel={comparisonProgress.leftLabel}
            rightLabel={comparisonProgress.rightLabel}
          />
        </div>
      )}
    </div>
  );
};

// For variant with a title
interface TitledCardProps extends CardProps {
  title: string;
  titleClassName?: string;
}

export const TitledCard = ({
  title,
  titleClassName = '',
  children,
  ...props
}: TitledCardProps) => {
  return (
    <Card {...props} padding="none">
      <div className={`p-3 border-b ${titleClassName}`}>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className={paddingClasses[props.padding || 'medium']}>
        {children}
      </div>
    </Card>
  );
};

// Specialized stat card with integrated progress bar
interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  className?: string;
  progress?: {
    value: number;
    max?: number;
    color?: 'default' | 'success' | 'error' | 'warning';
    gradient?: boolean;
  };
}

export const StatCard = ({
  label,
  value,
  subtext,
  className = '',
  progress
}: StatCardProps) => {
  return (
    <Card 
      className={`${className}`}
      progress={progress ? {
        value: progress.value,
        max: progress.max,
        color: progress.color,
        gradient: progress.gradient,
        showLabel: false
      } : undefined}
    >
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold mb-1">{value}</p>
      {subtext && <p className="text-xs text-emerald-500">{subtext}</p>}
    </Card>
  );
};

export default Card;