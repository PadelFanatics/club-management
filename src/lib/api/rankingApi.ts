import { supabase } from '../supabase';
import type { RankingHistory } from '../../types';

export const rankingApi = {
  async getPlayerRankingHistory(playerId: string): Promise<RankingHistory[]> {
    const { data, error } = await supabase
      .from('ranking_history')
      .select('*')
      .eq('player_id', playerId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as RankingHistory[];
  }
};