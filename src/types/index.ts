export interface Court {
  id: string;
  name: string;
  club_name: string;
  price_per_hour: number;
}

export interface Player {
  id: string;
  full_name: string;
  ranking: number;
  preferred_side?: 'left' | 'right' | 'both';
}

export interface Club {
  id: string;
  name: string;
  slug: string;
}

export interface Booking {
  id: string;
  court_id: string;
  player_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_price: number;
}

export interface PlayerSkillAssessment {
  playerId?: string;
  playtomicRanking: number | null;
  yearsPlayed: number;
  weeklyMatches: number;
  previousSports: string[];
  playStyle: 'recreational' | 'competitive';
}

export interface RankingHistory {
  id: string;
  player_id: string;
  ranking: number;
  created_at: string;
}