```sql
/*
  # Add Player Preferred Side
  
  1. Changes
    - Add preferred_side column to players table
    - Add check constraint to ensure valid values ('left', 'right', null)
*/

-- Create players table if it doesn't exist
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  ranking integer DEFAULT 1000,
  matches_played integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add preferred_side column
ALTER TABLE players 
ADD COLUMN IF NOT EXISTS preferred_side text;

-- Add check constraint
ALTER TABLE players 
ADD CONSTRAINT players_preferred_side_check 
CHECK (preferred_side IN ('left', 'right') OR preferred_side IS NULL);

-- Enable RLS if not already enabled
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Add basic policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'players' AND policyname = 'Players can view their own profile'
  ) THEN
    CREATE POLICY "Players can view their own profile"
      ON players FOR SELECT
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'players' AND policyname = 'Players can update their own profile'
  ) THEN
    CREATE POLICY "Players can update their own profile"
      ON players FOR UPDATE
      USING (auth.uid() = id);
  END IF;
END $$;
```