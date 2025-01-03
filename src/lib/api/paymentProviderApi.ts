import { supabase } from '../supabase';
import type { PaymentProvider } from '../../types/payments';

export const paymentProviderApi = {
  async getProviderSettings(clubId: string, provider: PaymentProvider) {
    const { data, error } = await supabase
      .from('payment_provider_settings')
      .select('*')
      .eq('club_id', clubId)
      .eq('provider', provider)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProviderSettings(
    clubId: string,
    provider: PaymentProvider,
    settings: {
      fee_percentage: number;
      fee_fixed: number;
      min_amount: number;
      max_amount?: number;
      credentials: Record<string, string>;
      is_active: boolean;
    }
  ) {
    const { data, error } = await supabase
      .from('payment_provider_settings')
      .upsert({
        club_id: clubId,
        provider,
        ...settings,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async toggleProviderStatus(clubId: string, provider: PaymentProvider, isActive: boolean) {
    const { data, error } = await supabase
      .from('payment_provider_settings')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('club_id', clubId)
      .eq('provider', provider)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};