import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import type { Player } from '../../types';

interface RankingsListProps {
  players: Player[];
}

export function RankingsList({ players }: RankingsListProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {players.map((player, index) => (
          <div key={player.id} className="p-4 flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 text-center">
              {index < 3 ? (
                <Medal className={`h-6 w-6 mx-auto ${
                  index === 0 ? 'text-yellow-400' :
                  index === 1 ? 'text-gray-400' :
                  'text-amber-600'
                }`} />
              ) : (
                <span className="text-gray-500 font-medium">{index + 1}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {player.full_name}
              </p>
              <p className="text-sm text-gray-500">
                {player.matches_played} matches played
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-indigo-500" />
              <span className="text-lg font-semibold text-gray-900">
                {player.ranking}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}