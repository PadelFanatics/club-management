import { create } from 'zustand';
import { Club, Player } from '../types';

interface AppState {
  currentClub: Club | null;
  currentPlayer: Player | null;
  setCurrentClub: (club: Club | null) => void;
  setCurrentPlayer: (player: Player | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentClub: null,
  currentPlayer: null,
  setCurrentClub: (club) => set({ currentClub: club }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
}));