import React from 'react';
import { format, addDays, startOfDay } from 'date-fns';
import type { Court } from '../types';

interface BookingCalendarProps {
  court: Court;
  onTimeSelect: (startTime: Date) => void;
}

export function BookingCalendar({ court, onTimeSelect }: BookingCalendarProps) {
  const today = startOfDay(new Date());
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 10 PM

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-8 gap-px bg-gray-200">
        <div className="bg-gray-50 p-2 text-sm font-medium text-gray-500">Time</div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="bg-gray-50 p-2 text-sm font-medium text-gray-900">
            {format(addDays(today, i), 'EEE d')}
          </div>
        ))}
        
        {timeSlots.map(hour => (
          <React.Fragment key={hour}>
            <div className="bg-white p-2 text-sm text-gray-500">
              {format(new Date().setHours(hour), 'h a')}
            </div>
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const slotDate = addDays(today, dayIndex);
              slotDate.setHours(hour);
              
              return (
                <button
                  key={dayIndex}
                  onClick={() => onTimeSelect(slotDate)}
                  className="bg-white p-2 text-sm hover:bg-indigo-50 focus:z-10 focus:outline-none"
                >
                  <span className="sr-only">
                    {format(slotDate, 'PPP')} at {format(slotDate, 'h a')}
                  </span>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}