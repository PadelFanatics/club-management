import React from 'react';
import { TournamentRound } from './TournamentRound';
import type { TournamentMatch } from '../../types/tournaments';

interface TournamentBracketProps {
  matches: TournamentMatch[];
  onMatchClick?: (match: TournamentMatch) => void;
}

export function TournamentBracket({ matches, onMatchClick }: TournamentBracketProps) {
  // Group matches by round
  const roundMatches = matches.reduce((acc, match) => {
    const round = acc.get(match.round) || [];
    round.push(match);
    acc.set(match.round, round);
    return acc;
  }, new Map<number, TournamentMatch[]>());

  const rounds = Array.from(roundMatches.entries())
    .sort(([a], [b]) => a - b);

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-8 p-4 min-w-[800px]">
        {rounds.map(([round, matches]) => (
          <TournamentRound
            key={round}
            round={round}
            matches={matches}
            onMatchClick={onMatchClick}
          />
        ))}
      </div>
    </div>
  );
}