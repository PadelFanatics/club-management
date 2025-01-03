import React from 'react';
import { OpenMatchCard } from './OpenMatchCard';
import type { OpenMatch } from '../../types/matches';

interface OpenMatchesListProps {
  matches: OpenMatch[];
  onJoinMatch: (matchId: string) => void;
}

export function OpenMatchesList({ matches, onJoinMatch }: OpenMatchesListProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg">
        <p className="text-gray-500">No open matches found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <OpenMatchCard
          key={match.id}
          match={match}
          onJoin={onJoinMatch}
        />
      ))}
    </div>
  );
}