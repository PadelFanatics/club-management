import React from 'react';
import { Users } from 'lucide-react';
import { GameLevelBadge } from './GameLevelBadge';
import { calculateGameLevel } from '../../utils/gameLevel';
import type { Player } from '../../types';

interface PlayerSelectionProps {
  availablePlayers: Player[];
  selectedPlayers: Player[];
  onPlayersChange: (players: Player[]) => void;
}

export function PlayerSelection({ availablePlayers, selectedPlayers, onPlayersChange }: PlayerSelectionProps) {
  const handlePlayerSelect = (playerId: string) => {
    const player = availablePlayers.find(p => p.id === playerId);
    if (player && selectedPlayers.length < 4) {
      onPlayersChange([...selectedPlayers, player]);
    }
  };

  const handlePlayerRemove = (playerId: string) => {
    onPlayersChange(selectedPlayers.filter(p => p.id !== playerId));
  };

  const gameLevel = calculateGameLevel(selectedPlayers);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Select Players</h3>
        </div>
        {selectedPlayers.length > 0 && (
          <GameLevelBadge level={gameLevel} />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedPlayers.map(player => (
          <div
            key={player.id}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700"
          >
            <span>{player.full_name}</span>
            <span className="mx-1 text-indigo-400">•</span>
            <span className="text-indigo-500">{player.ranking}</span>
            <button
              type="button"
              onClick={() => handlePlayerRemove(player.id)}
              className="ml-2 text-indigo-600 hover:text-indigo-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {selectedPlayers.length < 4 && (
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => handlePlayerSelect(e.target.value)}
          value=""
        >
          <option value="">Add player ({4 - selectedPlayers.length} remaining)</option>
          {availablePlayers
            .filter(p => !selectedPlayers.includes(p))
            .sort((a, b) => Math.abs(a.ranking - (selectedPlayers[0]?.ranking || 1000)) - 
                           Math.abs(b.ranking - (selectedPlayers[0]?.ranking || 1000)))
            .map(player => (
              <option key={player.id} value={player.id}>
                {player.full_name} (Ranking: {player.ranking})
              </option>
            ))}
        </select>
      )}

      {selectedPlayers.length > 0 && (
        <div className="text-sm text-gray-500">
          Average Ranking: {Math.round(selectedPlayers.reduce((sum, p) => sum + p.ranking, 0) / selectedPlayers.length)}
        </div>
      )}
    </div>
  );
}