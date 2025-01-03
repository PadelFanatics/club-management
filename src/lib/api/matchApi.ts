import { supabase } from '../supabase';
import { calculateNewRankings } from '../../utils/rankingUpdater';
import type { Match, MatchPlayer } from '../../types';
import type { GameType } from '../../types/matches';

export const matchApi = {
  async recordMatch(
    match: Omit<Match, 'id'> & { game_type: GameType },
    players: Omit<MatchPlayer, 'id' | 'match_id'>[]
  ) {
    // Start a Supabase transaction
    const { data: matchData, error: matchError } = await supabase
      .from('matches')
      .insert(match)
      .select()
      .single();

    if (matchError) throw matchError;

    // Only update rankings for ranking games
    if (match.game_type === 'ranking') {
      // Calculate new rankings
      const matchWithId = { ...match, id: matchData.id };
      const playersWithMatchId = players.map(player => ({
        ...player,
        match_id: matchData.id
      }));

      const updatedPlayers = calculateNewRankings(matchWithId, playersWithMatchId);

      // Insert match players with updated rankings
      const { error: playersError } = await supabase
        .from('match_players')
        .insert(updatedPlayers);

      if (playersError) throw playersError;

      // Update player rankings
      const updatePromises = updatedPlayers.map(player =>
        supabase
          .from('players')
          .update({ ranking: player.ranking_after })
          .eq('id', player.player_id)
      );

      await Promise.all(updatePromises);

      // Record ranking history
      const historyRecords = updatedPlayers.map(player => ({
        player_id: player.player_id,
        ranking: player.ranking_after,
        match_id: matchData.id
      }));

      const { error: historyError } = await supabase
        .from('ranking_history')
        .insert(historyRecords);

      if (historyError) throw historyError;
    } else {
      // For friendly games, just record the match players without ranking changes
      const playersWithMatchId = players.map(player => ({
        ...player,
        match_id: matchData.id,
        ranking_after: player.ranking_before // Keep the same ranking
      }));

      const { error: playersError } = await supabase
        .from('match_players')
        .insert(playersWithMatchId);

      if (playersError) throw playersError;
    }

    return matchData as Match;
  }
};