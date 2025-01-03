import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { BookingModal } from '../components/booking/BookingModal';
import type { Court } from '../types';

const SAMPLE_COURTS: Court[] = [
  { id: '1', name: 'Court 1', club_name: 'UBUD', price_per_hour: 160000 },
  { id: '2', name: 'Court 2', club_name: 'UBUD', price_per_hour: 160000 },
  { id: '4', name: 'Court 4', club_name: 'UBUD', price_per_hour: 160000 },
];

export function BookCourt() {
  const [selectedDuration, setSelectedDuration] = useState(90); // 90 minutes
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#1F3327]">available courts</h1>

      {/* Date selector */}
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, i) => {
          const date = addDays(new Date(), i);
          const isSelected = i === 3; // Friday selected
          return (
            <button
              key={i}
              className={`p-4 rounded-lg text-center ${
                isSelected ? 'bg-red-900 text-white' : 'bg-gray-100'
              }`}
            >
              <div className="text-sm font-medium">
                {format(date, 'EEE')}
              </div>
              <div className="text-2xl font-bold">
                {format(date, 'd')}
              </div>
              <div className="text-sm">
                {format(date, 'MMM')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Duration selector */}
      <div className="flex justify-center space-x-4">
        {[60, 90, 120].map((duration) => (
          <button
            key={duration}
            onClick={() => setSelectedDuration(duration)}
            className={`px-6 py-2 rounded-full ${
              duration === selectedDuration
                ? 'bg-red-900 text-white'
                : 'bg-white border border-gray-200'
            }`}
          >
            {duration} min
          </button>
        ))}
      </div>

      {/* Courts */}
      <BookingCalendar
        courts={SAMPLE_COURTS}
        onTimeSelect={(court, time) => {
          setSelectedCourt(court);
          setSelectedDate(time);
          setShowModal(true);
        }}
      />

      {/* Booking Modal */}
      {showModal && selectedCourt && (
        <BookingModal
          court={selectedCourt}
          date={selectedDate}
          duration={selectedDuration}
          onClose={() => setShowModal(false)}
          onBook={(options) => {
            console.log('Booking with options:', options);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}