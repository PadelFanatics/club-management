```sql
/*
  # Update Player Preferred Side Constraint
  
  1. Changes
    - Update preferred_side check constraint to include 'both' option
    - Ensure players table exists before modifying constraints
*/

-- Create players table if it doesn't exist
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  ranking integer DEFAULT 1000,
  matches_played integer DEFAULT 0,
  preferred_side text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update the constraint
DO $$ BEGIN
  -- First remove the existing check constraint if it exists
  ALTER TABLE players 
  DROP CONSTRAINT IF EXISTS players_preferred_side_check;

  -- Add the new check constraint with 'both' option
  ALTER TABLE players 
  ADD CONSTRAINT players_preferred_side_check 
  CHECK (preferred_side IN ('left', 'right', 'both') OR preferred_side IS NULL);
END $$;
```