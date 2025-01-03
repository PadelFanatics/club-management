import { supabase } from './supabase';
import type { Club, Court, Booking, Player } from '../types';

export const clubApi = {
  async getClubBySlug(slug: string) {
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data as Club;
  },

  async getCourts(clubId: string) {
    const { data, error } = await supabase
      .from('courts')
      .select('*')
      .eq('club_id', clubId)
      .eq('is_active', true);
    
    if (error) throw error;
    return data as Court[];
  },

  async getAllCourts(clubId: string) {
    const { data, error } = await supabase
      .from('courts')
      .select('*')
      .eq('club_id', clubId);
    
    if (error) throw error;
    return data as Court[];
  },

  async toggleCourtActive(courtId: string, isActive: boolean) {
    const { data, error } = await supabase
      .from('courts')
      .update({ is_active: isActive })
      .eq('id', courtId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Court;
  }
};

export const bookingApi = {
  async createBooking(booking: Omit<Booking, 'id'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async getPlayerBookings(playerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, courts(*)')
      .eq('player_id', playerId)
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return data as (Booking & { courts: Court })[];
  },

  async getClubBookings(clubId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, courts(*)')
      .eq('courts.club_id', clubId)
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return data as (Booking & { courts: Court })[];
  },

  async updateBookingStatus(bookingId: string, status: Booking['status']) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  }
};

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