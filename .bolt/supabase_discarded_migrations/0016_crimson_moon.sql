/*
  # Club Subscription Management

  1. New Tables
    - `subscription_tiers`
      - Stores available subscription plans
    - `club_subscriptions`
      - Tracks active club subscriptions
    - `subscription_features`
      - Defines features available per tier
    
  2. Changes
    - Add subscription tracking to clubs table
    
  3. Security
    - Enable RLS
    - Add policies for subscription management
*/

-- Subscription tiers table
CREATE TABLE subscription_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  price integer NOT NULL,
  billing_period text NOT NULL DEFAULT 'monthly',
  description text,
  created_at timestamptz DEFAULT now()
);

-- Club subscriptions table
CREATE TABLE club_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  tier_id uuid REFERENCES subscription_tiers(id) NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'cancelled')),
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  payment_provider text NOT NULL,
  payment_method_id text,
  subscription_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscription features table
CREATE TABLE subscription_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_id uuid REFERENCES subscription_tiers(id) NOT NULL,
  feature_code text NOT NULL,
  feature_name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tier_id, feature_code)
);

-- Add subscription tracking to clubs
ALTER TABLE clubs
ADD COLUMN subscription_tier_id uuid REFERENCES subscription_tiers(id),
ADD COLUMN subscription_status text DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'past_due', 'cancelled'));

-- Enable RLS
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_features ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Subscription tiers are viewable by everyone"
  ON subscription_tiers FOR SELECT
  USING (true);

CREATE POLICY "Club admins can view their subscription"
  ON club_subscriptions FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = club_subscriptions.club_id
  ));

CREATE POLICY "Subscription features are viewable by everyone"
  ON subscription_features FOR SELECT
  USING (true);

-- Insert initial subscription tiers
INSERT INTO subscription_tiers (name, code, price, description) VALUES
  ('Club Essentials', 'basic', 9900, 'Basic club management features'),
  ('Club Pro', 'professional', 24900, 'Advanced features with mobile app'),
  ('Club Elite', 'enterprise', 49900, 'Full-featured solution with tournament tools');

-- Insert features for each tier
INSERT INTO subscription_features (tier_id, feature_code, feature_name, description) VALUES
  -- Basic features
  ((SELECT id FROM subscription_tiers WHERE code = 'basic'), 'ghl_website', 'GHL Website', 'Basic website with booking system'),
  ((SELECT id FROM subscription_tiers WHERE code = 'basic'), 'member_mgmt', 'Member Management', 'Basic member dashboard'),
  ((SELECT id FROM subscription_tiers WHERE code = 'basic'), 'basic_analytics', 'Basic Analytics', 'Essential reporting tools'),
  
  -- Professional features
  ((SELECT id FROM subscription_tiers WHERE code = 'professional'), 'advanced_booking', 'Advanced Booking', 'Full court management system'),
  ((SELECT id FROM subscription_tiers WHERE code = 'professional'), 'basic_app', 'Mobile App', 'Basic mobile application'),
  ((SELECT id FROM subscription_tiers WHERE code = 'professional'), 'marketing_funnel', 'Marketing Funnel', 'GHL marketing automation'),
  
  -- Enterprise features
  ((SELECT id FROM subscription_tiers WHERE code = 'enterprise'), 'tournament_tools', 'Tournament Tools', 'Complete tournament management'),
  ((SELECT id FROM subscription_tiers WHERE code = 'enterprise'), 'live_scoring', 'Live Scoring', 'Real-time match scoring'),
  ((SELECT id FROM subscription_tiers WHERE code = 'enterprise'), 'api_access', 'API Access', 'Full API integration support');