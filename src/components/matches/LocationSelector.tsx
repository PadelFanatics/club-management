import React from 'react';
import { ChevronDown } from 'lucide-react';

interface LocationSelectorProps {
  value: string;
  onChange: (location: string) => void;
  locations: string[];
  className?: string;
}

export function LocationSelector({ value, onChange, locations, className = '' }: LocationSelectorProps) {
  return (
    <button
      className={`flex items-center justify-between px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950 ${className}`}
      onClick={() => {
        onChange(locations[0]);
      }}
    >
      <span>{value || 'All Locations'}</span>
      <ChevronDown className="h-4 w-4 ml-2" />
    </button>
  );
}