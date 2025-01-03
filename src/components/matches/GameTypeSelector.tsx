import React from 'react';
import { Trophy, Users } from 'lucide-react';
import type { GameType } from '../../types/matches';

interface GameTypeSelectorProps {
  value: GameType;
  onChange: (type: GameType) => void;
}

export function GameTypeSelector({ value, onChange }: GameTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Game Type
      </label>
      <div className="flex space-x-4">
        <button
          onClick={() => onChange('friendly')}
          className={`flex items-center px-4 py-2 rounded-md border ${
            value === 'friendly'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-300 hover:border-red-300'
          }`}
        >
          <Users className="h-5 w-5 mr-2" />
          Friendly
          <span className="ml-2 text-xs text-gray-500">(no ranking changes)</span>
        </button>
        <button
          onClick={() => onChange('ranking')}
          className={`flex items-center px-4 py-2 rounded-md border ${
            value === 'ranking'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-300 hover:border-red-300'
          }`}
        >
          <Trophy className="h-5 w-5 mr-2" />
          Ranking
          <span className="ml-2 text-xs text-gray-500">(affects rankings)</span>
        </button>
      </div>
    </div>
  );
}