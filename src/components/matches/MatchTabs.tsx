import React from 'react';

interface MatchTabsProps {
  activeTab: 'open' | 'events';
  onTabChange: (tab: 'open' | 'events') => void;
}

export function MatchTabs({ activeTab, onTabChange }: MatchTabsProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onTabChange('open')}
        className={`px-6 py-2 rounded-full text-lg ${
          activeTab === 'open'
            ? 'bg-white shadow-sm font-medium'
            : 'text-gray-500'
        }`}
      >
        open matches
      </button>
      <button
        onClick={() => onTabChange('events')}
        className={`px-6 py-2 rounded-full text-lg ${
          activeTab === 'events'
            ? 'bg-white shadow-sm font-medium'
            : 'text-gray-500'
        }`}
      >
        events
      </button>
    </div>
  );
}