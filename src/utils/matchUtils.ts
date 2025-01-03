import type { MatchWithDetails } from '../types/matches';

export function getPlayerTeam(match: MatchWithDetails, playerId: string): 1 | 2 | undefined {
  return match.match_players.find(p => p.player_id === playerId)?.team;
}

export function parseMatchSets(score: string) {
  return score.split(',').map(set => {
    const [score1, score2] = set.trim().split('-').map(Number);
    return { team1: score1, team2: score2 };
  });
}

export function isMatchWinner(sets: Array<{ team1: number; team2: number }>, team: 1 | 2) {
  const team1Wins = sets.filter(set => set.team1 > set.team2).length;
  const team2Wins = sets.filter(set => set.team2 > set.team1).length;
  return team === 1 ? team1Wins > team2Wins : team2Wins > team1Wins;
}

export function getPlayerMatchResult(match: MatchWithDetails, playerId: string) {
  const playerTeam = getPlayerTeam(match, playerId);
  if (!playerTeam) return null;

  const sets = parseMatchSets(match.score);
  const isWinner = isMatchWinner(sets, playerTeam);
  const playerResult = match.match_players.find(p => p.player_id === playerId);
  const rankingChange = playerResult ? playerResult.ranking_after - playerResult.ranking_before : 0;

  return {
    isWinner,
    rankingChange,
    sets,
    playerTeam
  };
}