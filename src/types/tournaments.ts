export interface TournamentCategory {
  id: string;
  tournament_id: string;
  name: string;
  division: TournamentDivision;
  min_rating?: number;
  max_rating?: number;
  gender?: 'male' | 'female' | 'mixed';
  min_age?: number;
  max_age?: number;
  max_teams: number;
  min_teams: number;
  registration_fee: number;
  rules?: string;
  levels: TournamentCategoryLevel[];
}

export interface TournamentCategoryLevel {
  id: string;
  category_id: string;
  level: TournamentLevel;
  min_rating?: number;
  max_rating?: number;
  prize_pool: number;
  max_teams: number;
}

export type TournamentDivision = 'mens' | 'womens' | 'mixed';

// Rest of the file remains the same