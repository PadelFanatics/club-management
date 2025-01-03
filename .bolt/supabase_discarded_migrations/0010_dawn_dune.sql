/*
  # Add payment provider configurations

  1. New Tables
    - `payment_provider_configs`
      - Stores payment provider settings for each club
      - Supports multiple providers (PayPal, Stripe, etc.)
    - `booking_split_payments`
      - Tracks individual player payments for court bookings
      - Supports different payment methods per player

  2. Changes
    - Add payment tracking to bookings table
    - Add payment provider tracking to payments
*/

-- Create payment provider configurations table
CREATE TABLE IF NOT EXISTS payment_provider_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  provider text NOT NULL CHECK (provider IN ('stripe', 'midtrans', 'xendit', 'doku', 'ovo', 'dana', 'paypal')),
  is_active boolean DEFAULT false,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(club_id, provider)
);

-- Create booking split payments table
CREATE TABLE IF NOT EXISTS booking_split_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  player_id uuid REFERENCES players(id) NOT NULL,
  amount integer NOT NULL,
  provider text NOT NULL CHECK (provider IN ('stripe', 'midtrans', 'xendit', 'doku', 'ovo', 'dana', 'paypal')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add payment tracking to bookings
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending'
CHECK (payment_status IN ('pending', 'partial', 'completed', 'refunded'));

-- Enable RLS
ALTER TABLE payment_provider_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_split_payments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Club admins can manage payment providers"
  ON payment_provider_configs FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = club_id
  ));

CREATE POLICY "Payment configs are viewable by everyone"
  ON payment_provider_configs FOR SELECT
  USING (true);

CREATE POLICY "Players can view their own split payments"
  ON booking_split_payments FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "Players can create their own split payments"
  ON booking_split_payments FOR INSERT
  WITH CHECK (auth.uid() = player_id);