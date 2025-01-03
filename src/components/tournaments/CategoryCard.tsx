import React from 'react';
import { Users, Trophy } from 'lucide-react';
import { TournamentLevelBadge } from './TournamentLevelBadge';
import type { TournamentCategory, TournamentCategoryLevel } from '../../types/tournaments';

interface CategoryCardProps {
  category: TournamentCategory;
  onRegister: (categoryId: string, level: TournamentCategoryLevel) => void;
}

export function CategoryCard({ category, onRegister }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold mb-1">{category.name}</h3>
          <div className="text-sm text-gray-600 capitalize">{category.division} Division</div>
        </div>
        <Users className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {category.levels.map((level) => (
          <div key={level.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <TournamentLevelBadge level={level.level} />
              <div className="flex items-center text-gray-600">
                <Trophy className="w-4 h-4 mr-1" />
                <span>€{level.prize_pool / 100}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              {level.min_rating && (
                <div>Min Rating: {level.min_rating}</div>
              )}
              <div>Max Teams: {level.max_teams}</div>
            </div>

            <button
              onClick={() => onRegister(category.id, level)}
              className="w-full py-2 bg-red-900 text-white rounded-lg hover:bg-red-950"
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {category.rules && (
        <div className="mt-4 text-sm text-gray-500">
          <strong>Rules:</strong> {category.rules}
        </div>
      )}
    </div>
  );
}