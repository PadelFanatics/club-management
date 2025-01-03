import React from 'react';
import type { ProductCategory } from '../../../types/shop';

interface CategoryFilterProps {
  selected: ProductCategory | 'all';
  onChange: (category: ProductCategory | 'all') => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const categories: Array<{ id: ProductCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Products' },
    { id: 'rackets', label: 'Rackets' },
    { id: 'balls', label: 'Balls' },
    { id: 'bags', label: 'Bags' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'energy_drinks', label: 'Energy Drinks' },
    { id: 'nutrition', label: 'Nutrition' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-lg ${
            selected === category.id
              ? 'bg-red-900 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}