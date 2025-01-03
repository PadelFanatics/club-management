import React from 'react';
import type { MatchWithDetails } from '../../types/matches';

interface MatchResultProps {
  match: MatchWithDetails;
  playerId: string;
}

export function MatchResult({ match, playerId }: MatchResultProps) {
  const playerTeam = match.match_players.find(p => p.player_id === playerId)?.team;
  const team1Players = match.match_players.filter(p => p.team === 1);
  const team2Players = match.match_players.filter(p => p.team === 2);
  
  const sets = match.score.split(',').map(set => {
    const [score1, score2] = set.trim().split('-').map(Number);
    return { team1: score1, team2: score2 };
  });

  const isWinner = sets.filter(set => set.team1 > set.team2).length > 
                   sets.filter(set => set.team2 > set.team1).length;
  const playerWon = (playerTeam === 1 && isWinner) || (playerTeam === 2 && !isWinner);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className={`text-sm ${playerTeam === 1 ? 'font-medium' : ''}`}>
            {team1Players.map(p => p.player.full_name).join(' / ')}
          </div>
          <div className={`text-sm ${playerTeam === 2 ? 'font-medium' : ''}`}>
            {team2Players.map(p => p.player.full_name).join(' / ')}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium space-y-1">
            {sets.map((set, i) => (
              <div key={i} className="text-right">
                {set.team1}-{set.team2}
              </div>
            ))}
          </div>
          <div className={`w-1 h-12 rounded-full ${
            playerWon ? 'bg-green-500' : 'bg-red-500'
          }`} />
        </div>
      </div>
    </div>
  );
}