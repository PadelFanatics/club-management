import React from 'react';
import { ArrowLeftCircle, ArrowRightCircle, ArrowLeftRight } from 'lucide-react';
import type { PreferredSide } from '../../types';

interface PreferredSideSelectorProps {
  value: PreferredSide;
  onChange: (side: PreferredSide) => void;
}

export function PreferredSideSelector({ value, onChange }: PreferredSideSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Preferred Side
      </label>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => onChange('left')}
          className={`flex items-center px-4 py-2 rounded-md border ${
            value === 'left'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 hover:border-indigo-300'
          }`}
        >
          <ArrowLeftCircle className="h-5 w-5 mr-2" />
          Left
        </button>
        <button
          onClick={() => onChange('right')}
          className={`flex items-center px-4 py-2 rounded-md border ${
            value === 'right'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 hover:border-indigo-300'
          }`}
        >
          <ArrowRightCircle className="h-5 w-5 mr-2" />
          Right
        </button>
        <button
          onClick={() => onChange('both')}
          className={`flex items-center px-4 py-2 rounded-md border ${
            value === 'both'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 hover:border-indigo-300'
          }`}
        >
          <ArrowLeftRight className="h-5 w-5 mr-2" />
          Both
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Select your preferred side of the court
      </p>
    </div>
  );
}