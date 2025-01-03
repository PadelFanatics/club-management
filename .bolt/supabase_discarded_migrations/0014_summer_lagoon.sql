-- Add level column to tournaments table
ALTER TABLE tournaments
ADD COLUMN level text NOT NULL DEFAULT 'bronze'
CHECK (level IN ('bronze', 'silver', 'gold', 'platinum'));

-- Add level requirements to tournament categories
ALTER TABLE tournament_categories
ADD COLUMN level_requirements jsonb DEFAULT '{}'::jsonb;