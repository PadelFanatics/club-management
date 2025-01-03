import { supabase } from '../supabase';
import type { Player } from '../../types';

export const playerApi = {
  async getTopPlayers(limit = 100) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('ranking', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as Player[];
  },

  async updatePlayerProfile(playerId: string, profile: Partial<Player>) {
    const { data, error } = await supabase
      .from('players')
      .update(profile)
      .eq('id', playerId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Player;
  }
};