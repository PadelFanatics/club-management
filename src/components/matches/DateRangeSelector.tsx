import React from 'react';
import { ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

interface DateRangeSelectorProps {
  value: [Date, Date];
  onChange: (range: [Date, Date]) => void;
  className?: string;
}

export function DateRangeSelector({ value, onChange, className = '' }: DateRangeSelectorProps) {
  return (
    <button
      className={`flex items-center justify-between px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950 ${className}`}
      onClick={() => {
        onChange([new Date(), new Date()]);
      }}
    >
      <span>
        {format(value[0], 'dd')} - {format(value[1], 'dd MMM')}
      </span>
      <ChevronDown className="h-4 w-4 ml-2" />
    </button>
  );
}