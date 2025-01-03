import React from 'react';
import type { BookingOptions } from './BookingModal';

interface PlayerOptionsProps {
  value: BookingOptions;
  onChange: (options: Partial<BookingOptions>) => void;
}

export function PlayerOptions({ value, onChange }: PlayerOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">ARE YOU GOING WITH SOMEONE ELSE? (optional)</h3>
        <div className="flex gap-4">
          <button
            onClick={() => onChange({ additionalPlayers: 1 })}
            className={`flex-1 py-2 px-4 rounded-lg border ${
              value.additionalPlayers === 1 ? 'border-red-900 bg-red-50' : 'border-gray-200'
            }`}
          >
            +1 player
          </button>
          <button
            onClick={() => onChange({ additionalPlayers: 2 })}
            className={`flex-1 py-2 px-4 rounded-lg border ${
              value.additionalPlayers === 2 ? 'border-red-900 bg-red-50' : 'border-gray-200'
            }`}
          >
            +2 players
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.approvePlayers}
            onChange={(e) => onChange({ approvePlayers: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-red-900 focus:ring-red-900"
          />
          <span>Approve players before they join</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value.isFriendly}
            onChange={(e) => onChange({ isFriendly: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-red-900 focus:ring-red-900"
          />
          <span>Friendly Match (no score)</span>
        </label>
      </div>
    </div>
  );
}