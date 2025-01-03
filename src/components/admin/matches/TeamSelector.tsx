import React from 'react';
import type { Player } from '../../../types';

interface TeamSelectorProps {
  label: string;
  players: Player[];
  selectedPlayers: Player[];
  onPlayersChange: (players: Player[]) => void;
  excludedPlayers: Player[];
}

export function TeamSelector({
  label,
  players,
  selectedPlayers,
  onPlayersChange,
  excludedPlayers
}: TeamSelectorProps) {
  const availablePlayers = players.filter(
    p => !excludedPlayers.includes(p) && !selectedPlayers.includes(p)
  );

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.length < 2) {
      onPlayersChange([...selectedPlayers, player]);
    }
  };

  const handlePlayerRemove = (player: Player) => {
    onPlayersChange(selectedPlayers.filter(p => p.id !== player.id));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      <div className="flex flex-wrap gap-2">
        {selectedPlayers.map(player => (
          <div
            key={player.id}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700"
          >
            <span>{player.full_name}</span>
            <button
              type="button"
              onClick={() => handlePlayerRemove(player)}
              className="ml-2 text-indigo-600 hover:text-indigo-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {selectedPlayers.length < 2 && (
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => {
            const player = players.find(p => p.id === e.target.value);
            if (player) handlePlayerSelect(player);
          }}
          value=""
        >
          <option value="">Add player</option>
          {availablePlayers.map(player => (
            <option key={player.id} value={player.id}>
              {player.full_name} (Ranking: {player.ranking})
            </option>
          ))}
        </select>
      )}
    </div>
  );
}