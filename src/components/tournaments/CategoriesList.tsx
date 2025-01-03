import React from 'react';
import { CategoryCard } from './CategoryCard';
import type { TournamentCategory, TournamentCategoryLevel } from '../../types/tournaments';

interface CategoriesListProps {
  categories: TournamentCategory[];
  onRegister: (categoryId: string, level: TournamentCategoryLevel) => void;
}

export function CategoriesList({ categories, onRegister }: CategoriesListProps) {
  // Group categories by division
  const categoriesByDivision = categories.reduce((acc, category) => {
    const division = acc.get(category.division) || [];
    division.push(category);
    return acc.set(category.division, division);
  }, new Map<string, TournamentCategory[]>());

  return (
    <div className="space-y-8">
      {Array.from(categoriesByDivision.entries()).map(([division, categories]) => (
        <div key={division}>
          <h2 className="text-xl font-bold mb-4 capitalize">{division} Division</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onRegister={onRegister}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}