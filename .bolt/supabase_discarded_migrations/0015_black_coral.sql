/*
  # Tournament Categories and Divisions

  1. Changes
    - Add division field to tournament_categories
    - Add constraints for valid division-level combinations
    - Update existing policies

  2. New Features
    - Support for men's, women's, and mixed divisions
    - Multiple levels per division
    - Category-specific rules and requirements
*/

-- Add division to tournament categories
ALTER TABLE tournament_categories
ADD COLUMN division text NOT NULL DEFAULT 'mens'
CHECK (division IN ('mens', 'womens', 'mixed'));

-- Add category-specific rules
ALTER TABLE tournament_categories
ADD COLUMN rules text,
ADD COLUMN min_teams integer NOT NULL DEFAULT 4,
ADD COLUMN registration_fee integer NOT NULL DEFAULT 0;

-- Create tournament category levels table for more granular control
CREATE TABLE tournament_category_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES tournament_categories(id) NOT NULL,
  level text NOT NULL CHECK (level IN ('bronze', 'silver', 'gold', 'platinum')),
  min_rating integer,
  max_rating integer,
  prize_pool integer NOT NULL DEFAULT 0,
  max_teams integer NOT NULL DEFAULT 16,
  created_at timestamptz DEFAULT now(),
  UNIQUE(category_id, level)
);

-- Enable RLS
ALTER TABLE tournament_category_levels ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Tournament category levels are viewable by everyone"
  ON tournament_category_levels FOR SELECT
  USING (true);

CREATE POLICY "Club admins can manage tournament category levels"
  ON tournament_category_levels FOR ALL
  USING (auth.uid() IN (
    SELECT user_id FROM club_admins 
    WHERE club_id = (
      SELECT club_id FROM tournaments 
      WHERE id = (
        SELECT tournament_id FROM tournament_categories 
        WHERE id = tournament_category_levels.category_id
      )
    )
  ));