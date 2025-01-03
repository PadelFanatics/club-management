import React, { useState } from 'react';
import { matchApi } from '../../../lib/api/matchApi';
import { TeamSelector } from './TeamSelector';
import { ScoreInput } from './ScoreInput';
import { GameTypeSelector } from '../../matches/GameTypeSelector';
import type { Court, Player, Match, MatchPlayer } from '../../../types';
import type { GameType } from '../../../types/matches';

interface MatchRecordFormProps {
  court: Court;
  players: Player[];
  onMatchRecorded: () => void;
}

export function MatchRecordForm({ court, players, onMatchRecorded }: MatchRecordFormProps) {
  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  const [score, setScore] = useState('');
  const [gameType, setGameType] = useState<GameType>('ranking');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (team1Players.length !== 2 || team2Players.length !== 2) {
      alert('Each team must have exactly 2 players');
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const match: Omit<Match, 'id'> & { game_type: GameType } = {
        court_id: court.id,
        start_time: new Date(now.getTime() - 3600000).toISOString(), // 1 hour ago
        end_time: now.toISOString(),
        score,
        game_type: gameType
      };

      const matchPlayers: Omit<MatchPlayer, 'id' | 'match_id'>[] = [
        ...team1Players.map(p => ({
          player_id: p.id,
          team: 1,
          ranking_before: p.ranking,
          ranking_after: p.ranking // Will be calculated by the backend for ranking games
        })),
        ...team2Players.map(p => ({
          player_id: p.id,
          team: 2,
          ranking_before: p.ranking,
          ranking_after: p.ranking // Will be calculated by the backend for ranking games
        }))
      ];

      await matchApi.recordMatch(match, matchPlayers);
      onMatchRecorded();
    } catch (error) {
      console.error('Failed to record match:', error);
      alert('Failed to record match');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <GameTypeSelector value={gameType} onChange={setGameType} />

      <TeamSelector
        label="Team 1"
        players={players}
        selectedPlayers={team1Players}
        onPlayersChange={setTeam1Players}
        excludedPlayers={team2Players}
      />

      <TeamSelector
        label="Team 2"
        players={players}
        selectedPlayers={team2Players}
        onPlayersChange={setTeam2Players}
        excludedPlayers={team1Players}
      />

      <ScoreInput value={score} onChange={setScore} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Recording...' : 'Record Match'}
      </button>
    </form>
  );
}