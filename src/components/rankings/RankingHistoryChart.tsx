import React from 'react';
import { format } from 'date-fns';
import type { RankingHistory } from '../../types';

interface RankingHistoryChartProps {
  history: RankingHistory[];
}

export function RankingHistoryChart({ history }: RankingHistoryChartProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">No ranking history available yet</p>
      </div>
    );
  }

  const maxRanking = Math.max(...history.map(h => h.ranking));
  const minRanking = Math.min(...history.map(h => h.ranking));
  const range = maxRanking - minRanking;
  const padding = range * 0.1; // 10% padding

  const chartHeight = 200;
  const points = history.map((h, i) => {
    const x = (i / (history.length - 1)) * 100;
    const y = ((h.ranking - minRanking + padding) / (range + 2 * padding)) * chartHeight;
    return `${x},${chartHeight - y}`;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Ranking Progress</h3>
      <div className="relative" style={{ height: `${chartHeight}px` }}>
        <svg
          viewBox={`0 0 100 ${chartHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <polyline
            points={points.join(' ')}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
          />
        </svg>
        
        {/* Data points */}
        {history.map((h, i) => {
          const x = (i / (history.length - 1)) * 100;
          const y = ((h.ranking - minRanking + padding) / (range + 2 * padding)) * chartHeight;
          return (
            <div
              key={h.id}
              className="absolute w-2 h-2 bg-indigo-600 rounded-full -ml-1 group cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${chartHeight - y}px`,
              }}
            >
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                {h.ranking} points
                <br />
                {format(new Date(h.created_at), 'MMM d, yyyy')}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Axis labels */}
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>{format(new Date(history[0].created_at), 'MMM d')}</span>
        <span>{format(new Date(history[history.length - 1].created_at), 'MMM d')}</span>
      </div>
    </div>
  );
}