import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import type { Booking, Court } from '../../types';

interface BookingsListProps {
  bookings: (Booking & { courts: Court })[];
  onStatusChange: (bookingId: string, status: Booking['status']) => void;
}

export function BookingsList({ bookings, onStatusChange }: BookingsListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {format(new Date(booking.start_time), 'MMMM d, yyyy')}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {format(new Date(booking.start_time), 'h:mm a')} - 
                    {format(new Date(booking.end_time), 'h:mm a')}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Court: {booking.courts.name}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <select
                  value={booking.status}
                  onChange={(e) => onStatusChange(booking.id, e.target.value as Booking['status'])}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}