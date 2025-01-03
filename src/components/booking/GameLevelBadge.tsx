import React from 'react';
import type { GameLevel } from '../../types/levels';
import { getGameLevelColor, getLevelRating } from '../../utils/gameLevel';

interface GameLevelBadgeProps {
  level: GameLevel;
  className?: string;
  showRating?: boolean;
}

export function GameLevelBadge({ level, className = '', showRating = false }: GameLevelBadgeProps) {
  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getGameLevelColor(level)} ${className}`}>
      {level}
      {showRating && ` (${getLevelRating(level)})`}
    </span>
  );
}