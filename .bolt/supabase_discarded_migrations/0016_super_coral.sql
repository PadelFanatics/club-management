```sql
/*
  # Initial Schema Setup

  1. Core Tables
    - clubs: Basic club information
    - club_admins: Club administrators junction table
    - courts: Club courts
    - players: Player profiles
    - bookings: Court bookings
    - payments: Booking payments

  2. Security
    - Enable RLS on all tables
    - Add policies for access control
*/

-- Clubs table
CREATE TABLE clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  primary_color text DEFAULT '#000000',
  secondary_color text DEFAULT '#ffffff',
  address text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Club admins junction table
CREATE TABLE club_admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(club_id, user_id)
);

-- Courts table
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

-- Players table
CREATE TABLE players (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  ranking integer DEFAULT 1000,
  matches_played integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  court_id uuid REFERENCES courts(id) NOT NULL,
  player_id uuid REFERENCES players(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  total_price integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  amount integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_payment_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public clubs are viewable by everyone"
  ON clubs FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage their club"
  ON clubs FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = id
  ));

CREATE POLICY "Club admins are viewable by club members"
  ON club_admins FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = club_admins.club_id
  ));

CREATE POLICY "Courts are viewable by everyone"
  ON courts FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage courts"
  ON courts FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = courts.club_id
  ));

CREATE POLICY "Players can view their own profile"
  ON players FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Players can update their own profile"
  ON players FOR UPDATE
  USING (auth.uid() = id);

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

CREATE POLICY "Players can view their own payments"
  ON payments FOR SELECT
  USING (
    auth.uid() IN (
      SELECT player_id FROM bookings WHERE id = booking_id
    )
  );
```