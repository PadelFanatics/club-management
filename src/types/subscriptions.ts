export type SubscriptionTier = 'basic' | 'professional' | 'enterprise';

export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'cancelled';

export interface SubscriptionFeature {
  id: string;
  tier_id: string;
  feature_code: string;
  feature_name: string;
  description?: string;
}

export interface SubscriptionTierDetails {
  id: string;
  name: string;
  code: SubscriptionTier;
  price: number;
  billing_period: 'monthly' | 'yearly';
  description?: string;
  features: SubscriptionFeature[];
}

export interface ClubSubscription {
  id: string;
  club_id: string;
  tier_id: string;
  status: SubscriptionStatus;
  started_at: string;
  expires_at?: string;
  payment_provider: string;
  payment_method_id?: string;
  subscription_id?: string;
}