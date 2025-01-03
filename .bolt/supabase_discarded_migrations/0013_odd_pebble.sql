/*
  # Tournament Management System

  1. New Tables
    - `tournaments`
      - Basic tournament info (name, dates, format)
      - Entry fees and prize structure
    - `tournament_categories`
      - Different divisions/categories within a tournament
    - `tournament_registrations`
      - Player/team registrations
    - `tournament_matches`
      - Tournament match schedule and results

  2. Security
    - Enable RLS on all tables
    - Add policies for club admins and players
*/

-- Tournament table
CREATE TABLE tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) NOT NULL,
  name text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  registration_deadline date NOT NULL,
  format text NOT NULL CHECK (format IN ('single_elimination', 'double_elimination', 'round_robin', 'group_stage')),
  max_participants integer NOT NULL,
  entry_fee integer NOT NULL DEFAULT 0,
  total_prize_pool integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'registration_closed', 'in_progress', 'completed')),
  rules text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date >= start_date AND registration_deadline <= start_date)
);

-- Tournament categories table
CREATE TABLE tournament_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id) NOT NULL,
  name text NOT NULL,
  min_rating integer,
  max_rating integer,
  gender text CHECK (gender IN ('male', 'female', 'mixed')),
  min_age integer,
  max_age integer,
  max_teams integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Tournament registrations table
CREATE TABLE tournament_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id) NOT NULL,
  category_id uuid REFERENCES tournament_categories(id) NOT NULL,
  team_name text,
  player1_id uuid REFERENCES players(id) NOT NULL,
  player2_id uuid REFERENCES players(id) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'withdrawn')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded')),
  seed integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tournament matches table
CREATE TABLE tournament_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id) NOT NULL,
  category_id uuid REFERENCES tournament_categories(id) NOT NULL,
  round integer NOT NULL,
  match_number integer NOT NULL,
  court_id uuid REFERENCES courts(id),
  scheduled_time timestamptz,
  team1_id uuid REFERENCES tournament_registrations(id),
  team2_id uuid REFERENCES tournament_registrations(id),
  score text,
  winner_id uuid REFERENCES tournament_registrations(id),
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'walkover')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournament_matches ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Tournaments are viewable by everyone"
  ON tournaments FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage tournaments"
  ON tournaments FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins WHERE club_id = tournaments.club_id
  ));

CREATE POLICY "Tournament categories are viewable by everyone"
  ON tournament_categories FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage tournament categories"
  ON tournament_categories FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins 
    WHERE club_id = (SELECT club_id FROM tournaments WHERE id = tournament_categories.tournament_id)
  ));

CREATE POLICY "Tournament registrations are viewable by participants and admins"
  ON tournament_registrations FOR SELECT
  USING (
    auth.uid() IN (player1_id, player2_id) OR
    auth.uid() IN (
      SELECT user_id FROM club_admins 
      WHERE club_id = (SELECT club_id FROM tournaments WHERE id = tournament_registrations.tournament_id)
    )
  );

CREATE POLICY "Players can register for tournaments"
  ON tournament_registrations FOR INSERT
  WITH CHECK (auth.uid() IN (player1_id, player2_id));

CREATE POLICY "Tournament matches are viewable by everyone"
  ON tournament_matches FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage tournament matches"
  ON tournament_matches FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins 
    WHERE club_id = (SELECT club_id FROM tournaments WHERE id = tournament_matches.tournament_id)
  ));