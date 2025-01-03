import React from 'react';
import { TournamentMatch as Match } from './TournamentMatch';
import type { TournamentMatch } from '../../types/tournaments';

interface TournamentRoundProps {
  round: number;
  matches: TournamentMatch[];
  onMatchClick?: (match: TournamentMatch) => void;
}

const roundNames: Record<number, string> = {
  1: 'Quarter Finals',
  2: 'Semi Finals',
  3: 'Final'
};

export function TournamentRound({ round, matches, onMatchClick }: TournamentRoundProps) {
  return (
    <div className="flex-1">
      <div className="text-center font-medium mb-4 text-gray-700">
        {roundNames[round] || `Round ${round}`}
      </div>
      <div className="space-y-8">
        {matches.map((match) => (
          <Match
            key={match.id}
            match={match}
            onClick={() => onMatchClick?.(match)}
          />
        ))}
      </div>
    </div>
  );
}