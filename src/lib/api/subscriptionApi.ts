import { supabase } from '../supabase';
import type { SubscriptionTierDetails, ClubSubscription } from '../../types/subscriptions';

export const subscriptionApi = {
  async getSubscriptionTiers() {
    const { data: tiers, error: tiersError } = await supabase
      .from('subscription_tiers')
      .select(`
        *,
        features:subscription_features(*)
      `)
      .order('price');
    
    if (tiersError) throw tiersError;
    return tiers as SubscriptionTierDetails[];
  },

  async getCurrentSubscription(clubId: string) {
    const { data, error } = await supabase
      .from('club_subscriptions')
      .select('*')
      .eq('club_id', clubId)
      .eq('status', 'active')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data as ClubSubscription | null;
  },

  async createSubscription(subscription: Omit<ClubSubscription, 'id'>) {
    const { data, error } = await supabase
      .from('club_subscriptions')
      .insert(subscription)
      .select()
      .single();
    
    if (error) throw error;
    return data as ClubSubscription;
  },

  async cancelSubscription(subscriptionId: string) {
    const { data, error } = await supabase
      .from('club_subscriptions')
      .update({ 
        status: 'cancelled',
        expires_at: new Date().toISOString()
      })
      .eq('id', subscriptionId)
      .select()
      .single();
    
    if (error) throw error;
    return data as ClubSubscription;
  }
};