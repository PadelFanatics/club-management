/*
  # Create matches table and add game type

  1. New Tables
    - Creates matches table if it doesn't exist with:
      - id (uuid, primary key)
      - court_id (uuid, foreign key)
      - start_time (timestamptz)
      - end_time (timestamptz)
      - score (text)
      - game_type (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on matches table
    - Add policy for authenticated users to read matches
*/

-- Create matches table if it doesn't exist
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  court_id uuid REFERENCES courts(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  score text NOT NULL,
  game_type text NOT NULL DEFAULT 'ranking' CHECK (game_type IN ('friendly', 'ranking')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Add basic read policy
CREATE POLICY "Matches are viewable by authenticated users"
  ON matches FOR SELECT
  TO authenticated
  USING (true);