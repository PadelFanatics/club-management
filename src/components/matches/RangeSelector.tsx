import React from 'react';
import { ChevronDown } from 'lucide-react';

interface RangeSelectorProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

export function RangeSelector({ value, onChange, className = '' }: RangeSelectorProps) {
  return (
    <button
      className={`flex items-center justify-between px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950 ${className}`}
      onClick={() => {
        onChange([4.1, 6.6]);
      }}
    >
      <span>{value[0].toFixed(1)} - {value[1].toFixed(1)}</span>
      <ChevronDown className="h-4 w-4 ml-2" />
    </button>
  );
}