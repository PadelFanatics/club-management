import React from 'react';
import { format } from 'date-fns';
import { Trophy, TrendingDown, TrendingUp } from 'lucide-react';
import { MatchResult } from './MatchResult';
import type { MatchWithDetails } from '../../types/matches';

interface MatchHistoryListProps {
  matches: MatchWithDetails[];
  playerId: string;
}

export function MatchHistoryList({ matches, playerId }: MatchHistoryListProps) {
  if (matches.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">No matches played yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const playerResult = match.match_players.find(p => p.player_id === playerId);
        const rankingChange = playerResult ? 
          playerResult.ranking_after - playerResult.ranking_before : 0;

        return (
          <div key={match.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {format(new Date(match.start_time), 'MMM d, yyyy')}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">{match.courts.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {rankingChange !== 0 && (
                  <>
                    {rankingChange > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      rankingChange > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {rankingChange > 0 ? '+' : ''}{rankingChange}
                    </span>
                  </>
                )}
                <Trophy className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">
                  {playerResult?.ranking_after}
                </span>
              </div>
            </div>
            
            <MatchResult match={match} playerId={playerId} />
          </div>
        );
      })}
    </div>
  );
}