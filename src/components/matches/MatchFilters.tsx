import React from 'react';
import { Filter } from 'lucide-react';
import { RangeSelector } from './RangeSelector';
import { LocationSelector } from './LocationSelector';
import { DateRangeSelector } from './DateRangeSelector';

interface MatchFiltersProps {
  levelRange: [number, number];
  onLevelRangeChange: (range: [number, number]) => void;
  dateRange: [Date, Date];
  onDateRangeChange: (range: [Date, Date]) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  locations: string[];
}

export function MatchFilters({
  levelRange,
  onLevelRangeChange,
  dateRange,
  onDateRangeChange,
  selectedLocation,
  onLocationChange,
  locations
}: MatchFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-red-900" />
        <h2 className="text-xl font-bold">Open Matches</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <RangeSelector
          value={levelRange}
          onChange={onLevelRangeChange}
          min={0}
          max={7}
          step={0.1}
          className="w-40"
        />
        
        <DateRangeSelector
          value={dateRange}
          onChange={onDateRangeChange}
          className="w-40"
        />
        
        <LocationSelector
          value={selectedLocation}
          onChange={onLocationChange}
          locations={locations}
          className="w-40"
        />
      </div>
    </div>
  );
}