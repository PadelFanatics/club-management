import { supabase } from '../supabase';
import type { PaymentProvider } from '../../types/payments';

export const paymentApi = {
  async getClubPaymentProviders(clubId: string) {
    const { data, error } = await supabase
      .from('payment_provider_configs')
      .select('*')
      .eq('club_id', clubId)
      .eq('is_active', true);
    
    if (error) throw error;
    return data;
  },

  async createSplitPayment(bookingId: string, playerId: string, amount: number, provider: PaymentProvider) {
    const { data, error } = await supabase
      .from('booking_split_payments')
      .insert({
        booking_id: bookingId,
        player_id: playerId,
        amount,
        provider,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSplitPaymentStatus(paymentId: string, status: string, paymentIntentId?: string) {
    const { data, error } = await supabase
      .from('booking_split_payments')
      .update({
        status,
        payment_intent_id: paymentIntentId,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getBookingSplitPayments(bookingId: string) {
    const { data, error } = await supabase
      .from('booking_split_payments')
      .select('*, players(full_name)')
      .eq('booking_id', bookingId);
    
    if (error) throw error;
    return data;
  }
};