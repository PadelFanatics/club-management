import { supabase } from '../supabase';
import type { Tournament, TournamentCategory, TournamentRegistration, TournamentMatch } from '../../types/tournaments';

export const tournamentApi = {
  async createTournament(tournament: Omit<Tournament, 'id'>) {
    const { data, error } = await supabase
      .from('tournaments')
      .insert(tournament)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tournament;
  },

  async getTournaments(clubId: string) {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('club_id', clubId)
      .order('start_date', { ascending: true });
    
    if (error) throw error;
    return data as Tournament[];
  },

  async getTournamentCategories(tournamentId: string) {
    const { data, error } = await supabase
      .from('tournament_categories')
      .select('*')
      .eq('tournament_id', tournamentId);
    
    if (error) throw error;
    return data as TournamentCategory[];
  },

  async registerTeam(registration: Omit<TournamentRegistration, 'id'>) {
    const { data, error } = await supabase
      .from('tournament_registrations')
      .insert(registration)
      .select()
      .single();
    
    if (error) throw error;
    return data as TournamentRegistration;
  },

  async getTournamentMatches(tournamentId: string) {
    const { data, error } = await supabase
      .from('tournament_matches')
      .select(`
        *,
        team1:tournament_registrations!team1_id(*),
        team2:tournament_registrations!team2_id(*)
      `)
      .eq('tournament_id', tournamentId)
      .order('scheduled_time', { ascending: true });
    
    if (error) throw error;
    return data as TournamentMatch[];
  },

  async updateMatchResult(
    matchId: string,
    score: string,
    winnerId: string
  ) {
    const { data, error } = await supabase
      .from('tournament_matches')
      .update({
        score,
        winner_id: winnerId,
        status: 'completed'
      })
      .eq('id', matchId)
      .select()
      .single();
    
    if (error) throw error;
    return data as TournamentMatch;
  }
};