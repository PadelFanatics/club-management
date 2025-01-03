import type { MatchWithDetails } from '../types/matches';

export function calculateBestStreak(matches: MatchWithDetails[], playerId: string): number {
  let currentStreak = 0;
  let bestStreak = 0;

  for (const match of matches.reverse()) { // Process from oldest to newest
    const playerTeam = match.match_players.find(p => p.player_id === playerId)?.team;
    const sets = match.score.split(',').map(set => {
      const [score1, score2] = set.trim().split('-').map(Number);
      return { team1: score1, team2: score2 };
    });
    
    const isWinner = sets.filter(set => set.team1 > set.team2).length > 
                    sets.filter(set => set.team2 > set.team1).length;
    const playerWon = (playerTeam === 1 && isWinner) || (playerTeam === 2 && !isWinner);

    if (playerWon) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return bestStreak;
}