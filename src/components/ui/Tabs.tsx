// src/components/ui/Tabs.tsx
import { ReactNode, useState } from 'react';

interface Tab {
  id: string;
  label: ReactNode;
  content?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  variant?: 'underline' | 'contained' | 'pills';
  fullWidth?: boolean;
  onChange?: (tabId: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  renderContent?: boolean;
}

export const Tabs = ({
  tabs,
  defaultActiveTab,
  variant = 'underline',
  fullWidth = true,
  onChange,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  contentClassName = '',
  renderContent = true,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Variant-specific styling
  const variantClasses = {
    underline: {
      container: 'border-b',
      tab: 'py-2 text-sm font-medium text-gray-500',
      activeTab: 'text-indigo-600 border-b-2 border-indigo-600',
    },
    contained: {
      container: 'bg-gray-100 p-1 rounded-lg',
      tab: 'py-2 text-sm font-medium text-gray-600 rounded-md',
      activeTab: 'bg-indigo-600 text-white',
    },
    pills: {
      container: '',
      tab: 'py-1.5 px-3 text-sm font-medium text-gray-600 rounded-full',
      activeTab: 'bg-indigo-100 text-indigo-700',
    },
  };

  return (
    <div className={className}>
      <div className={`flex ${variantClasses[variant].container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              ${fullWidth ? 'flex-1' : 'px-4'} 
              ${variantClasses[variant].tab}
              ${activeTab === tab.id ? variantClasses[variant].activeTab : ''} 
              ${tabClassName}
              ${activeTab === tab.id ? activeTabClassName : ''}
            `}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderContent && (
        <div className={`mt-4 ${contentClassName}`}>
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      )}
    </div>
  );
};

// Simple tab navigation without content
interface TabNavProps {
  options: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'contained' | 'pills';
  className?: string;
}

export const TabNav = ({
  options,
  activeId,
  onChange,
  variant = 'contained',
  className = '',
}: TabNavProps) => {
  // Convert options to the Tab format
  const tabs = options.map(option => ({
    id: option.id,
    label: option.label,
  }));

  return (
    <Tabs
      tabs={tabs}
      defaultActiveTab={activeId}
      variant={variant}
      onChange={onChange}
      renderContent={false}
      className={className}
    />
  );
};

export default Tabs;