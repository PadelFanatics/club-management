import React from 'react';
import { ArrowLeftCircle, ArrowRightCircle, ArrowLeftRight } from 'lucide-react';
import type { Player } from '../../types';

interface PlayerCardProps {
  player: Player;
  showPreferredSide?: boolean;
}

export function PlayerCard({ player, showPreferredSide = true }: PlayerCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <div>
          <p className="font-medium text-gray-900">{player.full_name}</p>
          <p className="text-sm text-gray-500">Rating: {player.ranking}</p>
        </div>
      </div>
      {showPreferredSide && player.preferred_side && (
        <div className="flex items-center text-gray-500" title={`Preferred side: ${player.preferred_side}`}>
          {player.preferred_side === 'left' ? (
            <ArrowLeftCircle className="h-5 w-5" />
          ) : player.preferred_side === 'right' ? (
            <ArrowRightCircle className="h-5 w-5" />
          ) : (
            <ArrowLeftRight className="h-5 w-5" />
          )}
        </div>
      )}
    </div>
  );
}