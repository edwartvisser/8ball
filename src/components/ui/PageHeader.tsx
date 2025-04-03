// src/components/layout/PageHeader.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  backUrl?: string; // URL to navigate back to
  backAriaLabel?: string;
  rightElement?: ReactNode; // Optional element to display on the right side
  className?: string;
}

export const PageHeader = ({
  title,
  backUrl,
  backAriaLabel = 'Go back',
  rightElement,
  className = '',
}: PageHeaderProps) => {
  return (
    <div className={`flex items-center justify-between py-6 ${className}`}>
      <div className="flex items-center">
        {backUrl && (
          <Link
            href={backUrl}
            aria-label={backAriaLabel}
            className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        )}
        <h1 className="text-xl font-bold text-black">{title}</h1>
      </div>
      
      {rightElement && (
        <div className="flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
};

// Variant with subtitle
interface PageHeaderWithSubtitleProps extends PageHeaderProps {
  subtitle: string;
}

export const PageHeaderWithSubtitle = ({
  subtitle,
  ...props
}: PageHeaderWithSubtitleProps) => {
  return (
    <div className={`py-6 ${props.className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {props.backUrl && (
            <Link
              href={props.backUrl}
              aria-label={props.backAriaLabel}
              className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          )}
          <div>
            <h1 className="text-xl font-bold text-black">{props.title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        
        {props.rightElement && (
          <div className="flex items-center">
            {props.rightElement}
          </div>
        )}
      </div>
    </div>
  );
};