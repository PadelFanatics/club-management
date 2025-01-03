import React from 'react';
import { ChevronDown } from 'lucide-react';

interface MatchLevelSelectorProps {
  value?: [number, number];
  onChange: (level: [number, number]) => void;
}

export function MatchLevelSelector({ value = [5.1, 6.1], onChange }: MatchLevelSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">SELECT THE MATCH LEVEL</h3>
      <button
        onClick={() => onChange([5.1, 6.1])}
        className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between"
      >
        <div>
          <div className="font-medium">MATCH LEVEL</div>
          <div className="text-gray-600">{value[0].toFixed(2)} - {value[1].toFixed(2)}</div>
        </div>
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}