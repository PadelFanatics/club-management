import React from 'react';
import { format } from 'date-fns';
import { Clock, MapPin } from 'lucide-react';
import type { TournamentMatch } from '../../types/tournaments';

interface TournamentScheduleProps {
  matches: TournamentMatch[];
}

export function TournamentSchedule({ matches }: TournamentScheduleProps) {
  // Group matches by date
  const matchesByDate = matches.reduce((acc, match) => {
    if (!match.scheduled_time) return acc;
    const date = format(new Date(match.scheduled_time), 'yyyy-MM-dd');
    const dayMatches = acc.get(date) || [];
    dayMatches.push(match);
    acc.set(date, dayMatches);
    return acc;
  }, new Map<string, TournamentMatch[]>());

  return (
    <div className="space-y-6">
      {Array.from(matchesByDate.entries()).map(([date, dayMatches]) => (
        <div key={date}>
          <h3 className="font-medium mb-4">
            {format(new Date(date), 'EEEE, MMMM d')}
          </h3>
          <div className="space-y-4">
            {dayMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {format(new Date(match.scheduled_time!), 'HH:mm')}
                    </span>
                  </div>
                  {match.court_id && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Court {match.court_id}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div>{match.team1_id ? `Team ${match.team1_id}` : 'TBD'}</div>
                    <div>vs</div>
                    <div>{match.team2_id ? `Team ${match.team2_id}` : 'TBD'}</div>
                  </div>
                  <div className="text-sm font-medium">
                    {match.round === 1 ? 'Quarter Finals' :
                     match.round === 2 ? 'Semi Finals' :
                     match.round === 3 ? 'Final' : `Round ${match.round}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}