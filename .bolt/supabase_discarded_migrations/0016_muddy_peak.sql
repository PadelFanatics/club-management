```sql
/*
  # Match System Schema

  1. Updates
    - Add skill assessment to players table
  
  2. New Tables
    - matches: Track padel matches
    - match_players: Junction table for players in matches
    - ranking_history: Track ranking changes over time

  3. Security
    - Enable RLS on new tables
    - Add policies for match-related access control
*/

-- Add skill assessment to players
DO $$ 
BEGIN
  ALTER TABLE players ADD COLUMN skill_assessment jsonb;
EXCEPTION
  WHEN duplicate_column THEN NULL;
END $$;

-- Create matches table
CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  court_id uuid REFERENCES courts(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  score text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create match_players junction table
CREATE TABLE match_players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id) NOT NULL,
  player_id uuid REFERENCES auth.users(id) NOT NULL,
  team smallint NOT NULL CHECK (team IN (1, 2)),
  ranking_before integer NOT NULL,
  ranking_after integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create ranking_history table for tracking changes
CREATE TABLE ranking_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES auth.users(id) NOT NULL,
  ranking integer NOT NULL,
  match_id uuid REFERENCES matches(id),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE ranking_history ENABLE ROW LEVEL SECURITY;

-- Policies
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

CREATE POLICY "Club admins can create matches"
  ON matches FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM club_admins 
      WHERE club_id = (SELECT club_id FROM courts WHERE id = court_id)
    )
  );

CREATE POLICY "Match players are viewable by participants and club admins"
  ON match_players FOR SELECT
  USING (
    auth.uid() = player_id OR
    auth.uid() IN (
      SELECT user_id FROM club_admins 
      WHERE club_id = (
        SELECT club_id FROM courts 
        WHERE id = (SELECT court_id FROM matches WHERE id = match_id)
      )
    )
  );

CREATE POLICY "Ranking history is viewable by everyone"
  ON ranking_history FOR SELECT
  USING (true);
```