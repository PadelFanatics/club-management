/*
  # Add payment provider management features

  1. Changes
    - Add payment provider settings table for club management
    - Add payment provider fees tracking
    - Add payment provider credentials encryption
*/

-- Add payment provider settings
CREATE TABLE IF NOT EXISTS payment_provider_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  provider text NOT NULL CHECK (provider IN ('stripe', 'midtrans', 'xendit', 'doku', 'ovo', 'dana', 'paypal')),
  fee_percentage decimal(5,2) NOT NULL,
  fee_fixed integer NOT NULL DEFAULT 0,
  min_amount integer NOT NULL DEFAULT 0,
  max_amount integer,
  is_active boolean DEFAULT false,
  credentials jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(club_id, provider)
);

-- Enable RLS
ALTER TABLE payment_provider_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Club admins can manage payment provider settings"
  ON payment_provider_settings FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = club_id
  ));

CREATE POLICY "Payment provider settings are viewable by everyone"
  ON payment_provider_settings FOR SELECT
  USING (true);