import React from 'react';
import type { TournamentLevel } from '../../types/tournaments';

interface TournamentLevelBadgeProps {
  level: TournamentLevel;
  className?: string;
}

export function TournamentLevelBadge({ level, className = '' }: TournamentLevelBadgeProps) {
  const colors: Record<TournamentLevel, string> = {
    bronze: 'bg-amber-100 text-amber-800 border-amber-200',
    silver: 'bg-gray-100 text-gray-800 border-gray-200',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    platinum: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const prizes: Record<TournamentLevel, string> = {
    bronze: '€100 - €500',
    silver: '€500 - €2,000',
    gold: '€2,000 - €5,000',
    platinum: '€5,000+'
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border ${colors[level]} ${className}`}>
      <span className="capitalize">{level}</span>
      <span className="mx-1.5">•</span>
      <span className="text-sm">{prizes[level]}</span>
    </div>
  );
}