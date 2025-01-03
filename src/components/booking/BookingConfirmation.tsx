import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Users } from 'lucide-react';
import { PlayerPairings } from './PlayerPairings';
import type { Court, Player } from '../../types';

interface BookingConfirmationProps {
  court: Court;
  startTime: Date;
  players: Player[];
  onConfirm: (team1: Player[], team2: Player[]) => void;
  onCancel: () => void;
}

export function BookingConfirmation({ 
  court, 
  startTime, 
  players,
  onConfirm,
  onCancel 
}: BookingConfirmationProps) {
  const [team1Players, setTeam1Players] = useState<Player[]>(players.slice(0, 2));
  const [team2Players, setTeam2Players] = useState<Player[]>(players.slice(2, 4));

  const handleTeamChange = (newTeam1: Player[], newTeam2: Player[]) => {
    setTeam1Players(newTeam1);
    setTeam2Players(newTeam2);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Confirm Booking</h2>
        
        <div className="flex items-center space-x-4 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>{format(startTime, 'MMMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-gray-600">
          <Clock className="h-5 w-5" />
          <span>{format(startTime, 'h:mm a')}</span>
        </div>
        
        <div className="flex items-center space-x-4 text-gray-600">
          <Users className="h-5 w-5" />
          <span>{court.name}</span>
        </div>
      </div>

      <PlayerPairings
        players={players}
        team1Players={team1Players}
        team2Players={team2Players}
        onTeamChange={handleTeamChange}
      />

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(team1Players, team2Players)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}