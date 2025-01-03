import type { GameLevel } from '../types/levels';
import { LEVEL_DESCRIPTIONS } from '../types/levels';
import type { Player } from '../types';

export function calculateGameLevel(players: Player[]): GameLevel {
  if (players.length === 0) return 'Silver';

  // Convert the new rating system (0-7) to the old system (0-10)
  const averageRating = players.reduce((sum, player) => {
    // Convert the stored ranking to the new 0-7 scale
    const newRating = player.ranking / 100; // Assuming ranking is stored in the old format
    return sum + newRating;
  }, 0) / players.length;

  if (averageRating <= 2) return 'Beginner';
  if (averageRating <= 3) return 'Bronze';
  if (averageRating <= 4) return 'Silver';
  if (averageRating <= 5) return 'Gold';
  return 'Platinum';
}

export function getGameLevelColor(level: GameLevel): string {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Bronze':
      return 'bg-amber-100 text-amber-800';
    case 'Silver':
      return 'bg-gray-100 text-gray-800';
    case 'Gold':
      return 'bg-yellow-100 text-yellow-800';
    case 'Platinum':
      return 'bg-purple-100 text-purple-800';
  }
}

export function getLevelDescription(level: GameLevel): string[] {
  return LEVEL_DESCRIPTIONS.find(desc => desc.level === level)?.description || [];
}

export function getLevelRating(level: GameLevel): string {
  return LEVEL_DESCRIPTIONS.find(desc => desc.level === level)?.rating || '';
}

// New helper function to convert between rating systems
export function convertOldRatingToNew(oldRating: number): number {
  const conversionTable = {
    0: 0,
    0.5: 0.35,
    1: 0.7,
    1.5: 1.05,
    2: 1.4,
    2.5: 1.75,
    3: 2.1,
    3.5: 2.45,
    4: 2.8,
    4.5: 3.15,
    5: 3.5,
    5.5: 3.85,
    6: 4.2,
    6.5: 4.55,
    7: 4.9,
    7.5: 5.25,
    8: 5.6,
    8.5: 5.95,
    9: 6.3,
    9.5: 6.65,
    10: 7.0
  };

  // Find the closest old rating
  const oldRatings = Object.keys(conversionTable).map(Number);
  const closestOldRating = oldRatings.reduce((prev, curr) => {
    return Math.abs(curr - oldRating) < Math.abs(prev - oldRating) ? curr : prev;
  });

  return conversionTable[closestOldRating as keyof typeof conversionTable];
}