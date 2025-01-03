import React from 'react';
import { format } from 'date-fns';
import type { Court } from '../../types';

interface BookingCalendarProps {
  courts: Court[];
  onTimeSelect: (court: Court, time: Date) => void;
}

export function BookingCalendar({ courts, onTimeSelect }: BookingCalendarProps) {
  const timeSlots = Array.from({ length: 27 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minutes = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  });

  return (
    <div className="space-y-6">
      {courts.map(court => (
        <div key={court.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#1F3327]">{court.club_name}</h3>
            <span className="text-sm text-gray-500">0.46 km</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => {
              const [hours, minutes] = time.split(':').map(Number);
              const date = new Date();
              date.setHours(hours, minutes);
              
              const isSelected = time === '13:00';
              
              return (
                <button
                  key={time}
                  onClick={() => onTimeSelect(court, date)}
                  className={`p-2 text-center rounded-lg ${
                    isSelected 
                      ? 'bg-red-900 text-white' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Selected courts summary */}
      <div className="space-y-2">
        {courts.map((court) => (
          <div key={court.id} className="flex justify-between items-center p-4 bg-white rounded-lg">
            <div>
              <div className="font-bold">Court {court.name}</div>
              <div className="text-sm text-gray-500">
                Fri 27 Dec | 13:00 - 14:30
              </div>
            </div>
            <button className="px-6 py-2 border border-red-900 text-red-900 rounded-lg hover:bg-red-50">
              BOOK
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}