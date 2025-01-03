import React from 'react';
import { Trophy, Calendar, MapPin } from 'lucide-react';

export function EventsList() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-red-900" />
              <h3 className="font-bold text-lg">Weekend Tournament</h3>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Sat, Dec 28 • 09:00</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>UBUD</span>
            </div>
          </div>
          <button className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-950">
            JOIN
          </button>
        </div>
      </div>
    </div>
  );
}