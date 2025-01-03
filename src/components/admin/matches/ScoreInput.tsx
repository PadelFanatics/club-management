import React from 'react';

interface ScoreInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ScoreInput({ value, onChange }: ScoreInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Score</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 6-4, 7-5"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        pattern="^\d+-\d+(?:,\s*\d+-\d+)*$"
        title="Enter scores in format: 6-4, 7-5"
        required
      />
      <p className="text-sm text-gray-500">
        Enter each set score separated by commas (e.g., 6-4, 7-5)
      </p>
    </div>
  );
}