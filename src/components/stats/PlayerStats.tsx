import React from 'react';
import { Trophy, TrendingUp, Percent, Activity } from 'lucide-react';
import { StatCard } from './StatCard';
import type { MatchWithDetails } from '../../types/matches';

interface PlayerStatsProps {
  matches: MatchWithDetails[];
  playerId: string;
}

export function PlayerStats({ matches, playerId }: PlayerStatsProps) {
  const stats = React.useMemo(() => {
    const totalMatches = matches.length;
    if (totalMatches === 0) return null;

    const wins = matches.filter(match => {
      const playerTeam = match.match_players.find(p => p.player_id === playerId)?.team;
      const sets = match.score.split(',').map(set => {
        const [score1, score2] = set.trim().split('-').map(Number);
        return { team1: score1, team2: score2 };
      });
      const isWinner = sets.filter(set => set.team1 > set.team2).length > 
                      sets.filter(set => set.team2 > set.team1).length;
      return (playerTeam === 1 && isWinner) || (playerTeam === 2 && !isWinner);
    }).length;

    const rankingChanges = matches.map(match => {
      const playerResult = match.match_players.find(p => p.player_id === playerId);
      return playerResult ? playerResult.ranking_after - playerResult.ranking_before : 0;
    });

    return {
      totalMatches,
      winRate: (wins / totalMatches) * 100,
      averageRankingChange: rankingChanges.reduce((a, b) => a + b, 0) / totalMatches,
      bestStreak: calculateBestStreak(matches, playerId)
    };
  }, [matches, playerId]);

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Trophy}
        label="Matches Played"
        value={stats.totalMatches.toString()}
      />
      <StatCard
        icon={Percent}
        label="Win Rate"
        value={`${Math.round(stats.winRate)}%`}
      />
      <StatCard
        icon={TrendingUp}
        label="Avg. Rating Change"
        value={stats.averageRankingChange > 0 ? `+${stats.averageRankingChange.toFixed(1)}` : stats.averageRankingChange.toFixed(1)}
        trend={stats.averageRankingChange > 0 ? 'up' : 'down'}
      />
      <StatCard
        icon={Activity}
        label="Best Streak"
        value={stats.bestStreak.toString()}
      />
    </div>
  );
}