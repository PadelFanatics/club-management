import React from 'react';
import { Trophy } from 'lucide-react';

export function Rankings() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#1F3327]">Rankings</h1>
      
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {[1, 2, 3].map((rank) => (
          <div key={rank} className="p-4 flex items-center space-x-4">
            <div className="w-8 text-center font-bold text-gray-600">{rank}</div>
            <div className="flex-1">
              <div className="font-bold">Player Name</div>
              <div className="text-sm text-gray-600">20 matches played</div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-red-900" />
              <span className="font-bold">1200</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}