import type { Court, Player } from './index';

export interface OpenMatch {
  id: string;
  court: Court;
  start_time: string;
  end_time: string;
  level_range: [number, number];
  players: Player[];
  requires_approval: boolean;
  is_friendly: boolean;
}

// ... rest of the file remains unchanged