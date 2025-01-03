```sql
/*
  # Rating System Conversion
  
  1. Changes
    - Create rating conversion function
    - Create players table if not exists
    - Update existing player rankings
    - Add rating range constraint
*/

-- Create players table if it doesn't exist
CREATE TABLE IF NOT EXISTS players (
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

-- Create conversion function
CREATE OR REPLACE FUNCTION convert_rating(old_rating NUMERIC)
RETURNS NUMERIC AS $$
DECLARE
  conversion_table JSONB := '{
    "0": 0,
    "0.5": 0.35,
    "1": 0.7,
    "1.5": 1.05,
    "2": 1.4,
    "2.5": 1.75,
    "3": 2.1,
    "3.5": 2.45,
    "4": 2.8,
    "4.5": 3.15,
    "5": 3.5,
    "5.5": 3.85,
    "6": 4.2,
    "6.5": 4.55,
    "7": 4.9,
    "7.5": 5.25,
    "8": 5.6,
    "8.5": 5.95,
    "9": 6.3,
    "9.5": 6.65,
    "10": 7.0
  }';
  old_ratings NUMERIC[];
  closest_old_rating NUMERIC;
BEGIN
  -- Get array of old ratings
  SELECT ARRAY(
    SELECT NULLIF(jsonb_object_keys(conversion_table), 'null')::NUMERIC
    ORDER BY jsonb_object_keys(conversion_table)::NUMERIC
  ) INTO old_ratings;

  -- Find closest old rating
  SELECT value INTO closest_old_rating
  FROM UNNEST(old_ratings) value
  ORDER BY ABS(value - old_rating) ASC
  LIMIT 1;

  -- Return converted rating
  RETURN (conversion_table->>closest_old_rating::TEXT)::NUMERIC;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update existing rankings
UPDATE players
SET ranking = convert_rating(ranking/100)*100
WHERE ranking IS NOT NULL;

-- Drop existing constraint if it exists
ALTER TABLE players
DROP CONSTRAINT IF EXISTS players_ranking_range;

-- Add constraint for new rating range
ALTER TABLE players
ADD CONSTRAINT players_ranking_range
CHECK (ranking >= 0 AND ranking <= 700);
```