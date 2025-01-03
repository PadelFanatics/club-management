import React from 'react';
import { format } from 'date-fns';
import type { TournamentMatch as TMatch } from '../../types/tournaments';

interface TournamentMatchProps {
  match: TMatch;
  onClick?: () => void;
}

export function TournamentMatch({ match, onClick }: TournamentMatchProps) {
  const getStatusColor = (status: TMatch['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'walkover': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm p-4 ${
        onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(match.status)}`}>
          {match.status}
        </span>
        {match.scheduled_time && (
          <span className="text-sm text-gray-500">
            {format(new Date(match.scheduled_time), 'HH:mm')}
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="space-y-2">
        {[match.team1_id, match.team2_id].map((teamId, index) => {
          const isWinner = match.winner_id === teamId;
          const score = match.score?.split('-')[index];

          return (
            <div
              key={teamId || index}
              className={`flex justify-between items-center p-2 rounded ${
                isWinner ? 'bg-green-50' : ''
              }`}
            >
              <span className={`font-medium ${isWinner ? 'text-green-700' : ''}`}>
                {teamId ? `Team ${teamId}` : 'TBD'}
              </span>
              {score && (
                <span className={`font-bold ${isWinner ? 'text-green-700' : ''}`}>
                  {score}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}