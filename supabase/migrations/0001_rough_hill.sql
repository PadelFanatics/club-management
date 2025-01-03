-- Initial schema setup

/*
  # Initial Database Schema

  1. Core Tables
    - clubs
    - club_admins
    - courts
    - players
    - matches
    - bookings
    - payments

  2. Security
    - RLS enabled on all tables
    - Policies for access control
*/

-- Create clubs table
CREATE TABLE clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  primary_color text DEFAULT '#7f1d1d',
  secondary_color text DEFAULT '#ffffff',
  address text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create club admins junction table
CREATE TABLE club_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(club_id, user_id)
);

-- Create courts table
CREATE TABLE courts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  name text NOT NULL,
  description text,
  price_per_hour integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create players table
CREATE TABLE players (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  ranking integer DEFAULT 1000,
  matches_played integer DEFAULT 0,
  preferred_side text CHECK (preferred_side IN ('left', 'right', 'both') OR preferred_side IS NULL),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create matches table
CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  court_id uuid REFERENCES courts(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  score text NOT NULL,
  game_type text NOT NULL DEFAULT 'ranking' CHECK (game_type IN ('friendly', 'ranking')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create match players junction table
CREATE TABLE match_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id) NOT NULL,
  player_id uuid REFERENCES players(id) NOT NULL,
  team smallint NOT NULL CHECK (team IN (1, 2)),
  ranking_before integer NOT NULL,
  ranking_after integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  court_id uuid REFERENCES courts(id) NOT NULL,
  player_id uuid REFERENCES players(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'completed', 'refunded')),
  total_price integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  player_id uuid REFERENCES players(id) NOT NULL,
  amount integer NOT NULL,
  provider text NOT NULL DEFAULT 'stripe' CHECK (provider IN ('stripe', 'midtrans', 'xendit', 'doku', 'ovo', 'dana', 'paypal')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies
-- Clubs
CREATE POLICY "Clubs are viewable by everyone"
  ON clubs FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage their club"
  ON clubs FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = id
  ));

-- Club Admins
CREATE POLICY "Club admins are viewable by club members"
  ON club_admins FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = club_admins.club_id
  ));

-- Courts
CREATE POLICY "Courts are viewable by everyone"
  ON courts FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage courts"
  ON courts FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = courts.club_id
  ));

-- Players
CREATE POLICY "Players can view their own profile"
  ON players FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Players can update their own profile"
  ON players FOR UPDATE
  USING (auth.uid() = id);

-- Matches
CREATE POLICY "Matches are viewable by participants and club admins"
  ON matches FOR SELECT
  USING (
    auth.uid() IN (
      SELECT player_id FROM match_players WHERE match_id = id
    ) OR
    auth.uid() IN (
      SELECT user_id FROM club_admins 
      WHERE club_id = (SELECT club_id FROM courts WHERE id = court_id)
    )
  );

-- Match Players
CREATE POLICY "Match players are viewable by participants"
  ON match_players FOR SELECT
  USING (auth.uid() = player_id);

-- Bookings
CREATE POLICY "Bookings are viewable by related players and club admins"
  ON bookings FOR SELECT
  USING (
    auth.uid() = player_id OR
    auth.uid() IN (
      SELECT user_id FROM club_admins 
      WHERE club_id = (SELECT club_id FROM courts WHERE id = court_id)
    )
  );

CREATE POLICY "Players can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = player_id);

-- Payments
CREATE POLICY "Payments are viewable by related players"
  ON payments FOR SELECT
  USING (auth.uid() = player_id);

CREATE POLICY "Players can create payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = player_id);