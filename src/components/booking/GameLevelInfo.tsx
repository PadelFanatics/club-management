import React from 'react';
import type { GameLevel } from '../../types/levels';
import { getLevelDescription, getLevelRating } from '../../utils/gameLevel';

interface GameLevelInfoProps {
  level: GameLevel;
}

export function GameLevelInfo({ level }: GameLevelInfoProps) {
  const description = getLevelDescription(level);
  const rating = getLevelRating(level);

  return (
    <div className="mt-2 text-sm">
      <p className="font-medium text-gray-700">Level {rating}</p>
      <ul className="mt-1 space-y-1 text-gray-500">
        {description.map((desc, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}