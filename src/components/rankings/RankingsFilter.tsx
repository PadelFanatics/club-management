import React from 'react';

interface RankingsFilterProps {
  timeRange: 'all' | 'month' | 'week';
  onTimeRangeChange: (range: 'all' | 'month' | 'week') => void;
}

export function RankingsFilter({ timeRange, onTimeRangeChange }: RankingsFilterProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onTimeRangeChange('all')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          timeRange === 'all'
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        All Time
      </button>
      <button
        onClick={() => onTimeRangeChange('month')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          timeRange === 'month'
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        This Month
      </button>
      <button
        onClick={() => onTimeRangeChange('week')}
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          timeRange === 'week'
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        This Week
      </button>
    </div>
  );
}