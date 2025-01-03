import React from 'react';
import { Users, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { OpenMatch } from '../../types/matches';

interface OpenMatchCardProps {
  match: OpenMatch;
  onJoin: (matchId: string) => void;
}

export function OpenMatchCard({ match, onJoin }: OpenMatchCardProps) {
  const availableSpots = 4 - match.players.length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{match.court.club_name}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              {format(new Date(match.start_time), 'EEE, MMM d • HH:mm')}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{availableSpots} spots left</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {match.players.map((player) => (
            <div
              key={player.id}
              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
              title={player.full_name}
            />
          ))}
        </div>
        <button
          onClick={() => onJoin(match.id)}
          className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
        >
          JOIN
        </button>
      </div>
    </div>
  );
}