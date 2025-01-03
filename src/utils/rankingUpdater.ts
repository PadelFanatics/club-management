import type { Match, MatchPlayer } from '../types';

const K_FACTOR = 32; // Base K-factor for ranking adjustments
const MAX_RANKING_CHANGE = 100; // Maximum points that can be gained/lost in a match

interface TeamRankings {
  team1Avg: number;
  team2Avg: number;
}

function calculateTeamAverages(players: MatchPlayer[]): TeamRankings {
  const team1 = players.filter(p => p.team === 1);
  const team2 = players.filter(p => p.team === 2);

  const team1Avg = team1.reduce((sum, p) => sum + p.ranking_before, 0) / team1.length;
  const team2Avg = team2.reduce((sum, p) => sum + p.ranking_before, 0) / team2.length;

  return { team1Avg, team2Avg };
}

function calculateExpectedScore(teamRating: number, opposingTeamRating: number): number {
  return 1 / (1 + Math.pow(10, (opposingTeamRating - teamRating) / 400));
}

function parseScore(score: string): { team1Sets: number; team2Sets: number } {
  const sets = score.split(',').map(set => set.trim());
  let team1Sets = 0;
  let team2Sets = 0;

  sets.forEach(set => {
    const [score1, score2] = set.split('-').map(Number);
    if (score1 > score2) team1Sets++;
    else if (score2 > score1) team2Sets++;
  });

  return { team1Sets, team2Sets };
}

export function calculateNewRankings(match: Match, players: MatchPlayer[]): MatchPlayer[] {
  const { team1Avg, team2Avg } = calculateTeamAverages(players);
  const { team1Sets, team2Sets } = parseScore(match.score);

  // Calculate actual scores (1 for win, 0 for loss)
  const team1ActualScore = team1Sets > team2Sets ? 1 : 0;
  const team2ActualScore = 1 - team1ActualScore;

  // Calculate expected scores
  const team1ExpectedScore = calculateExpectedScore(team1Avg, team2Avg);
  const team2ExpectedScore = 1 - team1ExpectedScore;

  // Calculate base ranking changes
  const team1Change = K_FACTOR * (team1ActualScore - team1ExpectedScore);
  const team2Change = K_FACTOR * (team2ActualScore - team2ExpectedScore);

  // Apply ranking changes with limits
  return players.map(player => {
    const isTeam1 = player.team === 1;
    const baseChange = isTeam1 ? team1Change : team2Change;
    
    // Adjust change based on player's current ranking relative to team average
    const teamAvg = isTeam1 ? team1Avg : team2Avg;
    const rankingDiff = player.ranking_before - teamAvg;
    const adjustedChange = baseChange * (1 - (rankingDiff / 1000));

    // Limit the change to MAX_RANKING_CHANGE
    const finalChange = Math.max(
      Math.min(adjustedChange, MAX_RANKING_CHANGE),
      -MAX_RANKING_CHANGE
    );

    return {
      ...player,
      ranking_after: Math.max(0, Math.round(player.ranking_before + finalChange))
    };
  });
}